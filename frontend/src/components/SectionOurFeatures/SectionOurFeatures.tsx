import React, { FC } from "react";
import rightImgPng from "images/our-features.png";
import NcImage from "shared/NcImage/NcImage";
import Badge from "shared/Badge/Badge";

export interface SectionOurFeaturesProps {
  className?: string;
  rightImg?: string;
  type?: "type1" | "type2";
}

const SectionOurFeatures: FC<SectionOurFeaturesProps> = ({
  className = "lg:py-14",
  rightImg = rightImgPng,
  type = "type1",
}) => {
  return (
    <div
      className={`nc-SectionOurFeatures relative flex flex-col items-center ${
        type === "type1" ? "lg:flex-row" : "lg:flex-row-reverse"
      } ${className}`}
      data-nc-id="SectionOurFeatures"
    >
      <div className="flex-grow">
        <NcImage src={rightImg} />
      </div>
      <div
        className={`max-w-2xl flex-shrink-0 mt-10 lg:mt-0 lg:w-2/5 ${
          type === "type1" ? "lg:pl-16" : "lg:pr-16"
        }`}
      >
        <span className="uppercase text-sm text-gray-400 tracking-widest">
          
        </span>

        <h2 className="font-semibold text-4xl mt-5">Plan your <span className="text-custom-color text-yellow-500">Destination Wedding</span>  </h2>
        <h2 className="font-bold text-2xl text-red-500 mt-5">Coming Soon! </h2>


        <ul className="space-y-10 mt-16">
          <li className="space-y-4">
            <Badge name="Venue" />
            <span className="block text-xl font-semibold">
              Cost-effective advertising
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              With a free listing, you can advertise your rental with no upfront
              costs
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="green" name="Caterer " />
            <span className="block text-xl font-semibold">
              Reach millions with Chisfis
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              Millions of people are searching for unique places to stay around
              the world
            </span>
          </li>
          <li className="space-y-4">
            <Badge color="red" name="Decorator" />
            <span className="block text-xl font-semibold">
              Secure and simple
            </span>
            <span className="block mt-5 text-neutral-500 dark:text-neutral-400">
              A Holiday Lettings listing gives you a secure and easy way to take
              bookings and payments online
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SectionOurFeatures;
