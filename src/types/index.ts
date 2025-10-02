/** Options for making HTTP requests */
export interface RequestOptions {
    method: string;
    headers: { [key: string]: string };
}

/** Structure of the COVID-19 statistics data response */
export interface CovidData {
    date: string;
    last_update: string;
    confirmed: number;
    confirmed_diff: number;
    deaths: number;
    deaths_diff: number;
    recovered: number;
    recovered_diff: number;
    active: number;
    active_diff: number;
    fatality_rate: number;
}

/** API response type */
export interface DataResponse {
    data: CovidData;
}

/** Structure for cached data entries */
export interface CacheEntry {
    data: DataResponse;
    timestamp: number;
}