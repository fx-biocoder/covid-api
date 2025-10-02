import { fetchCovidData } from './services/api';
import { getCachedData, setCacheData } from './services/cache';
import { initializeTheme, toggleTheme } from './services/theme';
import { updateUIWithData } from './ui/statistics';

/**
 * Initializes the application
 * - Sets up theme
 * - Loads cached data or fetches fresh data
 * - Updates UI
 */
export async function initializeApp(): Promise<void> {
    // Initialize theme
    initializeTheme();

    // Set up theme toggle
    const themeToggle = document.querySelector<HTMLButtonElement>('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Load data and update UI
    const cachedData = getCachedData();
    if (cachedData) {
        await updateUIWithData(cachedData.data.data);
    } else {
        const freshData = await fetchCovidData();
        if (freshData) {
            setCacheData(freshData);
            await updateUIWithData(freshData.data);
        }
    }
}

// Start the application
initializeApp().catch(console.error);