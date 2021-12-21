import {getWalletAddress, web3} from "../wallet.js";
import { formatValue, parseTxError } from "../utils.js";
import { NFTContract } from "../contract.js"

const getMintholderTx = ({ amountOfCinos, ref, tier, wallet }) => {
    if (tier !== undefined) {
        return NFTContract.methods.mintHolder(tier, amountOfCinos, ref ?? wallet);
    }
    return NFTContract.methods.mintHolder(amountOfCinos);
}
										
const getMintpresaleTx = ({ amountOfCinos, ref, tier, wallet }) => {
    if (tier !== undefined) {
        return NFTContract.methods.mintPresale(tier, amountOfCinos, ref ?? wallet);
    }
    return NFTContract.methods.mintPresale(amountOfCinos);
}

const getMintTx = ({ amountOfCinos, ref, tier, wallet }) => {
    if (tier !== undefined) {
        return NFTContract.methods.mint(tier, amountOfCinos, ref ?? wallet);
    }
    return NFTContract.methods.mint(amountOfCinos);
}
	
// mintHolder = CCC holder; cosmiccoffeeHolderprice
// mintPresale = Pre-Sale; preSaleprice
// mint = Public Sale; publicSaleprice		
										
const getMintholderPrice = async (tier) => {
    if (NFTContract.methods.cosmiccoffeeHolderprice)
        return NFTContract.methods.cosmiccoffeeHolderprice().call();
}
										
const getMintpresalePrice = async (tier) => {
    if (NFTContract.methods.preSaleprice)
        return NFTContract.methods.preSaleprice().call();
}
										
const getMintPrice = async (tier) => {
    if (NFTContract.methods.publicSaleprice)
        return NFTContract.methods.publicSaleprice().call();
}

// Holder claim
export const mintHolder = async (nTokens, ref, tier) => {
    const wallet = await getWalletAddress();
    const amountOfCinos = nTokens ?? 1;
    const mintHolderPrice = await getMintholderPrice(tier);

    const txParams = {
        from: wallet,
        value: formatValue(Number(mintHolderPrice) * amountOfCinos),
    }
    const estimatedGas = await getMintholderTx({ amountOfCinos, ref, tier, wallet })
        .estimateGas(txParams).catch((e) => {
            const { code, message } = parseTxError(e);
            if (code === -32000) {
                return 300000;
            }
            alert(`Error ${message}. Please try refreshing page, check your MetaMask connection or contact us to resolve`);
            console.log(e);
        })
    const gasPrice = await web3.eth.getGasPrice();
    // Math.max is for Rinkeby (low gas price), 2.5 Gwei is Metamask default for maxPriorityFeePerGas
    const maxGasPrice = Math.max(Math.round(Number(gasPrice) * 1.2), 2.5e9);
    const chainID = await web3.eth.getChainId();
    const maxFeePerGas = [1, 4].includes(chainID) ? formatValue(maxGasPrice) : undefined;

    return getMintTx({ numberOfTokens, ref, tier, wallet })
        .send({...txParams, gasLimit: estimatedGas + 5000, maxFeePerGas })
}

// Pre-Sale 
export const mintPresale = async (nTokens, ref, tier) => {
    const wallet = await getWalletAddress();
    const amountOfCinos = nTokens ?? 1;
    const mintPresalePrice = await getMintpresalePrice(tier);

    const txParams = {
        from: wallet,
        value: formatValue(Number(mintPresalePrice) * amountOfCinos),
    }
    const estimatedGas = await getMintTx({ numberOfTokens, ref, tier, wallet })
        .estimateGas(txParams).catch((e) => {
            const { code, message } = parseTxError(e);
            if (code === -32000) {
                return 300000;
            }
            alert(`Error ${message}. Please try refreshing page, check your MetaMask connection or contact us to resolve`);
            console.log(e);
        })
    const gasPrice = await web3.eth.getGasPrice();
    // Math.max is for Rinkeby (low gas price), 2.5 Gwei is Metamask default for maxPriorityFeePerGas
    const maxGasPrice = Math.max(Math.round(Number(gasPrice) * 1.2), 2.5e9);
    const chainID = await web3.eth.getChainId();
    const maxFeePerGas = [1, 4].includes(chainID) ? formatValue(maxGasPrice) : undefined;

    return getMintTx({ numberOfTokens, ref, tier, wallet })
        .send({...txParams, gasLimit: estimatedGas + 5000, maxFeePerGas })
}

// Public Sale 
export const mint = async (nTokens, ref, tier) => {
    const wallet = await getWalletAddress();
    const numberOfTokens = nTokens ?? 1;
    const mintPrice = await getMintPrice(tier);

    const txParams = {
        from: wallet,
        value: formatValue(Number(mintPrice) * numberOfTokens),
    }
    const estimatedGas = await getMintTx({ numberOfTokens, ref, tier, wallet })
        .estimateGas(txParams).catch((e) => {
            const { code, message } = parseTxError(e);
            if (code === -32000) {
                return 300000;
            }
            alert(`Error ${message}. Please try refreshing page, check your MetaMask connection or contact us to resolve`);
            console.log(e);
        })
    const gasPrice = await web3.eth.getGasPrice();
    // Math.max is for Rinkeby (low gas price), 2.5 Gwei is Metamask default for maxPriorityFeePerGas
    const maxGasPrice = Math.max(Math.round(Number(gasPrice) * 1.2), 2.5e9);
    const chainID = await web3.eth.getChainId();
    const maxFeePerGas = [1, 4].includes(chainID) ? formatValue(maxGasPrice) : undefined;

    return getMintTx({ numberOfTokens, ref, tier, wallet })
        .send({...txParams, gasLimit: estimatedGas + 5000, maxFeePerGas })
}
