import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'a2z-shop/products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  } as any,
});

const upload = multer({ storage });

// upload.single('image') for main image, upload.array('images', 5) for sub-images
export const uploadProductImages = upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'images', maxCount: 5 },
]);

export { cloudinary };
export default upload;
