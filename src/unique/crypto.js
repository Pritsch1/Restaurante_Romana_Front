/* ---Dependencies--- */
import CryptoJS from 'crypto-js';
/* ---envs--- */
const REACT_KEY = process.env.REACT_APP_CRYPTOKEY;

export function create_iv() {
    return CryptoJS.lib.WordArray.random(16);
}

export function encrypt_data(data, iv) {
    const key = CryptoJS.enc.Hex.parse(REACT_KEY);
    const cipher = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv });
    return cipher.toString();
}