import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';


    // Configuration
    cloudinary.config({ 
        cloud_name: 'denzlvzte', 
        api_key: process.env.CLODUINARY_API_KEY, 
        api_secret: process.env.CLODUINARY_API_SECRET
    });
    
    // Upload service using cloudinary

    const uploadTocloud=async(filePath:string,folderName:string)=>{
        try {
            if(!filePath){
                return null;
            }
            const uploadResponse=await cloudinary.uploader.upload(filePath,{resource_type:"auto",folder:folderName})
            
            // response 
            const uploadResponseData={
                fileName:uploadResponse.original_filename,
                publicId:uploadResponse.public_id,
                FileType:uploadResponse.resource_type,
                tags:uploadResponse.tags,
                publicUrl:uploadResponse.url,
            }
            console.log("Upload sucessfull: ",uploadResponseData)
            fs.unlinkSync(filePath); // deletes the file after uploading
            return uploadResponseData.publicUrl;
            
        } catch (error) {
            fs.unlinkSync(filePath);
            return null;

            
        }
    }
     
    
    
    
   
export default uploadTocloud;