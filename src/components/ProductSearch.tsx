'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Search } from "lucide-react";
import { searchProducts } from "@/utils/searchProducts"

const ProductSearch = () => {
  const router = useRouter();
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (query: string) => {
    if (query) {
      setIsLoading(true);
      try {
        const results = await searchProducts(query);
        // console.log(results);
        setSearchResults(results || []);
      } catch (error) {
        console.error('Search error:', error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = '/api/placeholder/400/400';
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
      )}

      {!isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {searchResults.length > 0 ? (
            searchResults.map((product: any) => (
              <Link
                href={`/in/products/${product.handle}`}
                key={product.id}
                className="block"
              >
                <Card
                  className="overflow-hidden cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  role="article"
                >
                  <div className="relative aspect-square">
                    {product.thumbnail ? (
                      <img
                        src={product.thumbnail}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={handleImageError}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">No image available</span>
                      </div>
                    )}
                  </div>
                  <CardContent>
                    <h2 className="text-xl font-semibold mb-2 text-blue-600 hover:text-blue-800">
                      {product.name || 'No name available'}
                    </h2>
                    <p className="text-gray-600 mb-4">
                      {product.description || 'No description available'}
                    </p>
                    <p className="text-green-600 font-bold mb-2">
                      Price: ${product.price || 'No price available'}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.tags && product.tags.length > 0 ? (
                        product.tags.map((tag: string) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-gray-500">No tags available</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center py-8 text-gray-500">
              No results found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductSearch;