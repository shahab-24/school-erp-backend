// import { Request, Response } from "express";
// import cloudinary from "../../core/utils/cloudinary";
// import streamifier from 'streamifier';

// export const uploadImage = async (req: Request, res: Response) => {
//   if (!req.file) {
//     return res.status(400).json({
//       success: false,
//       message: "Image file required",
//     });
//   }

//   try {
//     // ✅ buffer → stream → cloudinary
//     const streamUpload = () => {
//       return new Promise<any>((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           {
//             folder: "erp/students",
//           },
//           (error, result) => {
//             if (result) resolve(result);
//             else reject(error);
//           }
//         );

//         streamifier.createReadStream(req.file!.buffer).pipe(stream);
//       });
//     };

//     const result = await streamUpload();

//     res.json({
//       success: true,
//       data: {
//         url: result.secure_url,
//         publicId: result.public_id,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Image upload failed",
//     });
//   }
// };
import { Request, Response } from "express";
import cloudinary from "../../core/utils/cloudinary";
import streamifier from "streamifier";

export const uploadImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "Image file required",
    });
  }

  try {
    const streamUpload = () =>
      new Promise<any>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "erp/students" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        streamifier.createReadStream(req.file!.buffer).pipe(stream);
      });

    const result = await streamUpload();

    res.json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
      },
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({
      success: false,
      message: "Image upload failed",
    });
  }
};