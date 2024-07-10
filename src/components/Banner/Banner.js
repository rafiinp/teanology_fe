import React, { useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import {
  bannerImgOne,
  bannerImgTwo,
  bannerImgThree,
} from "../../assets/images";
import Image from "../designLayouts/Image";

const CustomSlide = ({ Subtext, imgSrc, text, buttonLink, buttonText }) => (
  <div className="relative bg-gray-100 flex flex-col lg:flex-row justify-center items-center p-5 lg:p-0">
    <div className="max-w-lg mb-5 lg:mb-0 lg:mr-10 text-center lg:text-left">
      <h1 className="mb-4 text-4xl lg:text-5xl font-bold text-black">
        {text}
      </h1>
      <p className="mb-6 text-xl text-gray-600">
        {Subtext}
      </p>
      <Link to={buttonLink}>
        <button className="bg-primeColor text-white text-lg font-bodyFont w-44 h-12 hover:bg-black transition duration-300 font-bold">
          {buttonText}
        </button>
      </Link>
    </div>
    <div className="lg:ml-10">
      <Image imgSrc={imgSrc} />
    </div>
  </div>
);

const Banner = () => {
  const [dotActive, setDotActive] = useState(0);
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: false,
    beforeChange: (prev, next) => {
      setDotActive(next);
    },
    appendDots: (dots) => (
      <div className="absolute top-1/2 left-7 transform -translate-y-1/2">
        <ul className="m-0"> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        className={`w-7 h-2.5 cursor-pointer ${i === dotActive ? "bg-black" : "bg-transparent border border-white"}`}
      >
        0{i + 1}
      </div>
    ),
    responsive: [
      {
        breakpoint: 768,
        settings: {
          appendDots: (dots) => (
            <div className="absolute top-1/2 left-5 transform -translate-y-1/2">
              <ul className="m-0"> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              className={`w-6 h-2 cursor-pointer ${i === dotActive ? "bg-black" : "bg-transparent border border-white"}`}
            >
              0{i + 1}
            </div>
          ),
        },
      },
      {
        breakpoint: 576,
        settings: {
          appendDots: (dots) => (
            <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
              <ul className="m-0"> {dots} </ul>
            </div>
          ),
          customPaging: (i) => (
            <div
              className={`w-5 h-2 cursor-pointer text-xs ${i === dotActive ? "bg-black" : "bg-transparent border border-white"}`}
            >
              0{i + 1}
            </div>
          ),
        },
      },
    ],
  };

  const slides = [
    {
      imgSrc: bannerImgOne,
      text: "Teanology Tea Shop",
      Subtext: "Experimenting happiness through a cup of tea.",
      buttonLink: "/shop",
      buttonText: "Shop Now",
    },
    // Add more slides as needed
  ];
  return (
    <div className="w-full bg-white">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <CustomSlide key={index} {...slide} />
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
