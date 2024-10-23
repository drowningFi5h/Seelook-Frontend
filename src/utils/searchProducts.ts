import client from './typesenseClient';

interface SearchResponseHit {
  id: string;
  name: string;
  description: string;
  price: number;
  tags: string[];
  handle: string;
  thumbnail: string;
}

interface SearchResponse {
  hits: Array<{ document: SearchResponseHit }>;
}

export const searchProducts = async (query: string): Promise<SearchResponseHit[]> => {
  try {
    const searchResults = await client
      .collections('products')
      .documents()
      .search({
        q: query,
        query_by: 'name,description,tags',
      });

    // Log the raw searchResults to see what’s coming from the API
    // console.log('Search Results from search:', searchResults);

    if (!searchResults || !searchResults.hits) {
      console.warn('No hits in search results');
      return [];
    }
    // Map through the hits to extract relevant product information including thumbnail
    return searchResults.hits.map((hit: any) => ({
      id: hit.document.id,
      name: hit.document.name,
      description: hit.document.description,
      price: hit.document.price,
      tags: hit.document.tags,
      handle: hit.document.handle,
      thumbnail: hit.document.thumbnail || '', // Handle missing thumbnails
    }));
  } catch (error) {
    console.error('Error fetching search results:', error);
    return [];
  }
};
