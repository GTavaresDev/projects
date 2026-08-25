import { jsonStore } from '../../services/jsonStore';

export class SearchService {
  public static globalSearch(query: string, limitPerCollection = 5) {
    const collections = jsonStore.getAvailableCollections();
    const results: Record<string, any[]> = {};
    let totalMatches = 0;

    for (const collection of collections) {
      const searchResult = jsonStore.search(collection, query, { page: 1, limit: limitPerCollection });
      if (searchResult.data.length > 0) {
        results[collection] = searchResult.data;
        totalMatches += searchResult.meta.total;
      }
    }

    return {
      query,
      totalMatches,
      results,
    };
  }
}
