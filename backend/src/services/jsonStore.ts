import fs from 'fs';
import path from 'path';

export interface CatalogItem {
  id: string;
  name: string;
  description: string;
  image: string;
  [key: string]: any;
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface FilterParams {
  [key: string]: any;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    filters?: Record<string, any>;
  };
}

class JsonStoreService {
  private getFilePath(collection: string): string {
    return path.join(process.cwd(), 'data', collection, `${collection}.json`);
  }

  public getAvailableCollections(): string[] {
    try {
      const dataDir = path.join(process.cwd(), 'data');
      if (!fs.existsSync(dataDir)) return [];
      return fs
        .readdirSync(dataDir, { withFileTypes: true })
        .filter((dirent) => dirent.isDirectory())
        .map((dirent) => dirent.name);
    } catch {
      return [];
    }
  }

  public readCollection(collection: string): CatalogItem[] {
    try {
      const filePath = this.getFilePath(collection);
      if (!fs.existsSync(filePath)) return [];
      const content = fs.readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    } catch {
      return [];
    }
  }

  public writeCollection(collection: string, items: CatalogItem[]): void {
    const filePath = this.getFilePath(collection);
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(items, null, 2), 'utf-8');
  }

  public list(
    collection: string,
    { page, limit }: PaginationParams,
    filters?: FilterParams
  ): PaginatedResult<CatalogItem> {
    let items = this.readCollection(collection);

    // Apply attribute filters (e.g., category, genre, etc.)
    if (filters && Object.keys(filters).length > 0) {
      items = items.filter((item) => {
        return Object.entries(filters).every(([key, value]) => {
          if (!value) return true;
          const itemVal = item[key];
          if (Array.isArray(itemVal)) {
            return itemVal.some((v) => String(v).toLowerCase() === String(value).toLowerCase());
          }
          if (typeof itemVal === 'string') {
            return itemVal.toLowerCase() === String(value).toLowerCase();
          }
          return itemVal === value;
        });
      });
    }

    const total = items.length;
    const start = (page - 1) * limit;
    const data = items.slice(start, start + limit);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
        ...(filters && Object.keys(filters).length > 0 ? { filters } : {}),
      },
    };
  }

  public search(
    collection: string,
    query: string,
    { page, limit }: PaginationParams,
    filters?: FilterParams
  ): PaginatedResult<CatalogItem> {
    let items = this.readCollection(collection);
    const q = query.toLowerCase();

    // Universal deep search across all properties (name, description, director, genre, tags, ingredients, etc.)
    items = items.filter((item) => {
      return Object.values(item).some((val) => {
        if (typeof val === 'string') return val.toLowerCase().includes(q);
        if (Array.isArray(val)) return val.some((v) => String(v).toLowerCase().includes(q));
        if (typeof val === 'number') return String(val).includes(q);
        return false;
      });
    });

    if (filters && Object.keys(filters).length > 0) {
      items = items.filter((item) => {
        return Object.entries(filters).every(([key, value]) => {
          if (!value) return true;
          const itemVal = item[key];
          if (Array.isArray(itemVal)) {
            return itemVal.some((v) => String(v).toLowerCase() === String(value).toLowerCase());
          }
          return String(itemVal).toLowerCase() === String(value).toLowerCase();
        });
      });
    }

    const total = items.length;
    const start = (page - 1) * limit;
    const data = items.slice(start, start + limit);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit) || 1,
      },
    };
  }

  public getById(collection: string, id: string): CatalogItem | null {
    const items = this.readCollection(collection);
    return items.find((item) => item.id === id) || null;
  }

  public create(collection: string, newItem: Record<string, any> & { name: string; description: string; image: string }): CatalogItem {
    const items = this.readCollection(collection);
    const prefix = collection.endsWith('s') ? collection.slice(0, -1) : collection;
    const item: CatalogItem = {
      id: newItem.id || `${prefix}-${Date.now()}`,
      ...newItem,
    };
    items.push(item);
    this.writeCollection(collection, items);
    return item;
  }

  public update(collection: string, id: string, updatedFields: Record<string, any>): CatalogItem | null {
    const items = this.readCollection(collection);
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) return null;

    items[index] = {
      ...items[index],
      ...updatedFields,
      id, // ensure ID is immutable
    };
    this.writeCollection(collection, items);
    return items[index];
  }

  public delete(collection: string, id: string): boolean {
    const items = this.readCollection(collection);
    const initialLen = items.length;
    const filtered = items.filter((item) => item.id !== id);
    if (filtered.length === initialLen) return false;
    this.writeCollection(collection, filtered);
    return true;
  }
}

export const jsonStore = new JsonStoreService();
