import { config } from '../../config';
import type { DataResponse, RequestOptions } from '../types';

// Constants
export const API_URL = 'https://covid-19-statistics.p.rapidapi.com/reports/total?date=2020-04-07';

/**
 * Fetches COVID-19 statistics from the RapidAPI endpoint
 * @returns Promise containing the COVID data response
 * @throws Error if API key is not set
 */
export async function fetchCovidData(): Promise<DataResponse | undefined> {
    if (!config.rapidApiKey) {
        throw new Error('RAPID_API_KEY environment variable is not set');
    }

    const options: RequestOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': config.rapidApiKey,
            'x-rapidapi-host': 'covid-19-statistics.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(API_URL, options);
        return await response.json();
    } catch (error) {
        console.error('Error fetching COVID data:', error);
    }
}