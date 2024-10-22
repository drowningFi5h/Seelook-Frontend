import React from 'react';
import { ProductPreviewType } from "types/global";
import { Region } from "@medusajs/medusa";
import ProductPreview from "./product-preview"; // Adjust import path as needed

interface ProductCollectionGridProps {
  products: ProductPreviewType[]
  region: Region
  isFeatured?: boolean
}

const ProductCollectionGrid = ({
                                 products,
                                 region,
                                 isFeatured = false,
                               }: ProductCollectionGridProps) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {products.map((product) => (
          <div key={product.id} className="animate-fadeIn">
            <ProductPreview
              productPreview={product}
              region={region}
              isFeatured={isFeatured}
              className="h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCollectionGrid;