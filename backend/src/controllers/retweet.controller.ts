import { Retweet } from "../models/retweet.model.js";
import { ApiError } from "../services/ApiError.js";
import ApiResponse from "../services/ApiResponse.js";

const repost = async (req, res) => {
    const userId = req.auth.payload.sub;
    const { postid } = req.params;
    
    try {
        
        const existingRetweet = await Retweet.findOne({ originalPost: postid, retweetedBy: userId });
        
        if (existingRetweet) {
            return res.status(400).json(new ApiError(400, "Post already retweeted by user!"));
        }
        
        
        const newRetweet = await Retweet.create({
            originalPost: postid,
            retweetedBy: userId
        });
        
        return res.status(201).json(new ApiResponse(201, { retweet: newRetweet }, "Post retweeted successfully!"));
        
    } catch (error) {
        
        return res.status(500).json(new ApiError(500, "Internal Server Error",error));
    }
};

const deleteRePost=async(req,res)=>{
    try {
        const {postid}=req.body;
        const userId = req.auth.payload.sub;
        
        const doesretweetexist=await Retweet.findOneAndDelete({_id:postid,retweetedBy:userId});
        if(!doesretweetexist){
        return res.status(404).json(new ApiError(404,"rePost not found"))
    }
    
    return res.status(200).json(new ApiResponse(200,{deletedrePost:doesretweetexist},"rePost deleted successfully!"))

} catch (error) {
   return res.status(500).json(new ApiError(500,"Internal server error",error)) 
}}

export{repost,deleteRePost}

