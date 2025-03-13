import User from "../models/user.model.js";
import ApiResponse from "../services/ApiResponse.js";
import { ApiError } from "../services/ApiError.js";
import { z } from "zod";
import uploadTocloud from "../services/cloudinary.js";
import AsyncHandler from "../services/AsyncHandler.js";
import { Post } from "../models/post.model.js";
import mongoose from "mongoose";
import  Jwt from "jsonwebtoken";
import axios from "axios";
import { auth } from "express-oauth2-jwt-bearer";


const userSignup=async(req,res)=>{
    const {username,name,email,password,profileBio,location}=req.body;

    const checkifUserExists= await User.findOne({"$or":[{username},{email}]});

    if(checkifUserExists){
        return res.status(400).json(new ApiError(400,"User already exists , please try with new username or email"));
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const profileBannerLocalPath = req.files?.profileBanner[0]?.path;
    const avatar= uploadTocloud(avatarLocalPath,"user-avatars");
    const profileBanner= uploadTocloud(profileBannerLocalPath,"user-banners");

    const userSchema=z.object({
        username:z.string().min(3).max(16).regex(/^[a-zA-Z0-9]+$/),
        name:z.string().min(3).max(50),
        email:z.string().min(3).max(50).regex(/^[a-zA-Z0-9]+$/),
        password:z.string().min(6).max(50),
        profileBio:z.string().min(3).max(520),
        location:z.object({
            type:z.enum(["Point"]),
            coordinates:z.array(z.number())
        }),
        profileBanner:z.string(),
        avatar:z.string()
    });
    const NewUser=userSchema.parse({username,name,email,password,profileBio,location,profileBanner,avatar});
    const user = await User.create(NewUser);

    
    const isUserCreated = await User.findById(user._id).select(
        "-password ",
      );
      if(!isUserCreated){
        return res.status(500).json(new ApiError(500,"Unable to create user"));
       }
    return res.status(200).json(new ApiResponse(200,isUserCreated,"User created successfully"));


}

const generateAccessToken=async(userId)=>{

    try {

        const existedUser=await User.findById(userId)
        const accessToken =existedUser.generateAccessToken();
      

      
        await existedUser.save({validateBeforeSave:false});

        return accessToken;
        
    } catch (error) {
        throw new ApiError(503,"unable to generate tokens right now ! please try again");
        
    }

}

const  userLogin=AsyncHandler(async (req,res)=>{
    const {username,email,password}=req.body;
    const user=await User.findOne({"$or":[{username},{email}]});

    z.object({
        username:z.string().min(3).max(16).regex(/^[a-zA-Z0-9]+$/),
        email:z.string().min(3).max(50).regex(/^[a-zA-Z0-9]+$/),
        password:z.string().min(6).max(50).regex(/^[a-zA-Z0-9]+$/),
    })

    if(!user){
        return res.status(400).json(new ApiError(400,"User not found"));
    }

    // check user.model.ts for the password validation function 
    const validatePassword=await user.comparePassword(password);
    if(!validatePassword){
        return res.status(400).json(new ApiError(400,"Invalid password"));
    }
    //get access token
    const accessToken=await generateAccessToken(user._id);
    const options={
        httOnly:true,
        secure:true,
    }
    const userLogged={
        username:user.username,
        email:user.email,
        name:user.name,
        avatar:user.avatar,
        profileBanner:user.profileBanner,
    }
    return res.status(200).cookie("accessToken",accessToken,options).json(new ApiResponse(200,userLogged,"User logged in successfully"));
    

})



const EditUserProfile=async(req,res)=>{

    const {FullName,Bio,location,webLink}=req.body;
    const userId = req.auth.payload.sub;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json(new ApiError(400, "Invalid user ID"));
    }
    const user=await User.findById(userId);
    if(!user){
        return res.status(400).json(new ApiError(400,"User not found"));
    }
    const userSchema=z.object({
        FullName:z.string().min(3).max(50),
        Bio:z.string().min(3).max(520),
        location:z.object({
            type:z.enum(["Point"]),
            coordinates:z.array(z.number())
        }),
        webLink:z.string().min(3).max(50)
    });

    const UpdateUserProfile=userSchema.parse({FullName,Bio,location,webLink});
    const updatedUser=await User.findByIdAndUpdate(user._id,UpdateUserProfile,{new:true}).select("-password -email -accessToken");
    if(!updatedUser){
        return res.status(500).json(new ApiError(500,"Unable to update user"));
    }
    return res.status(200).json(new ApiResponse(200,updatedUser,"User profile updated successfully"));
}

