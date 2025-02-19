import { ApiError } from "../services/ApiError.js";
import { Post } from "../models/post.model.js";
import { z } from "zod";
import ApiResponse from "../services/ApiResponse.js";
import mongoose from "mongoose";

const createPost = async (req, res) => {
  const postSchema = z.object({
    content: z.string().min(1).max(2000),
    owner: z.string().uuid(),
  });
  const { content, owner } = req.body;
  const postData = postSchema.parse({ content, owner });

  if (!postData) {
    throw new ApiError(400, "Unable to create a post due to invalid data");
  }

  // create post
  const post = await Post.create(postData);

  if (!post) {
    throw new ApiError(500, "Unable to create a post");
  }
  return res
    .status(201)
    .json(new ApiResponse(201, { post }, "Post created successfully!"));
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id);
  if (!post) {
    throw new ApiError(404, "Post not found");
  }
  const deletedPost = await Post.deleteOne({ _id: id });
  if (!deletedPost) {
    throw new ApiError(500, "Unable to delete post");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, { deletedPost }, "post deleted sucessfully"));
};

const fetchPostbyid = async (req, res) => {
  try {
    const { postid } = req.params;

    const post = await Post.findById(postid);
    if (!post) {
      return res.status(404).json(new ApiError(404, "post not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, { post: post }, "post fetched"));
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error));
  }
};

const fetchUserallposts = async (req, res) => {
  try {
    const userId = req.auth.payload.sub;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json(new ApiError(400, "Invalid user ID"));
    }

    const allPostsbyUser = await Post.aggregate([
      {
        $match: {
          owner: new mongoose.Types.ObjectId(userId as mongoose.Types.ObjectId),
        },
      },
      {
        $unionWith: {
          coll: "Retweet",
          pipeline: [
            {
              $match: {
                retweetedBy: new mongoose.Types.ObjectId(
                  userId as mongoose.Types.ObjectId
                ),
              },
            },
          ],
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
    ]);

    if (!allPostsbyUser.length) {
      return res.status(400).json(new ApiError(400, "NO exisiting post found"));
    }
    return res.status(200).json(
      new ApiResponse(
        200,
        {
          postsFound: allPostsbyUser.length + " posts found",
          allPostsbyUser,
        },
        "All of User's posts fetched successfully"
      )
    );
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error));
  }
};

export { createPost, deletePost, fetchPostbyid, fetchUserallposts };
