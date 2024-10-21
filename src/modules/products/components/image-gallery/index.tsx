"use client"
import { Image as MedusaImage } from "@medusajs/medusa"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useState } from "react"

type ImageGalleryProps = {
  images: MedusaImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [mainImage, setMainImage] = useState(images[0]); // State to track the current main image

  return (
    <div className="flex flex-col items-start relative">
      {/* Main Image Container */}
      <div className="w-full mb-4">
        <Container
          className="relative aspect-[3/4] w-full overflow-hidden bg-gray-100 rounded-md shadow-md"
        >
          <Image
            src={mainImage.url}
            className="absolute inset-0 rounded-md"
            alt={`Main Product image`}
            fill
            sizes="(max-width: 576px) 400px, (max-width: 768px) 600px, (max-width: 992px) 800px, 1000px"
            style={{
              objectFit: "contain",
            }}
          />
        </Container>
      </div>

      {/* Thumbnail Gallery */}
      <div className="flex overflow-x-auto gap-4 pb-4">
        {images.map((image, index) => (
          <div key={image.id} className="flex-shrink-0 w-20 md:w-24">
            <Container
              className={`relative aspect-[4/5] overflow-hidden bg-gray-100 rounded-md shadow-md cursor-pointer ${
                mainImage.id === image.id ? 'border-2 border-blue-500' : ''
              }`}
              onClick={() => setMainImage(image)} // Update main image on click
            >
              <Image
                src={image.url}
                className="absolute inset-0 rounded-md"
                alt={`Product image ${index + 1}`}
                fill
                sizes="80px"
                style={{
                  objectFit: "cover",
                }}
              />
            </Container>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageGallery