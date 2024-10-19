import { Text } from "@medusajs/ui"

import { ProductPreviewType } from "types/global"

import { retrievePricedProductById } from "@lib/data"
import { getProductPrice } from "@lib/util/get-product-price"
import { Region } from "@medusajs/medusa"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "../thumbnail"
import PreviewPrice from "./price"

import {Card, CardContent, CardDescription} from "components/ui/card"

export default async function ProductPreview({
  productPreview,
  isFeatured,
  region,
}: {
  productPreview: ProductPreviewType
  isFeatured?: boolean
  region: Region
}) {

  // console.log("product --> ", productPreview);
  const pricedProduct = await retrievePricedProductById({
    id: productPreview.id,
    regionId: region.id,
  }).then((product) => product)

  if (!pricedProduct) {
    return null
  }

  const { cheapestPrice } = getProductPrice({
    product: pricedProduct,
    region,
  })

  return (
    <Card>
    <LocalizedClientLink
      href={`/products/${productPreview.handle}`}
      className="group"
    >
      <div data-testid="product-wrapper">
        <CardContent>

        <Thumbnail className={""}
          thumbnail={productPreview.thumbnail}
          size="medium"
          isFeatured={isFeatured}
        />

        <div className="flex txt-compact-medium mt-4 justify-between">
          <Text className="text-ui-fg-subtle" data-testid="product-title">{productPreview.title}</Text>
          <div className="flex items-center">
            {cheapestPrice && <PreviewPrice price={cheapestPrice} />}
          </div>
        </div>
        </CardContent>
      </div>
    </LocalizedClientLink>
    </Card>
  )
}
