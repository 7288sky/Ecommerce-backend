import {v2 as cloudinary} from 'cloudinary';
import fs from "fs"

          
cloudinary.config({ 
    cloud_name: 'diuojuw9k', 
    api_key: '794557638352517', 
    api_secret: 'mVJskX5QCg6fnsg28UoMdJSjaNY' 
  });



// cloudinary.config({ 
//     cloud_name:process.env.CLOUDINARY_CLOUD_NAME, 
//     api_key:process.env.CLOUDINARY_API_KEY , 
//     api_secret:process.env.CLOUDINARY_API_SECRET
//   });

const uploadOnCloudinary=async(localFilePath)=>{
    try{
        if(!localFilePath) return null;
        // upload the file on cloudinary
       const response=await cloudinary.uploader.upload(localFilePath,{
            resource_type:"auto"
        })
        // FILE HAS BEEN UPLOADED 
        console.log("File is uploaded on cloudinary")
        // File Upload ho chuki hai abb use unlink kar denge
        fs.unlinkSync(localFilePath)
        return response.url;
    }catch(error){
        console.log(error)
        fs.unlinkSync(localFilePath) // Remove the locally saved temporary files
        return null;
    }
}


export {uploadOnCloudinary}