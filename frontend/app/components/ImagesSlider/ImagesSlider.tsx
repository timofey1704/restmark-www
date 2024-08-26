'use client'

import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface ImageSliderProps {
  images: string[]
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <Slider {...settings}>
      {images.map((img, index) => (
        <div key={index}>
          <img
            src={img}
            alt={`Slide ${index}`}
            className="w-full h-auto object-cover"
          />
        </div>
      ))}
    </Slider>
  )
}

export default ImageSlider
