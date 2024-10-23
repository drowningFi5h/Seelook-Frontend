import { Region } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import React, { Suspense } from "react"
import { Button } from "@medusajs/ui"
import { Heading } from "@medusajs/ui"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import ImageGallery from "@modules/products/components/image-gallery"
import RelatedProducts from "@modules/products/components/related-products"
import ProductInfo from "@modules/products/templates/product-info"
import SkeletonRelatedProducts from "@modules/skeletons/templates/skeleton-related-products"
import { notFound } from "next/navigation"
import ProductActionsWrapper from "./product-actions-wrapper"

type ProductTemplateProps = {
  product: PricedProduct
  region: Region
  countryCode: string
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
                                                           product,
                                                           region,
                                                           countryCode,
                                                         }) => {
  if (!product || !product.id) {
    return notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main product section */}
        <div className="flex flex-col md:flex-row gap-12 py-12">
          {/* Left side - Image Gallery */}
          <div className="md:w-[60%]">
              <ImageGallery images={product?.images || []} />
          </div>

          {/* Right side - Product Info */}
          <div className="md:w-[40%] space-y-8">
            <div className="space-y-4">
              <Heading className="text-xl font-bold text-gray-900 ">{product.title}</Heading>
            </div>

            {/* Product details accordion */}
            <Accordion type="single" collapsible className="w-full ">
              <AccordionItem value="description">
                <AccordionTrigger className="text-gray-800">Product Description</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {product.description}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="details">
                <AccordionTrigger className="text-gray-800">Product Details</AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  <ProductInfo product={product} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            {/* Action buttons */}
            <div className="space-y-4">
              <Suspense fallback={<Button className="w-full bg-gray-800 text-white" disabled>Loading...</Button>}>
                <ProductActionsWrapper id={product.id} region={region} />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Related products section */}
        <div className="py-16 border-t border-gray-300">
          <h2 className="text-2xl font-semibold text-gray-900 mb-8">You May Also Like</h2>
          <Suspense fallback={<SkeletonRelatedProducts />}>
            <RelatedProducts product={product} countryCode={countryCode} />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

export default ProductTemplate