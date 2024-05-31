// script.js

// Function to save wallet session to local storage
function saveSession(walletAddress) {
    localStorage.setItem('walletAddress', walletAddress);
}

// Function to load wallet session from local storage
function loadSession() {
    return localStorage.getItem('walletAddress');
}

// Function to check if a user is logged in
function checkLogin() {
    const walletAddress = loadSession();
    if (walletAddress) {
        document.getElementById('wallet-address').textContent = walletAddress;
        document.getElementById('user-info').style.display = 'block';
        document.getElementById('wallet-login').style.display = 'none';
        getWynxBalance(walletAddress);
    }
}

// Function to log in with WAX wallet
async function loginWithWax() {
    // Your login logic here
    const walletAddress = 'user_wallet_address'; // Replace with actual login logic
    saveSession(walletAddress);
    checkLogin();
}

document.getElementById('login-wax').addEventListener('click', loginWithWax);
document.getElementById('login-anchor').addEventListener('click', loginWithWax); // Adjust if different logic
document.getElementById('login-wombat').addEventListener('click', loginWithWax); // Adjust if different logic
document.getElementById('logout-button').addEventListener('click', () => {
    localStorage.removeItem('walletAddress');
    location.reload();
});

checkLogin();

async function getWynxBalance(walletAddress) {
    try {
        const response = await fetch(`https://api.wax.alohaeos.com/v2/state/get_tokens?account=${walletAddress}`);
        const data = await response.json();
        const wynxToken = data.tokens.find(token => token.symbol === 'WYNX' && token.contract === 'wynxcbyte.gm');
        document.getElementById('wynx-amount').textContent = wynxToken ? wynxToken.amount : '0.0000';
    } catch (error) {
        console.error('Error fetching WYNX balance:', error);
    }
}

const templates = {
    '798962': 10,
    '798911': 10,
    '798910': 10,
    '798909': 10,
    '798908': 10,
    '798907': 10,
    '798906': 10,
    '798905': 10,
    '798904': 10,
    '798903': 10,
    '292466': 50,
    '290824': 30,
    '289964': 20,
    '289133': 10,
};

async function stakeTemplate(templateId, walletAddress) {
    const amount = templates[templateId];
    // Implement your staking logic here, e.g., interact with the blockchain
    // Transfer WYNX from wynxcbyte.gm to the user's wallet address
    console.log(`Staking ${amount} WYNX for template ${templateId} to ${walletAddress}`);
}

document.getElementById('stake-all').addEventListener('click', () => {
    const walletAddress = loadSession();
    if (walletAddress) {
        Object.keys(templates).forEach(templateId => {
            stakeTemplate(templateId, walletAddress);
        });
    } else {
        alert('Please log in first');
    }
});

// Similarly handle claim and unstake actions
