import User from "../models/user.model.js";
import ApiResponse from "../services/ApiResponse.js";
import { ApiError } from "../services/ApiError.js";
import { z } from "zod";
import uploadTocloud from "../services/cloudinary.js";
import AsyncHandler from "../services/AsyncHandler.js";
import { Post } from "../models/post.model.js";

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

const fetchUserProfile=async(req,res)=>{
    const {username}=req.params;

    const user=await User.findOne({username:username}).select("-password -email -accessToken");

    if(!user){
        return res.status(400).json(new ApiError(400,"User not found"));
    }

    const userPosts=await Post.find({owner:user._id}).select("-owner -comments -likes");

    return res.status(200).json(new ApiResponse(200,{
        userProfile:user,
        userPosts:userPosts,
        TotalPosts:userPosts.length
    },"User profile fetched successfully"));

    
}

const EditUserProfile=async(req,res)=>{

    const {FullName,Bio,location,webLink}=req.body;
    const token=req.cookies.accessToken;
    const user=await User.findOne({accessToken:token});
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


export{userSignup,userLogin,fetchUserProfile,EditUserProfile}