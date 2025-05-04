document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const savePrefsBtn = document.getElementById('savePrefs');
    const animateBtn = document.getElementById('animateBtn');
    const animatedElement = document.getElementById('animatedElement');
    const usernameInput = document.getElementById('username');
    const themeSelect = document.getElementById('theme');
    const body = document.body;
    
    // Animation types
    const animations = ['bounce-animation', 'spin-animation', 'pulse-animation'];
    let currentAnimationIndex = 0;
    
    // Load saved preferences
    loadPreferences();
    
    // Event Listeners
    savePrefsBtn.addEventListener('click', savePreferences);
    animateBtn.addEventListener('click', triggerAnimation);
    
    // Function to save preferences to localStorage
    function savePreferences() {
        const username = usernameInput.value.trim();
        const theme = themeSelect.value;
        
        localStorage.setItem('username', username);
        localStorage.setItem('theme', theme);
        
        // Apply theme immediately
        applyTheme(theme);
        
        // Show feedback
        alert(`Preferences saved for ${username || 'guest'}!`);
    }
    
    // Function to load preferences from localStorage
    function loadPreferences() {
        const savedUsername = localStorage.getItem('username');
        const savedTheme = localStorage.getItem('theme');
        
        if (savedUsername) {
            usernameInput.value = savedUsername;
        }
        
        if (savedTheme) {
            themeSelect.value = savedTheme;
            applyTheme(savedTheme);
        }
    }
    
    // Apply selected theme
    function applyTheme(theme) {
        // Remove all theme classes first
        body.classList.remove('light', 'dark', 'blue');
        
        // Add the selected theme class
        body.classList.add(theme);
    }
    
    // Function to trigger animations
    function triggerAnimation() {
        // Remove any existing animation classes
        animations.forEach(anim => {
            animatedElement.classList.remove(anim);
        });
        
        // Add the current animation class
        const currentAnim = animations[currentAnimationIndex];
        animatedElement.classList.add(currentAnim);
        
        // Update index for next animation
        currentAnimationIndex = (currentAnimationIndex + 1) % animations.length;
        
        // Change color randomly for visual feedback
        animatedElement.style.backgroundColor = getRandomColor();
    }
    
    // Helper function to generate random colors
    function getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    // Bonus: Add hover effect with transition
    animatedElement.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.boxShadow = '0 0 15px rgba(0, 0, 0, 0.3)';
    });
    
    animatedElement.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
        this.style.boxShadow = 'none';
    });
});