import { Retweet } from "../models/retweet.model.js";
import { ApiError } from "../services/ApiError.js";
import ApiResponse from "../services/ApiResponse.js";

const retweet = async (req, res) => {
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

        return res.status(200).json(new ApiResponse(200, { retweet: newRetweet }, "Post retweeted successfully!"));

    } catch (error) {
        
        return res.status(500).json(new ApiError(500, "Internal Server Error",error));
    }
};
