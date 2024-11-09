import ItemsPreviewTemplate from "@modules/cart/templates/preview"
import DiscountCode from "@modules/checkout/components/discount-code"
import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import { cookies } from "next/headers"
import { getCart } from "@lib/data"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ShoppingCart, CreditCard } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const CheckoutSummary = async () => {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return null
  }

  const cart = await getCart(cartId)

  if (!cart) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-8">
      <div className="container mx-auto px-4">
        <Card className="mx-auto max-w-4xl">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl font-bold">Checkout Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h2 className="mb-4 text-lg sm:text-xl font-semibold">Order Items</h2>
                <ItemsPreviewTemplate region={cart?.region} items={cart?.items} />
              </div>
              <Divider />
              <div>
                <h2 className="mb-4 text-lg sm:text-xl font-semibold">Order Summary</h2>
                <CartTotals data={cart} />
              </div>
              <Divider />
              <div>
                <h2 className="mb-4 text-lg sm:text-xl font-semibold">Discount Code</h2>
                <DiscountCode cart={cart} />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
            <LocalizedClientLink href={"/cart"} className={"w-full"}>
            <Button variant="outline"  className="w-full h-14 hover:bg-gray-800 hover:text-white text-base">
              <ShoppingCart className="mr-2 h-4 w-4" />
              Edit Cart
            </Button>
            </LocalizedClientLink>

            {/*Enter the Payment Gateway Link*/}
            <LocalizedClientLink href={"#"} className={"w-full"}>
            <Button className="w-full h-14 hover:bg-gray-800 hover:text-white text-base">
              <CreditCard className="mr-2 h-4 w-4" />
              Proceed to Payment
            </Button>
            </LocalizedClientLink>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default CheckoutSummary