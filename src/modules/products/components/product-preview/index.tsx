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
import { Badge } from "@/components/ui/badge"

interface PreviewCardProps {
  productPreview: ProductPreviewType
  isFeatured?: boolean
  price?: any
  className?: string
}

const PreviewCard = ({
                       productPreview,
                       isFeatured,
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
          {isFeatured && (
            <Badge variant="secondary" className="absolute top-2 left-2">
              Featured
            </Badge>
          )}
        </div>
        <CardContent className="p-3">
          <Text
            className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors duration-200"
            data-testid="product-title"
          >
            {productPreview.title}
          </Text>
        </CardContent>
        <CardFooter className="p-3 pt-0">
          {price && (
            <div className="flex items-center justify-between w-full">
              <PreviewPrice price={price} />
              <Badge variant="outline" className="text-xs group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200">
                View
              </Badge>
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
    <Card className="overflow-hidden">
      <div className="animate-pulse">
        <div className="bg-muted aspect-square mb-3"></div>
        <CardContent className="p-3">
          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-muted rounded w-1/2"></div>
        </CardContent>
        <CardFooter className="p-3 pt-0">
          <div className="h-6 bg-muted rounded w-full"></div>
        </CardFooter>
      </div>
    </Card>
  )
}

export default ProductPreview