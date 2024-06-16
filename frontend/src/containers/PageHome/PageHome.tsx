import SectionHero from "components/SectionHero/SectionHero";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import React from "react";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import SectionOurFeatures from "components/SectionOurFeatures/SectionOurFeatures";
import SectionGridFeaturePlaces from "./SectionGridFeaturePlaces";
import SectionHowItWork from "components/SectionHowItWork/SectionHowItWork";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import { TaxonomyType } from "data/types";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import SectionBecomeAnAuthor from "components/SectionBecomeAnAuthor/SectionBecomeAnAuthor";
import SectionVideos from "./SectionVideos";
import SectionClientSay from "components/SectionClientSay/SectionClientSay";

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay",
    name: "Serena",
    location:"Islamabad",
    taxonomy: "category",
    count: 10,
    thumbnail:
      "https://lh3.googleusercontent.com/p/AF1QipOYaVb35jURKF8KuH61Jnz9bCxd9JuTgA3SpLb9=s1360-w1360-h1020",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Movenpick",
    taxonomy: "category",
    count: 5,
    thumbnail:
      "https://lh3.googleusercontent.com/p/AF1QipPmxjyk0qm-zialfMYicWyo4gwXGECNzhPHDhdV=s1360-w1360-h1020",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Beach Luxury",
    taxonomy: "category",
    count: 2,
    thumbnail:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/145246938.jpg?k=c88a9c0183f5e9d43e197e88866a365aecd8a9005217192cee2bced983959eda&o=&hp=1",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Pearl Continental",
    taxonomy: "category",
    count: 17,
    thumbnail:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/10271144.jpg?k=5d6ce2b006b010a784774cc2258d2cda106ba032a86758e5fa0bf8af47136f3d&o=&hp=1",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Marriott",
    taxonomy: "category",
    count: 8,
    thumbnail:
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/524490855.jpg?k=0318637ac9098af3fb96a1d2553a67a7a0afd887642bf4584f1a295f734e134a&o=&hp=1",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Roomy Signature",
    taxonomy: "category",
    count: 3,
    thumbnail:
      "https://lh3.googleusercontent.com/p/AF1QipM8EuDcGldh0tAeoTIkgWU8BLn9bAGS_V20u92y=s1360-w1360-h1020",
  },
];

const DEMO_CATS_2: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay",
    name: "Enjoy the great cold",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/5764100/pexels-photo-5764100.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
  },
  {
    id: "222",
    href: "/listing-stay",
    name: "Sleep in a floating way",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/2869499/pexels-photo-2869499.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "3",
    href: "/listing-stay",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "4",
    href: "/listing-stay",
    name: "Cool in the deep forest",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/247532/pexels-photo-247532.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: "5",
    href: "/listing-stay",
    name: "In the billionaire's house",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/7031413/pexels-photo-7031413.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

function PageHome() {
  return (
    <div className="nc-PageHome relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        {/* SECTION HERO */}
        <SectionHero className="pt-10 lg:pt-16 lg:pb-16" />

        {/* SECTION 1 */}
        <SectionSliderNewCategories
          categories={DEMO_CATS}
          uniqueClassName="PageHome_s1"
        />

        {/* SECTION2 */}
        <SectionOurFeatures />

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridFeaturePlaces />
        </div>

        {/* SECTION */}
        <SectionHowItWork />

        {/* SECTION 1 */}
        {/* <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionSliderNewCategories
            categories={DEMO_CATS_2}
            categoryCardType="card4"
            itemPerRow={4}
            heading="Suggestions for discovery"
            subHeading="Popular places to stay that Chisfis recommends for you"
            sliderStyle="style2"
            uniqueClassName="PageHome_s2"
          />
        </div> */}

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionSubscribe2 /> 
        </div>

        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection className="bg-orange-50 dark:bg-black dark:bg-opacity-20 " />
          <SectionGridAuthorBox />
        </div> */}

        {/* SECTION */}
        
        <SectionGridCategoryBox />

        {/* SECTION */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionBecomeAnAuthor />
        </div>

        {/* SECTION 1 */}
        {/* <SectionSliderNewCategories
          heading="Explore by types of stays"
          subHeading="Explore houses based on 10 types of stays"
          categoryCardType="card5"
          itemPerRow={5}
          uniqueClassName="PageHome_s3"
        /> */}

        {/* SECTION */}
        {/* <SectionVideos /> */}

        {/* SECTION */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay uniqueClassName="PageHome_" />
        </div> */}
      </div>
    </div>
  );
}

export default PageHome;
