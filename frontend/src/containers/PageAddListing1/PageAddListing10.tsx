import React, { FC } from "react";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import CommonLayout from "./CommonLayout";
import { useAddingPlaceContext } from "context/addingPlace";
import { useNavigate } from "react-router-dom";

export interface PageAddListing10Props {}

const PageAddListing10: FC<PageAddListing10Props> = () => {
  const { createPlace } = useAddingPlaceContext();
  const navigate = useNavigate()

  const handlePublish = async () => {
    try {
      await createPlace();
      navigate('/');
    } catch (error) {
      console.error("Error publishing place:", error);
    }
  };

  return (
    <CommonLayout
      nextBtnText="Back to home"
      index="10"
      backtHref="/add-listing-3"
      nextHref="/"
    >
      <>
        <div>
          <h2 className="text-2xl font-semibold">Congratulations 🎉</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Excellent, congratulations on completing the listing.
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <div className="flex items-center space-x-5 mt-8">
            <ButtonPrimary onClick={handlePublish}>
              <span className="ml-3">Publish</span>
            </ButtonPrimary>
          </div>
        </div>
      </>
    </CommonLayout>
  );
};

export default PageAddListing10;
