import { jsonStore } from '../../services/jsonStore';

export class AnalyticsService {
  public static getGlobalStats() {
    const collections = jsonStore.getAvailableCollections();
    const collectionStats: Record<string, any> = {};
    let totalItemsCount = 0;

    for (const name of collections) {
      const items = jsonStore.readCollection(name);
      totalItemsCount += items.length;

      const tagCounts: Record<string, number> = {};
      let totalRating = 0;
      let ratedItemsCount = 0;

      items.forEach((item) => {
        if (Array.isArray(item.tags)) {
          item.tags.forEach((tag: string) => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          });
        }
        if (typeof item.rating === 'number') {
          totalRating += item.rating;
          ratedItemsCount++;
        }
      });

      collectionStats[name] = {
        totalItems: items.length,
        averageRating: ratedItemsCount > 0 ? parseFloat((totalRating / ratedItemsCount).toFixed(2)) : null,
        topTags: Object.entries(tagCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([tag, count]) => ({ tag, count })),
      };
    }

    return {
      totalCollections: collections.length,
      totalItems: totalItemsCount,
      collections: collectionStats,
      serverUptimeSeconds: Math.floor(process.uptime()),
      timestamp: new Date().toISOString(),
    };
  }

  public static getCollectionFacets(collection: string) {
    const items = jsonStore.readCollection(collection);

    if (items.length === 0) {
      return null;
    }

    const genres: Record<string, number> = {};
    const categories: Record<string, number> = {};
    const tags: Record<string, number> = {};
    const difficulties: Record<string, number> = {};
    const ratings: number[] = [];
    const prices: number[] = [];
    const years: number[] = [];

    items.forEach((item) => {
      if (item.genre) genres[item.genre] = (genres[item.genre] || 0) + 1;
      if (item.category) categories[item.category] = (categories[item.category] || 0) + 1;
      if (item.difficulty) difficulties[item.difficulty] = (difficulties[item.difficulty] || 0) + 1;
      if (typeof item.rating === 'number') ratings.push(item.rating);
      if (typeof item.price === 'number') prices.push(item.price);
      if (typeof item.year === 'number') years.push(item.year);

      if (Array.isArray(item.tags)) {
        item.tags.forEach((tag: string) => {
          tags[tag] = (tags[tag] || 0) + 1;
        });
      }
    });

    return {
      collection,
      totalItems: items.length,
      facets: {
        ...(Object.keys(genres).length > 0 ? { genres } : {}),
        ...(Object.keys(categories).length > 0 ? { categories } : {}),
        ...(Object.keys(difficulties).length > 0 ? { difficulties } : {}),
        ...(Object.keys(tags).length > 0 ? { tags } : {}),
        ratingRange: ratings.length > 0 ? { min: Math.min(...ratings), max: Math.max(...ratings) } : null,
        priceRange: prices.length > 0 ? { min: Math.min(...prices), max: Math.max(...prices) } : null,
        yearRange: years.length > 0 ? { min: Math.min(...years), max: Math.max(...years) } : null,
      },
    };
  }
}
