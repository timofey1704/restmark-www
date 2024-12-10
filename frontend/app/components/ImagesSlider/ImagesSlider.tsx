'use client'

import React from 'react'
import Slider from 'react-slick'
import Image from 'next/image'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { ImageSliderProps } from '@/app/types'

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const settings = {
    dots: false,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  }

  return (
    <Slider {...settings}>
      {images.map((img, index) => (
        <div key={index} className="relative w-full pb-[75%]">
          {/*4:3 соотношение сторон*/}
          <Image
            src={img}
            alt={`Slide ${index}`}
            fill
            style={{ objectFit: 'cover' }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={index === 0}
          />
        </div>
      ))}
    </Slider>
  )
}

export default ImageSlider
