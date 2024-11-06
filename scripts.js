// scripts.js

// Load the Web3Modal library
const script = document.createElement('script');
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/web3modal/1.9.4/web3modal.min.js';
script.onload = () => {
    initializeWeb3Modal();
};
document.head.appendChild(script);

let web3Modal;
let provider;

function initializeWeb3Modal() {
    const providerOptions = {
        walletconnect: {
            package: window.WalletConnectProvider.default,
            options: {
                infuraId: 'YOUR_INFURA_ID' // Replace with your Infura Project ID
            }
        }
    };

    web3Modal = new Web3Modal.default({
        cacheProvider: false,
        providerOptions,
    });
}

async function connectWallet() {
    try {
        provider = await web3Modal.connect();
        window.web3 = new Web3(provider);
        const accounts = await window.web3.eth.getAccounts();
        if (accounts.length > 0) {
            const walletAddressElement = document.getElementById('wallet-address');
            if (walletAddressElement) {
                walletAddressElement.innerText = `Connected: ${accounts[0]}`;
            }
            alert('Wallet connected successfully');
        } else {
            alert('No accounts found. Please try connecting your wallet again.');
        }
    } catch (error) {
        console.error('User rejected wallet connection or error occurred:', error);
    }
}

async function donate() {
    if (window.web3) {
        try {
            const accounts = await window.web3.eth.getAccounts();
            if (accounts.length === 0) {
                alert('No wallet connected. Please connect your wallet to proceed with the donation.');
                return;
            }

            const donationAmount = window.web3.utils.toWei('0.01', 'ether');
            await window.web3.eth.sendTransaction({
                from: accounts[0],
                to: '0x0Fa32B0afFBC131e3323A0D87636049199B6C7d4',
                value: donationAmount
            });
            alert('Thank you for your donation!');
        } catch (error) {
            console.error('Error during donation:', error);
            alert('There was an error processing your donation. Please check your wallet and try again.');
        }
    } else {
        alert('Please install a Web3 wallet to proceed.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.connect-wallet').forEach(button => {
        button.addEventListener('click', () => {
            connectWallet();
        });
    });

    document.querySelectorAll('.donate-button').forEach(button => {
        button.addEventListener('click', () => {
            donate();
        });
    });
});
