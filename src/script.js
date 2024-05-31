import { Api, JsonRpc } from 'eosjs';
import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig';
import WaxJS from '@waxio/waxjs/dist';

const rpc = new JsonRpc('https://wax.greymass.com', { fetch });

async function login() {
    const wax = new WaxJS({
        rpcEndpoint: 'https://wax.greymass.com',
    });

    try {
        const userAccount = await wax.login();
        const userBalance = await rpc.get_currency_balance('eosio.token', userAccount, 'WAX');
        const wynxBalance = await rpc.get_currency_balance('wynxcbyte.gm', userAccount, 'WYNX');

        document.getElementById('user-account').textContent = `User: ${userAccount}`;
        document.getElementById('wax-balance').textContent = `WAX: ${userBalance}`;
        document.getElementById('wynx-balance').textContent = `WYNX: ${wynxBalance}`;

        document.getElementById('wallet-login').classList.add('hidden');
        document.getElementById('staking-actions').classList.remove('hidden');
    } catch (e) {
        console.error('Login failed:', e);
    }
}

function logout() {
    // Implementation of logout functionality
    document.getElementById('wallet-login').classList.remove('hidden');
    document.getElementById('staking-actions').classList.add('hidden');
}

document.getElementById('login-button').addEventListener('click', login);
