/**
 * Simple cache utility for storing and retrieving data with expiration
 */
export interface CacheItem<T> {
  data: T;
  timestamp: number;
}

export class Cache {
  private static instance: Cache;
  private storage: Map<string, CacheItem<any>>;
  private defaultTTL: number = 5 * 60 * 1000; // 5 minutes in milliseconds

  private constructor() {
    this.storage = new Map();
  }

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }

  public set<T>(key: string, data: T, ttl: number = this.defaultTTL): void {
    this.storage.set(key, {
      data,
      timestamp: Date.now() + ttl
    });
  }

  public get<T>(key: string): T | null {
    const item = this.storage.get(key) as CacheItem<T> | undefined;
    
    if (!item) {
      return null;
    }

    // Check if the item has expired
    if (Date.now() > item.timestamp) {
      this.storage.delete(key);
      return null;
    }

    return item.data;
  }

  public has(key: string): boolean {
    const item = this.storage.get(key);
    if (!item) return false;
    
    // Check if the item has expired
    if (Date.now() > item.timestamp) {
      this.storage.delete(key);
      return false;
    }
    
    return true;
  }

  public delete(key: string): void {
    this.storage.delete(key);
  }

  public clear(): void {
    this.storage.clear();
  }
}

export const cache = Cache.getInstance();