import mongoose from 'mongoose';


const PostSchema= new mongoose.Schema({
    content:{
        type:String,
        required:true,
        minLength:1,
        maxLength:2000
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    likes:{
        type:Number,
        default:0
    },
    comments:{
        type:Number,
        default:0
    },
    
    
},{
    timestamps:true
});

export const Post=mongoose.model("Post",PostSchema);

