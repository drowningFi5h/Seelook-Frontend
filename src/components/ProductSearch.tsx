'use client';

import React, { useState } from 'react';
import SearchInput from './SearchInput';
import { searchProducts } from '@/utils/searchProducts';

const ProductSearch: React.FC = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const handleSearch = async (query: string) => {
    if (query) {
      const results = await searchProducts(query);
      setSearchResults(results || []); // Assign hits or an empty array if no results
    } else {
      setSearchResults([]); // Clear results if the query is empty
    }
  };

  return (
    <div>
      <SearchInput onSearch={handleSearch} />
      <div>
        {searchResults.length > 0 ? (
          searchResults.map((product: any) => (
            <div key={product.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
              {product.thumbnail ? (
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              ) : (
                <p>No thumbnail available</p>
              )}
              <h2>{product.name || 'No name available'}</h2>
              <p>{product.description || 'No description available'}</p>
              <p>Price: ${product.price || 'No price available'}</p>
              <p>
                Tags: {product.tags && product.tags.length > 0
                ? product.tags.join(', ')
                : 'No tags available'}
              </p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductSearch;
