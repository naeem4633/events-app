import React, { createContext, useState, FC, ReactNode, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "backendUrl";

interface Hall {
  name: string;
  price_per_head: number;
  seating_capacity: number;
  images: string[];
  description: string;
}

interface AddingPlaceContextType {
  placeName: string;
  setPlaceName: (name: string) => void;
  vendorEmail: string;
  setVendorEmail: (email: string) => void;
  placeId: string;
  setPlaceId: (id: string) => void;
  halls: Hall[];
  setHalls: (halls: Hall[]) => void;
  images: string[];
  setImages: (images: string[]) => void;
  address: string;
  websiteUri: string;
  googleMapsUri: string;
  rating: number;
  userRatingCount: number;
  googleImages: string[];
  featured: boolean;
  setFeatured: (featured: boolean) => void;
  latitude: number | null;
  longitude: number | null;
  fetchPlaceDetails: (placeId: string) => void;
  createPlace: () => void;
}

const AddingPlaceContext = createContext<AddingPlaceContextType | undefined>(undefined);

export const AddingPlaceProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [placeName, setPlaceName] = useState<string>("");
  const [vendorEmail, setVendorEmail] = useState<string>("");
  const [placeId, setPlaceId] = useState<string>("");
  const [halls, setHalls] = useState<Hall[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [address, setAddress] = useState<string>("");
  const [websiteUri, setWebsiteUri] = useState<string>("");
  const [googleMapsUri, setGoogleMapsUri] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [userRatingCount, setUserRatingCount] = useState<number>(0);
  const [googleImages, setGoogleImages] = useState<string[]>([]);
  const [featured, setFeatured] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("placeName", placeName);
  }, [placeName]);

  useEffect(() => {
    localStorage.setItem("vendorEmail", vendorEmail);
  }, [vendorEmail]);

  useEffect(() => {
    localStorage.setItem("placeId", placeId);
  }, [placeId]);

  useEffect(() => {
    localStorage.setItem("halls", JSON.stringify(halls));
  }, [halls]);

  useEffect(() => {
    localStorage.setItem("images", JSON.stringify(images));
  }, [images]);

  useEffect(() => {
    localStorage.setItem("address", address);
  }, [address]);

  useEffect(() => {
    localStorage.setItem("websiteUri", websiteUri);
  }, [websiteUri]);

  useEffect(() => {
    localStorage.setItem("googleMapsUri", googleMapsUri);
  }, [googleMapsUri]);

  useEffect(() => {
    localStorage.setItem("rating", rating.toString());
  }, [rating]);

  useEffect(() => {
    localStorage.setItem("userRatingCount", userRatingCount.toString());
  }, [userRatingCount]);

  useEffect(() => {
    localStorage.setItem("googleImages", JSON.stringify(googleImages));
  }, [googleImages]);

  useEffect(() => {
    localStorage.setItem("featured", JSON.stringify(featured));
  }, [featured]);

  const fetchPlaceDetails = async (placeId: string) => {
    try {
      const response = await axios.get(`${BACKEND_URL}place-details-from-google`, {
        params: { placeId },
      });

      const result = response.data;
      console.log("response", result);

      setAddress(result.formatted_address || "");
      setWebsiteUri(result.website || "");
      setGoogleMapsUri(result.url || "");
      setRating(result.rating || 0);
      setUserRatingCount(result.user_ratings_total || 0);
      setGoogleImages(result.google_images || []);
      setLatitude(result.map?.lat || null);
      setLongitude(result.map?.lng || null);
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  const createPlace = async () => {
    try {
      // Split the placeName by the first comma to get the display name
      const [displayName, ...addressParts] = placeName.split(',');

      const placeResponse = await axios.post(`${BACKEND_URL}placeNormal`, {
        id: placeId,
        name: displayName.trim(), // Use the display name as the name
        address: placeName, // Use the full placeName as the address
        website_uri: websiteUri,
        google_maps_uri: googleMapsUri,
        vendor_email: vendorEmail,
        seating_capacity: halls.reduce((total, hall) => total + hall.seating_capacity, 0),
        price_per_head: halls.reduce((total, hall) => total + hall.price_per_head, 0) / halls.length,
        rating,
        userRatingCount,
        google_images: googleImages,
        images,
        featured,
        map: {
          lat: latitude,
          lng: longitude,
        },
      });

      const place = placeResponse.data;
      console.log("Place created:", place);

      const hallIds = [];

      for (const hall of halls) {
        try {
          const hallResponse = await axios.post(`${BACKEND_URL}hall`, {
            ...hall,
            place: place._id,
          });
          console.log("Hall created:", hallResponse.data);
          hallIds.push(hallResponse.data._id);
        } catch (error) {
          if (axios.isAxiosError(error) && error.response) {
            console.error("Error creating hall:", hall, error.response.data);
          } else {
            console.error("Error creating hall:", hall, error);
          }
        }
      }

      // Update the place with the created hall IDs
      if (hallIds.length > 0) {
        await axios.put(`${BACKEND_URL}places/${place._id}`, {
          halls: hallIds,
        });
      }

      console.log("Place and halls created successfully.");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.error("Error creating place and halls:", error.response.data);
      } else {
        console.error("Error creating place and halls:", error);
      }
    }
  };

  useEffect(() => {
    if (placeId) {
      fetchPlaceDetails(placeId);
    }
  }, [placeId]);

  return (
    <AddingPlaceContext.Provider
      value={{
        placeName,
        setPlaceName,
        vendorEmail,
        setVendorEmail,
        placeId,
        setPlaceId,
        halls,
        setHalls,
        images,
        setImages,
        address,
        websiteUri,
        googleMapsUri,
        rating,
        userRatingCount,
        googleImages,
        featured,
        setFeatured,
        latitude,
        longitude,
        fetchPlaceDetails,
        createPlace,
      }}
    >
      {children}
    </AddingPlaceContext.Provider>
  );
};

export const useAddingPlaceContext = () => {
  const context = React.useContext(AddingPlaceContext);
  if (!context) {
    throw new Error("useAddingPlaceContext must be used within an AddingPlaceProvider");
  }
  return context;
};
