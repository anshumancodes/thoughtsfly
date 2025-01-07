import mongoose from 'mongoose';

const FollowingSchema=new mongoose.Schema({
    follower:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    following:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

},{
    timestamps:true
})

export const Following=mongoose.model("Following",FollowingSchema);