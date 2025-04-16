import { ApiError } from "../services/ApiError.js";
import { Post } from "../models/post.model.js";
import { z } from "zod";
import ApiResponse from "../services/ApiResponse.js";
import mongoose from "mongoose";
import User from "../models/user.model.js";
import { count, error } from "console";

const createPost = async (req, res) => {
  try {
    const postSchema = z.object({
      content: z.string().min(1).max(2000),
      owner: z.string(),
    });

    const { content } = req.body;
    const owner = req.user._id.toString();

    try {
      const postData = postSchema.parse({ content, owner });

      // create post
      const post = await Post.create(postData);

      if (!post) {
        return res
          .status(500)
          .json(new ApiError(500, "Unable to create a post"));
      }

      return res
        .status(201)
        .json(new ApiResponse(201, { post }, "Post created successfully!"));
    } catch (zodError) {
      return res
        .status(400)
        .json(new ApiError(400, "Invalid post data", zodError.errors));
    }
  } catch (error) {
    return res
      .status(500)
      .json(new ApiError(500, "Internal Server Error", error));
  }
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
    const userId = req.user._id;

    const allPostsbyUser = await Post.aggregate([
      {
        $match: {
          owner: userId,
        },
      },
      {
        $unionWith: {
          coll: "Retweet",
          pipeline: [
            {
              $match: {
                retweetedBy: userId,
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

const fetchFeed = async (req, res) => {


  try {
    const allPosts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("owner", "username avatar name")
      .exec();

    const response = new ApiResponse(
      200,
      { posts: allPosts, count: allPosts.length },
      "All posts fetched successfully"
    );

    return res.status(200).json(response);
  } catch (error) {
    console.error("Error in fetchFeed:", error);
    return res.status(500).json(new ApiError(500, "Failed to fetch posts"));
  }
};


export { createPost, deletePost, fetchPostbyid, fetchUserallposts, fetchFeed };
