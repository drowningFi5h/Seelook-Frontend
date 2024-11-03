import { Heading, Text } from "@medusajs/ui"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { ShoppingCart, ArrowRight } from "lucide-react"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const EmptyCartMessage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardContent className="pt-6 px-6 pb-2 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <ShoppingCart className="w-8 h-8 text-primary" />
          </div>
          <Heading level="h1" className="text-2xl font-bold mb-2">
            Your Cart is Empty
          </Heading>
          <Text className="text-muted-foreground mb-6">
            You don&#39;t have anything in your cart. Let&#39;s change that and find some amazing products for you!
          </Text>
        </CardContent>
        <CardFooter className="pb-6 px-6">
          <LocalizedClientLink href="/store" className={"w-full"}>
            <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-4 rounded-md flex items-center justify-center transition-colors">
              <span className="mr-2">Explore Products</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </LocalizedClientLink>
        </CardFooter>
      </Card>
    </div>
  )
}

export default EmptyCartMessage