import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import WaxJS from '@waxio/waxjs/dist';

const rpc = new JsonRpc('https://wax.greymass.com', { fetch });

const wax = new WaxJS({
    rpcEndpoint: 'https://wax.greymass.com',
});

async function login() {
    try {
        const userAccount = await wax.login();
        if (!userAccount) {
            throw new Error('Login failed');
        }

        localStorage.setItem('userAccount', userAccount);

        const waxBalance = await rpc.get_currency_balance('eosio.token', userAccount, 'WAX');
        const wynxBalance = await rpc.get_currency_balance('wynxcbyte.gm', userAccount, 'WYNX');

        document.getElementById('user-account').innerText = `User: ${userAccount}`;
        document.getElementById('wax-balance').innerText = `WAX: ${waxBalance.length ? waxBalance[0] : '0.0000'}`;
        document.getElementById('wynx-balance').innerText = `WYNX: ${wynxBalance.length ? wynxBalance[0] : '0.0000'}`;
        
        document.getElementById('wallet-login').classList.add('hidden');
        document.getElementById('staking-actions').classList.remove('hidden');
    } catch (e) {
        console.error('Login failed:', e);
    }
}

window.addEventListener('load', () => {
    const userAccount = localStorage.getItem('userAccount');
    if (userAccount) {
        document.getElementById('user-account').innerText = `User: ${userAccount}`;
        login();
    }
});

function logout() {
    localStorage.removeItem('userAccount');
    wax.logout();
    document.getElementById('user-account').innerText = 'User:';
    document.getElementById('wax-balance').innerText = 'WAX: 0.0000';
    document.getElementById('wynx-balance').innerText = 'WYNX: 0.0000';
    
    document.getElementById('wallet-login').classList.remove('hidden');
    document.getElementById('staking-actions').classList.add('hidden');
}

document.getElementById('loginWithWAX').addEventListener('click', login);
document.getElementById('logout-button').addEventListener('click', logout);
