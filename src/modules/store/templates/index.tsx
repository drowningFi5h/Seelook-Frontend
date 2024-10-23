import { Suspense } from "react"
import SkeletonProductGrid from "@modules/skeletons/templates/skeleton-product-grid"
import RefinementList from "@modules/store/components/refinement-list"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"
import PaginatedProducts from "./paginated-products"

const StoreTemplate = ({
                         sortBy,
                         page,
                         countryCode,
                       }: {
  sortBy?: SortOptions
  page?: string
  countryCode: string
}) => {
  const pageNumber = page ? parseInt(page) : 1

  return (
    <div className="flex flex-col small:flex-row small:items-start content-container" data-testid="category-container">
      <div className="w-full">
        {/* Title and Sort Options in the same horizontal space */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-[2rem] text-semibold" data-testid="store-page-title">All products</p>
          <RefinementList sortBy={sortBy || "created_at"} />
        </div>

        {/* Product Grid */}
        <Suspense fallback={<SkeletonProductGrid />}>
          <PaginatedProducts
            sortBy={sortBy || "created_at"}
            page={pageNumber}
            countryCode={countryCode}
          />
        </Suspense>
      </div>
    </div>
  )
}

export default StoreTemplate
