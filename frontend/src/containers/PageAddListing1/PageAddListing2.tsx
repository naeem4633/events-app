import React, { FC, useState } from "react";
import Input from "shared/Input/Input";
import CommonLayout from "./CommonLayout";
import FormItem from "./FormItem";
import ButtonSecondary from "shared/Button/ButtonSecondary";
import { useAddingPlaceContext } from "context/addingPlace";
import axios from "axios";
import { BACKEND_URL } from "backendUrl";

export interface PageAddListing2Props {}

const PageAddListing2: FC<PageAddListing2Props> = () => {
  const { halls, setHalls } = useAddingPlaceContext();
  const [hallName, setHallName] = useState<string>("");
  const [pricePerHead, setPricePerHead] = useState<number>(0);
  const [seatingCapacity, setSeatingCapacity] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray = Array.from(event.target.files);
      setSelectedImages(filesArray);
    }
  };

  const handleAddHall = async () => {
    const uploadPromises = selectedImages.map(file => {
      const formData = new FormData();
      formData.append('file', file);
      return axios.post(`${BACKEND_URL}upload-image`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(response => response.data.imageUrl);
    });

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      const newHall = { name: hallName, price_per_head: pricePerHead, seating_capacity: seatingCapacity, images: uploadedUrls, description };
      setHalls([...halls, newHall]);
      setHallName("");
      setPricePerHead(0);
      setSeatingCapacity(0);
      setSelectedImages([]);
      setDescription("");
      setImageUrls([]);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (
    <CommonLayout index="02" nextHref="/add-listing-3" backtHref="/add-listing-1">
      <>
        <h2 className="text-2xl font-semibold">Add Halls</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="space-y-8">
          <FormItem label="Hall name">
            <Input placeholder="Hall name" value={hallName} onChange={(e) => setHallName(e.target.value)} />
          </FormItem>

          <FormItem label="Price per head">
            <Input type="number" placeholder="Price per head" value={pricePerHead} onChange={(e) => setPricePerHead(Number(e.target.value))} />
          </FormItem>

          <FormItem label="Seating capacity">
            <Input type="number" placeholder="Seating capacity" value={seatingCapacity} onChange={(e) => setSeatingCapacity(Number(e.target.value))} />
          </FormItem>

          <FormItem label="Description">
            <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </FormItem>

          <FormItem label="Images">
            <input type="file" multiple onChange={handleImageChange} />
            <div className="grid grid-cols-2 gap-4 mt-4">
              {selectedImages.map((image, index) => (
                <img key={index} src={URL.createObjectURL(image)} alt={`Selected ${index + 1}`} className="object-cover w-full h-32 rounded-md" />
              ))}
            </div>
          </FormItem>

          <ButtonSecondary onClick={handleAddHall}>Add Hall</ButtonSecondary>

          <div>
            <h3 className="text-xl font-semibold">Added Halls</h3>
            <ul>
              {halls.map((hall, index) => (
                <li key={index} className="mb-4">
                  <h4 className="font-medium">{hall.name}</h4>
                  <p>Price per head: ${hall.price_per_head}</p>
                  <p>Seating capacity: {hall.seating_capacity} guests</p>
                  <p>Description: {hall.description}</p>
                  <p>Images:</p>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    {hall.images.map((image, i) => (
                      <img key={i} src={image} alt={`Hall ${index + 1} ${i + 1}`} className="object-cover w-full h-32 rounded-md" />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing2;
