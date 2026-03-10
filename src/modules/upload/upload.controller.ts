import { Request, Response } from "express";
import cloudinary from "../../core/utils/cloudinary";


export const uploadImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Image file required",
    });
  }

  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "erp/students",
    });

    res.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
};
