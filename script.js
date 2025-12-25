
        function updateTime() {
            const timeElement = document.getElementById('current-time');
            const now = new Date();
            timeElement.textContent = now.toLocaleTimeString('en-US', { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
        }

const passwordDisplay = document.getElementById('password');
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('lengthValue');
const strengthMeter = document.querySelector('.strength-meter-fill');
const historyList = document.getElementById('history-list');
const toast = document.getElementById('toast');
const helpModal = document.getElementById('helpModal');
const passwordsList = document.getElementById('passwords-list');

let passwordHistory = [];
let storedPasswords = JSON.parse(localStorage.getItem('storedPasswords')) || [];

lengthSlider.addEventListener('input', (e) => {
    lengthValue.textContent = e.target.value;
});

