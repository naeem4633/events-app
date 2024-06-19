import React, { FC, useState, useEffect } from "react";
import axios from "axios";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { useAddingPlaceContext } from "context/addingPlace"; // Import the AddingPlaceContext
import { BACKEND_URL } from "backendUrl";

export interface PageAddListing3Props {}

const PageAddListing3: FC<PageAddListing3Props> = () => {
  const { images, setImages } = useAddingPlaceContext(); // Use the context
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    console.log("images changed:", selectedImages);
  }, [selectedImages]);

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedImages(filesArray);

      // Upload images to the backend
      const uploadedUrls: string[] = [];
      setUploading(true);

      for (const file of filesArray) {
        const formData = new FormData();
        formData.append('file', file);

        try {
          const response = await axios.post(`${BACKEND_URL}upload-image`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
          uploadedUrls.push(response.data.imageUrl);
        } catch (error) {
          console.error('Error uploading image:', error);
        }
      }

      setUploading(false);
      setImages([...images, ...uploadedUrls]);
    }
  };

  return (
    <CommonLayout
      index="03"
      backtHref="/add-listing-2"
      nextHref="/add-listing-10"
    >
      <>
        <h2 className="text-2xl font-semibold">Upload images of your place</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="space-y-8">
          <FormItem label="Images of the place">
            <div className="mt-5">
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-neutral-300 dark:border-neutral-6000 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-neutral-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <div className="flex text-sm text-neutral-6000 dark:text-neutral-300">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-medium text-primary-6000 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                    >
                      <span>Upload files</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        multiple
                        onChange={handleImageChange}
                        disabled={uploading}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                </div>
              </div>
            </div>
          </FormItem>
          <div>
            <h3 className="text-xl font-semibold">Uploaded Images</h3>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Uploaded ${index + 1}`}
                  className="object-cover w-full h-32 rounded-md"
                />
              ))}
            </div>
          </div>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing3;
