import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import PaginatedProducts from "@modules/store/templates/paginated-products"

import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Wholesale Products",
    description: "Explore our wholesale product offerings at discounted prices.",
}


type Params = {
    params: {
        countryCode: string
    }
}

export default function WholesalePage({ params }: Params) {
    const page = 1  // Default page number, you can handle pagination later if needed

    return (
        <div className="flex flex-col py-6 content-container" data-testid="wholesale-page-container">
            <div className="mb-8 text-2xl-semi">
                <h1 data-testid="wholesale-page-title">Wholesale Products</h1>
            </div>
            <Suspense fallback={<SkeletonProductGrid />}>
                <PaginatedProducts
                    sortBy="created_at"
                    page={page}
                    countryCode={params.countryCode}
                    wholesale={true}   // Fetch only wholesale products
                />
            </Suspense>
        </div>
    )
}
