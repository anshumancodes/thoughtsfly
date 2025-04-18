import { auth } from "express-oauth2-jwt-bearer";
import { ApiError } from "../services/ApiError.js";
import User from "../models/user.model.js";

const jwtCheck = auth({
  audience: 'thoughtsfly auth users',
  issuerBaseURL: 'https://dev-2jw4zujxnfrfeb4x.us.auth0.com/',
  
});

const ExtractUserInfo=async(req,res,next)=>{
  try {
    
    const CheckForSubId = req.auth.payload.sub
  
    if(!CheckForSubId){
     return res.status(401).json(new ApiError(401,"Missing authO SubId "))
    };
    const UserwiththeProvidedSubId=await User.findOne({subId:CheckForSubId})
    if(!UserwiththeProvidedSubId){
      return res.status(401).json(new ApiError(401,"No User with provided authO SubId Found "))
    };
    req.user=UserwiththeProvidedSubId
    next()
  } catch (error) {
    return res.status(500).json(new ApiError(500,"Something went wrong with the UserInfoextracter middleware!",error))
  }


}

export {jwtCheck,ExtractUserInfo};
