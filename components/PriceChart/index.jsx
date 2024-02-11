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
    className="backdrop-filter bg-black bg-opacity-40 backdrop-blur text-white rounded-xl absolute left-0 top-[50%] transform -translate-y-1/2 z-50 p-3 -ml-5"
    onClick={onClick}
  >
    <ChevronLIcon />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    className="backdrop-filter bg-black bg-opacity-40 backdrop-blur text-white rounded-xl absolute right-0 top-[50%] transform -translate-y-1/2 z-50 p-3 -mr-5"
    onClick={onClick}
  >
    <ChevronRIcon />
  </button>
);

const PriceChart = () => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const { coinMarketData } = useAppSelector((state) => state.coinMarketData);

  const hasCoins = coinMarketData.length > 0;

  return (
    <div>
      <h1 className="text-white p-4 text-light">Price chart</h1>
      <Slider {...settings}>
        {hasCoins &&
          coinMarketData.map((coin) => (
            <div key={coin.id} className="mr-2">
              <PriceCoinItem coin={coin} />
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default PriceChart;
