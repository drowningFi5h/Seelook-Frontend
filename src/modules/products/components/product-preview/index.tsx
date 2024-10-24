import React from 'react'
import { Text } from "@medusajs/ui"
import { ProductPreviewType } from "types/global"
import { retrievePricedProductById } from "@lib/data"
import { getProductPrice } from "@lib/util/get-product-price"
import { Region } from "@medusajs/medusa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"
import { Suspense } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface PreviewCardProps {
  productPreview: ProductPreviewType
  isFeatured?: boolean
  price?: any
  className?: string
}

const PreviewCard = ({
                       productPreview,
                       price,
                       className = ""
                     }: PreviewCardProps) => {
  return (
    <Card className={`overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}>
      <LocalizedClientLink
        href={`/products/${productPreview.handle}`}
        className="group block w-full h-full"
      >
        <div className="relative aspect-square">
          <Thumbnail
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            thumbnail={productPreview.thumbnail}
            size="full"
          />
        </div>
        <CardContent className="p-3">
          <Text
            className="text-base line-clamp-2 group-hover:text-primary transition-colors duration-200"
            data-testid="product-title"
          >
            {productPreview.title}
          </Text>
        </CardContent>
        <CardFooter className="p-3 pt-0">
          {price && (
            <div className="flex items-center justify-between w-full">
              <PreviewPrice price={price} />
            </div>
          )}
        </CardFooter>
      </LocalizedClientLink>
    </Card>
  )
}

const ProductPreview = async ({
                                productPreview,
                                isFeatured,
                                region,
                                className,
                              }: {
  productPreview: ProductPreviewType
  isFeatured?: boolean
  region: Region
  className?: string
}) => {
  const pricedProduct = await retrievePricedProductById({
    id: productPreview.id,
    regionId: region.id,
  })

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  })

  return (
    <Suspense fallback={<ProductPreviewSkeleton />}>
      <PreviewCard
        productPreview={productPreview}
        isFeatured={isFeatured}
        price={cheapestPrice}
        className={className}
      />
    </Suspense>
  )
}

const ProductPreviewSkeleton = () => {
  return (
    <div className="grid grid-cols-4 small:grid-cols-2 medium:grid-cols-3 gap-x-10 gap-y-8">
      {Array.from({ length: 12 }).map((_, i) => (
        <Card key={i} className="animate-pulse">
          <div className="aspect-square bg-muted"></div>
          <CardContent className="p-3">
            <div className="h-4 w-2/3 bg-muted rounded mb-2"></div>
            <div className="h-3 w-1/2 bg-muted rounded"></div>
          </CardContent>
          <CardFooter className="p-3 pt-0">
            <div className="h-6 w-full bg-muted rounded"></div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

export default ProductPreview