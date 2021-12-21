import { mint } from "./web3.js";
import { showAlert } from "../ui/alerts.js";
import { parseTxError } from "../utils.js";

export const updateMintHolderButton = () => {
    const mintholderButton = document.querySelector('#holder-mint-button');
    if (mintholderButton) {
        mintholderButton.onclick = async () => {
            const initialBtnText = mintholderButton.textContent;
            setButtonText(mintholderButton, "Loading...")
            const quantity = getMintQuantity();

            await mintHolder(quantity, getMintReferral()).then((r) => {
                setButtonText(mintholderButton, "Mint more");
                console.log(r);
                showAlert(`Successfully minted ${quantity} NFTs`, "success")
            }).catch((e) => {
                console.log(e)
                setButtonText(mintHolderButton, initialBtnText);
                const { code, message } = parseTxError(e);
                if (code !== 4001) {
                    showAlert(`Minting error: ${message}. Please try again or contact us`, "error");
                }
            })
        }
    }
}

export const updateMintPresaleButton = () => {
    const mintpresaleButton = document.querySelector('#presale-mint-button');
    if (mintpresaleButton) {
        mintpresaleButton.onclick = async () => {
            const initialBtnText = mintpresaleButton.textContent;
            setButtonText(mintpresaleButton, "Loading...")
            const quantity = getMintQuantity();

            await mintPresale(quantity, getMintReferral()).then((r) => {
                setButtonText(mintpresaleButton, "Mint more");
                console.log(r);
                showAlert(`Successfully minted ${quantity} NFTs`, "success")
            }).catch((e) => {
                console.log(e)
                setButtonText(mintPresaleButton, initialBtnText);
                const { code, message } = parseTxError(e);
                if (code !== 4001) {
                    showAlert(`Minting error: ${message}. Please try again or contact us`, "error");
                }
            })
        }
    }
}

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

//Tiers - not sure what's up with these ones but will keep just in case
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


const getMintQuantity = () => {
    const quantity = document.querySelector('#quantity-select')?.value
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
