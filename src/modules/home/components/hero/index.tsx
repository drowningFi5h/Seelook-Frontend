'use client'
import React, { useState, Suspense  } from "react"
import { Button, Heading } from "@medusajs/ui"
import { Grid, useMediaQuery } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import { Item, CustomNavButton } from "./components/carousel"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

var items = [
  {
    header: "Elevating\n Women's Style",
    description: "Discover a world of fashion where quality, style, and affordability converge. Explore our curated collection of women's clothing, designed to empower you to express your unique sense of self.",
    bg: '#DDDDDD',
    imgUrl: baseUrl + "/in/images/hero1"
  },
  {
    header: "Elevating\n Women's Style",
    description: "Discover a world of fashion where quality, style, and affordability converge. Explore our curated collection of women's clothing, designed to empower you to express your unique sense of self.",
    bg: '#DDDDDD',
    imgUrl: baseUrl + "/in/images/hero2"
  },
  {
    header: "Bigg Billion\n Days",
    description: "Discover a world of fashion where quality, style, and affordability converge. Explore our curated collection of women's clothing, designed to empower you to express your unique sense of self.",
    bg: '#DDDDDD',
    imgUrl: baseUrl + "/in/images/hero3"
  },
]

const Hero = () => {
  const isMobile = useMediaQuery('(max-width: 868px)');

  return (
    <div className="h-[90vh] w-full relative bg-ui-bg-subtle">
      <Suspense fallback={<div>Loading...</div>}>
        <Carousel
          // index={index}
          // onChange={handleChange}
          animation="slide"
          duration={400}
          interval={3000}
          stopAutoPlayOnHover={true}
          swipe={true}
          indicators={true}
          cycleNavigation={true}
          fullHeightHover={false}
          // NavButton={(props) => <CustomNavButton {...props} />}
          className="absolute min-h-[90vh] inset-0 z-10 flex flex-col justify-center items-center text-center"
        >
          {items.map((item, i) => <Item key={i} item={item} />)}
        </Carousel>
      </Suspense>
    </div>
  )
}

export default Hero
