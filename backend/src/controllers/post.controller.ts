import { ApiError } from "../services/ApiError.js";
import { Post } from "../models/post.model.js";
import {z} from "zod";
import ApiResponse from "../services/ApiResponse.js";


const createPost=async(req,res)=>{

    const postSchema=z.object({
        content:z.string().min(1).max(2000),
        owner:z.string().uuid(),
        
    });
    const {content,owner}=req.body;
    const postData=postSchema.parse({content,owner});

    if(!postData){
        throw new ApiError(400,"Unable to create a post due to invalid data");
    }

    // create post
    const post=await Post.create(postData);

    if(!post){
        throw new ApiError(500,"Unable to create a post");
    }
    return res.status(201).json(new ApiResponse(201,{post},"Post created successfully!"));


}

const deletePost=async(req,res)=>{
    const {id}=req.params;
    const post=await Post.findById(id);
    if(!post){
        throw new ApiError(404,"Post not found");
    }
    const deletedPost=await Post.deleteOne({_id:id});
    if(!deletedPost){
        throw new ApiError(500,"Unable to delete post");
    }
    return res.status(200).json(new ApiResponse(200,{message:"Post deleted successfully!"}));
}



export {createPost,deletePost};