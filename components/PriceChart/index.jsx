"use client";

import PriceCoinItem from "../PriceCoinItem";
import { useAppSelector } from "@/redux/store";
import ChevronRIcon from "@/public/ChevronRIcon.svg";
import ChevronLIcon from "@/public/ChevronLIcon.svg";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PrevArrow = ({ onClick }) => (
  <button
    className="backdrop-filter dark:bg-black bg-white bg-opacity-60 backdrop-blur dark:text-white text-black rounded-lg absolute left-1 top-1/2 transform -translate-y-1/2 z-50 p-2 hidden sm:block -ml-6"
    onClick={onClick}
  >
    <ChevronLIcon />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="backdrop-filter dark:bg-white/10 bg-white/60 backdrop-blur dark:text-white text-black rounded-lg absolute right-1 top-1/2 transform -translate-y-1/2 z-50 p-2 hidden md:block"
    onClick={onClick}
  >
    <ChevronRIcon />
  </button>
);

const PriceChart = () => {
  let settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 2,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1580,
        settings: {
          slidesToShow: 7,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 380,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const { coinMarketData } = useAppSelector((state) => state.coinMarketData);
  const hasCoins = coinMarketData.length > 0 && coinMarketData;

  return (
    <div>
      <h1 className="dark:text-white text-black p-4 text-light">Price chart</h1>
      <Slider {...settings}>
        {hasCoins &&
          coinMarketData.map((coin) => (
            <PriceCoinItem coin={coin} key={coin.id} />
          ))}
      </Slider>
    </div>
  );
};

export default PriceChart;
