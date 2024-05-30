import { WaxJS } from '@waxio/waxjs/dist';

console.log('Script is loaded');

const wax = new WaxJS({ rpcEndpoint: 'https://wax.greymass.com' });
let userAccount;

document.getElementById('login-wax').addEventListener('click', async () => {
    console.log('Login button clicked');
    try {
        userAccount = await wax.login();
        console.log('Logged in as:', userAccount);
        displayUserInfo(userAccount);
    } catch (e) {
        console.error('Login failed:', e);
    }
});

document.getElementById('logout-button').addEventListener('click', () => {
    console.log('Logout button clicked');
    userAccount = null;
    hideUserInfo();
});

function displayUserInfo(account) {
    document.getElementById('wallet-address').textContent = account;
    document.getElementById('user-info').style.display = 'block';
    document.getElementById('logout-button').style.display = 'block';
    document.getElementById('wallet-login').style.display = 'none';
    document.getElementById('staking-actions').style.display = 'block';
    updateBalances(account);
}

function hideUserInfo() {
    document.getElementById('user-info').style.display = 'none';
    document.getElementById('logout-button').style.display = 'none';
    document.getElementById('wallet-login').style.display = 'block';
    document.getElementById('staking-actions').style.display = 'none';
}

async function updateBalances(account) {
    try {
        const response = await fetch(`https://wax.greymass.com/v1/chain/get_currency_balance`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                code: 'eosio.token',
                account: account,
                symbol: 'WAX',
            }),
        });
        const balance = await response.json();
        document.getElementById('wax-amount').textContent = balance[0] || '0 WAX';

        // Assuming there's an endpoint or method to get WYNX balance
        const wynxResponse = await fetch(`https://your-wynx-api-endpoint`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                account: account,
            }),
        });
        const wynxBalance = await wynxResponse.json();
        document.getElementById('wynx-amount').textContent = wynxBalance.balance || '0 WYNX';
    } catch (e) {
        console.error('Failed to fetch balances:', e);
    }
}

document.getElementById('stake-all').addEventListener('click', async () => {
    if (!userAccount) {
        alert('Please login first');
        return;
    }
    try {
        const result = await wax.api.transact({
            actions: [{
                account: 'yourcontract', // Replace with your contract account
                name: 'stake',
                authorization: [{
                    actor: userAccount,
                    permission: 'active',
                }],
                data: {
                    user: userAccount,
                    template_ids: [798962, 798911, 798907, 798908, 798909, 798910, 798906, 798905, 798904, 798903],
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
        console.log('Stake successful:', result);
    } catch (e) {
        console.error('Stake failed:', e);
    }
});

document.getElementById('claim-wynx').addEventListener('click', async () => {
    if (!userAccount) {
        alert('Please login first');
        return;
    }
    try {
        const result = await wax.api.transact({
            actions: [{
                account: 'yourcontract', // Replace with your contract account
                name: 'claim',
                authorization: [{
                    actor: userAccount,
                    permission: 'active',
                }],
                data: {
                    user: userAccount,
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
        console.log('Claim successful:', result);
    } catch (e) {
        console.error('Claim failed:', e);
    }
});

document.getElementById('unstake-all').addEventListener('click', async () => {
    if (!userAccount) {
        alert('Please login first');
        return;
    }
    try {
        const result = await wax.api.transact({
            actions: [{
                account: 'yourcontract', // Replace with your contract account
                name: 'unstake',
                authorization: [{
                    actor: userAccount,
                    permission: 'active',
                }],
                data: {
                    user: userAccount,
                },
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        });
        console.log('Unstake successful:', result);
    } catch (e) {
        console.error('Unstake failed:', e);
    }
});
