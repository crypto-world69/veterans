// scripts.js

// Load the Web3.js library if not already loaded
if (typeof Web3 === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/web3/4.14.0/web3.min.js';
    script.onload = () => {
        initializeWeb3();
    };
    document.head.appendChild(script);
} else {
    initializeWeb3();
}

function initializeWeb3() {
    if (typeof window.ethereum !== 'undefined') {
        window.web3 = new Web3(window.ethereum);
    } else if (typeof window.web3 !== 'undefined') {
        window.web3 = new Web3(window.web3.currentProvider);
    } else {
        console.warn('No Web3 wallet detected');
    }
}

async function connectWallet() {
    if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
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
    } else {
        alert('Please install a Web3 wallet like MetaMask, Brave, Phantom, or Trust to proceed.');
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
        alert('Please install a Web3 wallet like MetaMask, Brave, Phantom, or Trust to proceed.');
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
