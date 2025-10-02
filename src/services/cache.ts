import type { CacheEntry, DataResponse } from '../types';

// Constants
export const CACHE_KEY = 'covid_data_cache';
export const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Retrieves cached COVID data if it exists and is still valid
 * @returns The cached data entry or null if no valid cache exists
 */
export function getCachedData(): CacheEntry | null {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    try {
        const cacheEntry: CacheEntry = JSON.parse(cached);
        const now = Date.now();

        if (now - cacheEntry.timestamp < CACHE_DURATION) {
            return cacheEntry;
        }
    } catch (error) {
        console.error('Error parsing cached data:', error);
    }
    
    return null;
}

/**
 * Stores COVID data in the cache with a timestamp
 * @param data The COVID data to cache
 */
export function setCacheData(data: DataResponse): void {
    const cacheEntry: CacheEntry = {
        data,
        timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheEntry));
}