import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {
  secretKey: any;

  constructor() {
    this.secretKey = environment.CryptoKey;
  }

  encrypt(text: string): string {
    const encryptedText = CryptoJS.AES.encrypt(text, this.secretKey).toString();
    return encryptedText;
  }
  encryptParam(text: string): string {
    const encryptedText = CryptoJS.AES.encrypt(text, this.secretKey).toString();
    return encodeURI(encryptedText);
  }

  decrypt(encryptedText: string): string {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, this.secretKey);
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decryptedText;
  }

  decryptQueryParam(encryptedText: string): string {
    const decryptedBytes = CryptoJS.AES.decrypt(encryptedText, this.secretKey);
    const decryptedText = decryptedBytes.toString(CryptoJS.enc.Utf8);
    return decodeURIComponent(decryptedText);
  }
}
