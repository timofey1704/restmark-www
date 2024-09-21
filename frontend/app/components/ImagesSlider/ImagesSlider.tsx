'use client'

import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

interface ImageSliderProps {
  images: string[]
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const settings = {
    dots: false,
    infinite: images.length > 1, // иначе могут возникнуть дубли defaultPhoto
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  return (
    <Slider {...settings}>
      {images.map((img, index) => (
        <div key={index}>
          <Image
            src={img}
            alt={`Slide ${index}`}
            height={1078}
            width={565}
            className="w-full h-full"
            priority={index === 0}
          />

          {/* <img src={img} alt={`Slide ${index}`} className="w-full h-full" /> */}
        </div>
      ))}
    </Slider>
  )
}

export default ImageSlider
