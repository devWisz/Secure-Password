
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

function generatePassword() {
    const length = lengthSlider.value;
    const hasUpper = document.getElementById('uppercase').checked;
    const hasLower = document.getElementById('lowercase').checked;
    const hasNumbers = document.getElementById('numbers').checked;
    const hasSymbols = document.getElementById('symbols').checked;

    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";

    let chars = "";
    if(hasUpper) chars += uppercase;
    if(hasLower) chars += lowercase;
    if(hasNumbers) chars += numbers;
    if(hasSymbols) chars += symbols;

    if(chars === "") {
        alert("Please select at least one character type!");
        return;
    }

    let password = "";
    for(let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    passwordDisplay.textContent = password;
    updateStrengthMeter(password);
    addToHistory(password);
}

function updateStrengthMeter(password) {
    let strength = 0;
    
    if(password.match(/[A-Z]/)) strength += 25;
    if(password.match(/[a-z]/)) strength += 25;
    if(password.match(/[0-9]/)) strength += 25;
    if(password.match(/[^A-Za-z0-9]/)) strength += 25;

    strengthMeter.style.width = strength + '%';
    
    if(strength <= 25) strengthMeter.style.background = '#dc2626';
    else if(strength <= 50) strengthMeter.style.background = '#ea580c';
    else if(strength <= 75) strengthMeter.style.background = '#ca8a04';
    else strengthMeter.style.background = '#16a34a';
}

function copyPassword() {
    if(passwordDisplay.textContent === 'Generate a password') return;
    
    navigator.clipboard.writeText(passwordDisplay.textContent)
        .then(() => showToast());
}

function showToast() {
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2000);
}

function addToHistory(password) {
    passwordHistory.unshift(password);
    if(passwordHistory.length > 5) passwordHistory.pop();
    updateHistoryDisplay();
}

function updateHistoryDisplay() {
    historyList.innerHTML = '';
    passwordHistory.forEach(pass => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.innerHTML = `
            <div>${pass}</div>
            <button class="copy-btn" onclick="navigator.clipboard.writeText('${pass}').then(() => showToast())">Copy</button>
        `;
        historyList.appendChild(item);
    });
}

function toggleHelp() {
    helpModal.style.display = helpModal.style.display === 'flex' ? 'none' : 'flex';
}

function storePassword() {
    const website = document.getElementById('website').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('stored-password').value;

    if(!website || !username || !password) {
        alert('Please fill in all fields');
        return;
    }

    const newPassword = {
        website,
        username,
        password,
        id: Date.now()
    };

    storedPasswords.push(newPassword);
    localStorage.setItem('storedPasswords', JSON.stringify(storedPasswords));
    updateStoredPasswordsDisplay();
    
    document.getElementById('website').value = '';
    document.getElementById('username').value = '';
    document.getElementById('stored-password').value = '';
}

function updateStoredPasswordsDisplay() {
    passwordsList.innerHTML = '';
    storedPasswords.forEach(pass => {
        const item = document.createElement('div');
        item.className = 'history-item';
        item.innerHTML = `
            <div>
                <strong>${pass.website}</strong><br>
                ${pass.username}
            </div>
            <div>
                <button class="copy-btn" onclick="navigator.clipboard.writeText('${pass.password}').then(() => showToast())">Copy Password</button>
                <button class="copy-btn" onclick="deletePassword(${pass.id})">Delete</button>
            </div>
        `;
        passwordsList.appendChild(item);
    });
}

function deletePassword(id) {
    storedPasswords = storedPasswords.filter(pass => pass.id !== id);
    localStorage.setItem('storedPasswords', JSON.stringify(storedPasswords));
    updateStoredPasswordsDisplay();
}


updateStoredPasswordsDisplay();