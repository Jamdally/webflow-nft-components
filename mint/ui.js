import { mint, mintPresale, mintHolder } from "./web3.js";
import { showAlert } from "../ui/alerts.js";
import { parseTxError } from "../utils.js";

export const updateMintButton = () => {
    const mintButton = document.querySelector('#mint-button');
    if (mintButton) {
        mintButton.onclick = async () => {
            const initialBtnText = mintButton.textContent;
            setButtonText(mintButton, "Loading...")
            const quantity = getMintQuantity();

            await mint(quantity, getMintReferral()).then((r) => {
                setButtonText(mintButton, "Mint more");
                console.log(r);
                showAlert(`Successfully minted ${quantity} NFTs`, "success")
            }).catch((e) => {
                console.log(e)
                setButtonText(mintButton, initialBtnText);
                const { code, message } = parseTxError(e);
                if (code !== 4001) {
                    showAlert(`Minting error: ${message}. Please try again or contact us`, "error");
                }
            })
        }
    }
}

export const updateMintByTierButtons = () => {
    const tierButtons = document.querySelectorAll('[tier]')
    if (!tierButtons.length)
        return
    tierButtons.forEach((element) => {
        element.setAttribute('href', '#');
        element.onclick = async () => {
            const initialBtnText = element.textContent;
            const tierID = Number(element.getAttribute("tier"));
            await mint(1, getMintReferral(), tierID).then((r) => {
                setButtonText(element, initialBtnText);
                console.log(r);
                showAlert(`Successfully minted 1 NFTs`, "success")
            }).catch((e) => {
                console.log(e)
                setButtonText(element, initialBtnText);
                const { code, message } = parseTxError(e);
                if (code !== 4001) {
                    showAlert(`Minting error: ${message}. Please try again or contact us`, "error");
                }
            })
        }
    })
}

export const updatePresaleButton = () => {
    const presaleButton = document.querySelector('#presale-button');
    if (presaleButton) {
        presaleButton.onclick = async () => {
            const initialBtnText = presaleButton.textContent;
            setButtonText(presaleButton, "Loading...")
            const quantity = getMintPresaleQuantity();

            await mintPresale(quantity, getMintReferral()).then((r) => {
                setButtonText(presaleButton, "Mint more");
                console.log(r);
                showAlert(`Successfully minted ${quantity} NFTs`, "success")
            }).catch((e) => {
                console.log(e)
                setButtonText(presaleButton, initialBtnText);
                const { code, message } = parseTxError(e);
                if (code !== 4001) {
                    showAlert(`Minting error: ${message}. Please try again or contact us`, "error");
                }
            })
        }
    }
}

export const updateHolderButton = () => {
    const holderButton = document.querySelector('#holder-button');
    if (holderButton) {
        holderButton.onclick = async () => {
            const initialBtnText = holderButton.textContent;
            setButtonText(holderButton, "Loading...")
            const quantity = getMintHolderQuantity();

            await mintHolder(quantity, getMintReferral()).then((r) => {
                setButtonText(holderButton, "Mint more");
                console.log(r);
                showAlert(`Successfully minted ${quantity} NFTs`, "success")
            }).catch((e) => {
                console.log(e)
                setButtonText(holderButton, initialBtnText);
                const { code, message } = parseTxError(e);
                if (code !== 4001) {
                    showAlert(`Minting error: ${message}. Please try again or contact us`, "error");
                }
            })
        }
    }
}

const getMintQuantity = () => {
    const quantity = document.querySelector('#quantity-select')?.value
    return quantity !== '' ? quantity : undefined;
}

const getMintPresaleQuantity = () => {
    const quantity = document.querySelector('#quantity-select-presale')?.value
    return quantity !== '' ? quantity : undefined;
}

const getMintHolderQuantity = () => {
    const quantity = document.querySelector('#quantity-select-holder')?.value
    return quantity !== '' ? quantity : undefined;
}

const getMintReferral = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return searchParams.get("ref");
}

const setButtonText = (btn, text) => {
    if (btn.childElementCount > 0) {
        btn.children[0].textContent = text;
    } else {
        btn.textContent = text;
    }
}
