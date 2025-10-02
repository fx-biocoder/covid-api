/**
 * Initializes the theme based on localStorage or defaults to light theme
 */
export function initializeTheme(): void {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeToggle(savedTheme === 'dark');
}

/**
 * Updates the theme toggle button appearance based on current theme
 * @param isDark Whether the dark theme is active
 */
export function updateThemeToggle(isDark: boolean): void {
    const sunIcon = document.querySelector<SVGElement>('.sun-icon');
    const moonIcon = document.querySelector<SVGElement>('.moon-icon');
    const themeLabel = document.querySelector<HTMLElement>('.theme-label');
    
    if (sunIcon && moonIcon && themeLabel) {
        sunIcon.style.display = isDark ? 'none' : 'block';
        moonIcon.style.display = isDark ? 'block' : 'none';
        themeLabel.textContent = isDark ? 'Light Mode' : 'Dark Mode';
    }
}

/**
 * Toggles between light and dark themes
 */
export function toggleTheme(): void {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle(newTheme === 'dark');
}