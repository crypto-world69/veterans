// scripts.js

// Load the Web3Modal, Web3.js, and WalletConnect libraries
const scriptWeb3Modal = document.createElement('script');
scriptWeb3Modal.src = 'https://cdnjs.cloudflare.com/ajax/libs/web3modal/1.9.4/web3modal.min.js';
scriptWeb3Modal.onload = () => {
    const scriptWalletConnect = document.createElement('script');
    scriptWalletConnect.src = 'https://cdnjs.cloudflare.com/ajax/libs/walletconnect/1.7.1/web3-provider.min.js';
    scriptWalletConnect.onload = () => {
        const scriptWeb3 = document.createElement('script');
        scriptWeb3.src = 'https://cdnjs.cloudflare.com/ajax/libs/web3/4.14.0/web3.min.js';
        scriptWeb3.onload = () => {
            initializeWeb3Modal();
        };
        document.head.appendChild(scriptWeb3);
    };
    document.head.appendChild(scriptWalletConnect);
};
document.head.appendChild(scriptWeb3Modal);

let web3Modal;
let provider;

function initializeWeb3Modal() {
    const providerOptions = {
        walletconnect: {
            package: WalletConnectProvider.default,
            options: {
                rpc: {
                    1: 'https://cloudflare-eth.com'
                }
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
