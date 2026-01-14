import cloudinary from '../config/cloudinary.js'

export const uploadImageToCloudinary = async(imageUrl)=>{
    const result = await cloudinary.uploader.upload(imageUrl,{
        folder:'ai-images',
        resource_type:"image"
    })
    
  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};



export const uploadHFImageToCloudinary = async (base64, mimeType) => {
  const uploadStr = `data:${mimeType};base64,${base64}`;

  const result = await cloudinary.uploader.upload(uploadStr, {
    folder: "ai-images",
  });

  return {
    url: result.secure_url,
    public_id: result.public_id,
  };
};

