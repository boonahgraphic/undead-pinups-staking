import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import WaxJS from '@waxio/waxjs/dist';

const rpc = new JsonRpc('https://wax.greymass.com', { fetch });
let wax;

async function loginWithWAX() {
    wax = new WaxJS({
        rpcEndpoint: 'https://wax.greymass.com',
    });

    try {
        const userAccount = await wax.login();
        const waxBalance = await rpc.get_currency_balance('eosio.token', userAccount, 'WAX');
        const wynxBalance = await rpc.get_currency_balance('wynxcbyte.gm', userAccount, 'WYNX');

        document.getElementById('user-account').innerText = `User: ${userAccount}`;
        document.getElementById('wax-balance').innerText = `WAX: ${waxBalance[0] || '0.0000'}`;
        document.getElementById('wynx-balance').innerText = `WYNX: ${wynxBalance[0] || '0.0000'}`;

        document.getElementById('wallet-login').classList.add('hidden');
        document.getElementById('staking-actions').classList.remove('hidden');
    } catch (e) {
        console.error('Login failed:', e);
    }
}

async function logout() {
    wax = null;
    document.getElementById('user-account').innerText = 'User:';
    document.getElementById('wax-balance').innerText = 'WAX: 0.0000';
    document.getElementById('wynx-balance').innerText = 'WYNX: 0.0000';

    document.getElementById('wallet-login').classList.remove('hidden');
    document.getElementById('staking-actions').classList.add('hidden');
}

document.getElementById('logout-button').addEventListener('click', logout);

window.onload = () => {
    const savedUserAccount = localStorage.getItem('userAccount');
    if (savedUserAccount) {
        loginWithWAX();
    }
};
