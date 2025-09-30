interface RequestOptions {
    method: string;
    headers: { [key: string]: string };
}

type DataResponse = {
    data: {
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
}

interface CacheEntry {
    data: DataResponse;
    timestamp: number;
}

const CACHE_KEY = 'covid_data_cache';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

function getCachedData(): CacheEntry | null {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;

    try {
        const cacheEntry: CacheEntry = JSON.parse(cached);
        const now = Date.now();

        // Check if cache is still valid
        if (now - cacheEntry.timestamp < CACHE_DURATION) {
            return cacheEntry;
        }
    } catch (error) {
        console.error('Error parsing cached data:', error);
    }
    
    return null;
}

function setCacheData(data: DataResponse): void {
    const cacheEntry: CacheEntry = {
        data,
        timestamp: Date.now()
    };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheEntry));
}

import { config } from './config';

// Reference: https://rapidapi.com/api-sports/api/covid-19-statistics/
async function fetchCovidRegions() {
    if (!config.rapidApiKey) {
        throw new Error('RAPID_API_KEY environment variable is not set');
    }

    const url: string = 'https://covid-19-statistics.p.rapidapi.com/reports/total?date=2020-04-07';
    const options: RequestOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': config.rapidApiKey,
            'x-rapidapi-host': 'covid-19-statistics.p.rapidapi.com'
        }
    };

    try {
        const response: Response = await fetch(url, options);
        const result: DataResponse = await response.json();

        return result;
    } catch (error) {
        console.error(error);
    }
}

// Theme toggle functionality
function initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggle(savedTheme === 'dark');
}

function updateThemeToggle(isDark: boolean): void {
    const sunIcon = document.querySelector<SVGElement>('.sun-icon');
    const moonIcon = document.querySelector<SVGElement>('.moon-icon');
    const themeLabel = document.querySelector<HTMLElement>('.theme-label');
    
    if (sunIcon && moonIcon && themeLabel) {
        sunIcon.style.display = isDark ? 'none' : 'block';
        moonIcon.style.display = isDark ? 'block' : 'none';
        themeLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    }
}

function toggleTheme(): void {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle(newTheme === 'dark');
}

// Initialize theme
initializeTheme();

// Add event listener to theme toggle button
const themeToggle = document.querySelector<HTMLButtonElement>('.theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

async function updateUIWithData(data: DataResponse['data']) {
    // Select elements from the DOM
    const dateElement = document.querySelector<HTMLElement>('#date');
    const lastUpdateElement = document.querySelector<HTMLElement>('#last-update');
    const confirmedCasesElement = document.querySelector<HTMLElement>('#confirmed-cases');
    const activeCasesElement = document.querySelector<HTMLElement>('#active-cases');
    const deathsElement = document.querySelector<HTMLElement>('#deaths');
    const recoveredElement = document.querySelector<HTMLElement>('#recovered');

    if (!dateElement || !lastUpdateElement || !confirmedCasesElement || !activeCasesElement || !deathsElement || !recoveredElement) {
        throw new Error('Required DOM elements not found');
    }

    dateElement.textContent = data.date || 'N/A';
    lastUpdateElement.textContent = data.last_update || 'N/A';
    confirmedCasesElement.textContent = data.confirmed?.toString() || 'N/A';
    activeCasesElement.textContent = data.active?.toString() || 'N/A';
    deathsElement.textContent = data.deaths?.toString() || 'N/A';
    recoveredElement.textContent = data.recovered?.toString() || 'N/A';
}

// Try to get cached data first
const cachedData = getCachedData();
if (cachedData) {
    updateUIWithData(cachedData.data.data);
} else {
    // If no valid cache exists, fetch fresh data
    fetchCovidRegions().then((response) => {
        if (!response) return;
        
        // Cache the new data
        setCacheData(response);
        
        // Update UI
        updateUIWithData(response.data);
    });
}


