/**
 * Piercing Studio - Shared Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initRTL();
    initMobileMenu();
});

// Theme Management (Dark/Light Mode)
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    applyTheme(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(newTheme);
        });
    }
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
    } else {
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('theme', theme);
    
    // Update toggle icons if they exist
    const darkIcon = document.getElementById('theme-icon-dark');
    const lightIcon = document.getElementById('theme-icon-light');
    
    if (darkIcon && lightIcon) {
        if (theme === 'dark') {
            darkIcon.classList.add('hidden');
            lightIcon.classList.remove('hidden');
        } else {
            darkIcon.classList.remove('hidden');
            lightIcon.classList.add('hidden');
        }
    }
}

// RTL Management
function initRTL() {
    const rtlToggle = document.getElementById('rtl-toggle');
    const currentDir = localStorage.getItem('dir') || 'ltr';

    applyDir(currentDir);

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const newDir = document.documentElement.dir === 'rtl' ? 'ltr' : 'rtl';
            applyDir(newDir);
        });
    }
}

function applyDir(dir) {
    document.documentElement.dir = dir;
    localStorage.setItem('dir', dir);
}

// Mobile Menu
function initMobileMenu() {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.setAttribute('aria-expanded', 'false');

        const syncMenuState = () => {
            const isOpen = !mobileMenu.classList.contains('hidden');
            document.body.classList.toggle('menu-open', isOpen);
            menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        };

        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            syncMenuState();
        });

        mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    mobileMenu.classList.remove('flex');
                    syncMenuState();
                }
            });
        });

        syncMenuState();
    }
}
