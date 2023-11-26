import supabase from "../config/supabaseClient";

/**
 * Uploads an image to the specified bucket.
 *
 * @param {string} bucketName - The name of the bucket to upload the image to.
 * @param {File} image - The image to be uploaded.
 */
const uploadImage = async (bucketName, image) => {
  const randomString = Math.random().toString(36).substring(2, 15);
  const filePath = `${randomString}-${image.name}`;
  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(filePath, image);
  if (uploadError) {
    console.error(uploadError);
    return;
  }
  const response = supabase.storage.from(bucketName).getPublicUrl(filePath);
  const publicURL = response?.data?.publicUrl;
  return publicURL;
};

export default uploadImage;