const changeUsername=async(req,res)=>{
    const {newUsername}=req.body;
    const userId = req.auth.payload.sub;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json(new ApiError(400, "Invalid user ID"));
    }
    const user=await User.findById(userId);

    if(!user){
        return res.status(400).json(new ApiError(400,"User not found"));
    }

    const userSchema=z.object({
        username:z.string().min(3).max(16).regex(/^[a-zA-Z0-9]+$/),
    });

    const UpdateUsername=userSchema.parse({newUsername});
    const updatedUser=await User.findByIdAndUpdate(user._id,UpdateUsername,{new:true}).select("-password -email -accessToken");
    if(!updatedUser){
        return res.status(500).json(new ApiError(500,"Unable to update username"));
    }
    return res.status(200).json(new ApiResponse(200,updatedUser,"Username updated successfully"));
}

const HandleAuthOsignup = async (req, res) => {
  try {
    // The middleware already validated the token refer to : middlewares/
    // You can access the decoded token data through req.auth
    const UserSubId = req.auth.sub;

    // Checking if user already exists
    const doesUserExist = await User.findOne({ subId: UserSubId });
    if (doesUserExist) {
      return res.status(400).json(new ApiError(400, "User already exists!"));
    }

    // Fetching user info from Auth0 
    const accessToken = req.headers.authorization?.split("Bearer ")[1];
    const userInfoResponse = await axios.get(`${process.env.AUTH0_DOMAIN}/userinfo`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const userInfo = userInfoResponse.data;

    // Creates new user with auth0 info
    const newUser = await User.create({
      subId: userInfo.sub,
      username: userInfo.nickname? userInfo.nickname.slice(0,15) : userInfo.name.replace(/\s/g, "").slice(0,15),
      name: userInfo.name,
      email: userInfo.email,
      avatar: userInfo.picture,
    });
    console.log(newUser);

    if (!newUser) {
      return res.status(500).json(new ApiError(500, "Unable to create a new user"));
    }

    res.status(200).json(new ApiResponse(200, "successfully created new user!"));
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json(new ApiError(500, error.message || "Internal server error"));
  }
};
  
  const fetchUserProfile = async (req, res) => {
    try {
      // Extract access token
      const accessToken = req.headers.authorization?.split("Bearer ")[1];
  
      if (!accessToken) {
        return res.status(401).json(new ApiError(401, "No access token provided"));
      }
  
      // Fetch user info from Auth0
      const userInfoResponse = await axios.get(`${process.env.AUTH0_DOMAIN}/userinfo`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
  
      const { updated_at, email_verified, sub, ...newUser } = userInfoResponse.data;
  
      if (!userInfoResponse.data) {
        return res.status(400).json(new ApiError(400, "User not found"));
      }
  
      const userProfile = {
        updated_at,
        email_verified,
        sub,
        ...newUser,
      };
  
      return res.status(200).json(new ApiResponse(200, userProfile, "User profile fetched successfully"));
    } catch (error) {
      console.error("Error fetching user profile:", error.message);
      return res.status(500).json(new ApiError(500, error.message || "Internal server error"));
    }
  };
  

export{userSignup,userLogin,fetchUserProfile,EditUserProfile,changeUsername,HandleAuthOsignup}