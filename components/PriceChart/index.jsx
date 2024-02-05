"use client";

import PriceCoinItem from "../PriceCoinItem";
import { useAppSelector } from "@/redux/store";
import { Coin } from "@/interfaces/coin.interface";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PriceChart = () => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
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
