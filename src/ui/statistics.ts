import type { CovidData } from '../types';

/**
 * Updates the UI with COVID statistics
 * @param data The COVID data to display
 * @throws Error if required DOM elements are not found
 */
export async function updateUIWithData(data: CovidData): Promise<void> {
    const elements = {
        date: document.querySelector<HTMLElement>('#date'),
        lastUpdate: document.querySelector<HTMLElement>('#last-update'),
        confirmedCases: document.querySelector<HTMLElement>('#confirmed-cases'),
        activeCases: document.querySelector<HTMLElement>('#active-cases'),
        deaths: document.querySelector<HTMLElement>('#deaths'),
        recovered: document.querySelector<HTMLElement>('#recovered')
    };

    // Verify all elements exist
    if (Object.values(elements).some(element => !element)) {
        throw new Error('Required DOM elements not found');
    }

    // Update UI elements
    elements.date!.textContent = data.date || 'N/A';
    elements.lastUpdate!.textContent = data.last_update || 'N/A';
    elements.confirmedCases!.textContent = data.confirmed?.toString() || 'N/A';
    elements.activeCases!.textContent = data.active?.toString() || 'N/A';
    elements.deaths!.textContent = data.deaths?.toString() || 'N/A';
    elements.recovered!.textContent = data.recovered?.toString() || 'N/A';
}