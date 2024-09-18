import { getProductsListWithSort, getRegion } from "@lib/data"
import ProductPreview from "@modules/products/components/product-preview"
import { Pagination } from "@modules/store/components/pagination"
import { SortOptions } from "@modules/store/components/refinement-list/sort-products"

const PRODUCT_LIMIT = 12

type PaginatedProductsParams = {
    limit: number
    collection_id?: string[]
    category_id?: string[]
    id?: string[]
    tags?: string[]  // Add this to filter by tags
}

export default async function PaginatedProducts({
                                                    sortBy,
                                                    page,
                                                    collectionId,
                                                    categoryId,
                                                    productsIds,
                                                    countryCode,
                                                    wholesale
                                                }: {
    sortBy?: SortOptions,
    page: number,
    collectionId?: string,
    categoryId?: string,
    productsIds?: string[],
    countryCode: string,
    wholesale?: boolean  // Added wholesale prop
}) {
    const region = await getRegion(countryCode)

    if (!region) {
        return null
    }

    const queryParams: PaginatedProductsParams = {
        limit: PRODUCT_LIMIT,
    }

    if (collectionId) {
        queryParams["collection_id"] = [collectionId]
    }

    if (categoryId) {
        queryParams["category_id"] = [categoryId]
    }

    if (productsIds) {
        queryParams["id"] = productsIds
    }

    // Add the wholesale tag if the wholesale flag is true
    if (wholesale) {
        queryParams["tags"] = ["ptag_01J7ZVAF4SX5QRW7WDT6SN3XKA"]  // Filtering products by 'wholesale' tag
    }

    const {
        response: { products, count },
    } = await getProductsListWithSort({
        page,
        queryParams,
        sortBy,
        countryCode,
    })

    console.log('API Response:', { products, count });

    const totalPages = Math.ceil(count / PRODUCT_LIMIT)

    return (
        <>
            <ul className="grid grid-cols-2 w-full small:grid-cols-3 medium:grid-cols-4 gap-x-6 gap-y-8" data-testid="products-list">
                {products.map((p) => {
                    return (
                        <li key={p.id}>
                            <ProductPreview productPreview={p} region={region}/>
                        </li>
                    )
                }) }
            </ul>
            {totalPages > 1 && <Pagination data-testid="product-pagination" page={page} totalPages={totalPages} />}
        </>
    )
}