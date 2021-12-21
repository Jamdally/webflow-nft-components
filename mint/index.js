import {updateMintButton, updateMintByTierButtons, updatePresaleButton, updateHolderButton} from "./ui.js";
import { updateConnectButton, updateWalletStatus } from "../wallet.js";
import { setContracts } from "../contract.js";
import { renderAlertContainer } from "../ui/alerts.js";

export const init = async () => {
    renderAlertContainer();
    await updateWalletStatus();
    await setContracts();
    updateConnectButton();
    updateMintButton();
    updateMintByTierButtons();
    updatePresaleButton();
    updateHolderButton();
}

init();
