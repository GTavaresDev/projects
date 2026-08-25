import { jsonStore } from '../../services/jsonStore';

export class RandomService {
  public static getRandomItem(collectionParam?: string) {
    const collections = collectionParam ? [collectionParam] : jsonStore.getAvailableCollections();

    if (collections.length === 0) {
      return null;
    }

    const selectedCollection = collections[Math.floor(Math.random() * collections.length)];
    const items = jsonStore.readCollection(selectedCollection);

    if (items.length === 0) {
      return null;
    }

    const randomItem = items[Math.floor(Math.random() * items.length)];

    return {
      collection: selectedCollection,
      item: randomItem,
    };
  }
}
