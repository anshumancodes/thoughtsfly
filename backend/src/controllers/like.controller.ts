import { z } from "zod";
import { ApiError } from "../services/ApiError.js";
import ApiResponse from "../services/ApiResponse.js";
import mongoose from "mongoose";
import { Like } from "../models/like.model.js";

const CreateLike = async (req, res) => {
  try {
    const userWhoLiked = req.user._id;
    const { postId } = req.body;
    const isValidPostid = mongoose.isValidObjectId(postId);
    if (!isValidPostid) {
      return res.status(400).json(new ApiError(400, "invalid Post id"));
    }
    const existingLike = await Like.findOne({
      post: postId,
      likedby: userWhoLiked,
    });

    if (existingLike) {
      return res
        .status(400)
        .json(new ApiError(400, "You have already liked this post"));
    }

    const LikeSchema = z.object({
      post: z.string(),
      likedby: z.string(),
    });
    try {
      const LikeData = LikeSchema.parse({
        post: postId,
        likedby: userWhoLiked,
      });
      const like = await Like.create(LikeData);
      if (!like) {
        return res
          .status(500)
          .json(new ApiError(500, "Unable to Like the Post"));
      }
      return res
        .status(201)
        .json(new ApiResponse(201, { like }, "post Liked successfully!"));
    } catch (zodError) {
      return res
        .status(400)
        .json(new ApiError(400, "Invalid like data", zodError.errors));
    }
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error));
  }
};


const DeleteLike = async (req, res) => {
  try {
    const userWhoLiked = req.user._id;
    const { postId } = req.body;

    if (!mongoose.isValidObjectId(postId)) {
      return res.status(400).json(new ApiError(400, "Invalid Post ID"));
    }

    const likeData = {
      post: postId,
      likedby: userWhoLiked,
    };

    const existingLike = await Like.findOne(likeData);

    if (!existingLike) {
      return res
        .status(404)
        .json(new ApiError(404, "Like not found for this user and post"));
    }

    await Like.deleteOne({ _id: existingLike._id });

    return res
      .status(200)
      .json(new ApiResponse(200, {}, "Post unliked successfully!"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error));
  }
};
