import { WaxJS } from '@waxio/waxjs/dist';

const wax = new WaxJS({ rpcEndpoint: 'https://wax.greymass.com' });
let userAccount;

document.getElementById('login-wax').addEventListener('click', async () => {
    try {
        userAccount = await wax.login();
        console.log('Logged in as:', userAccount);
    } catch (e) {
        console.error('Login failed:', e);
    }
});

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

