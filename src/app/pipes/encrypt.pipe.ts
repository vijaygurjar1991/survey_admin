import { Pipe, PipeTransform } from '@angular/core';
import { CryptoService } from '../service/crypto.service';

@Pipe({
  name: 'encrypt'
})
export class EncryptPipe implements PipeTransform {

  constructor(private crypto:CryptoService){

  }
  transform(value: any): string {
    if(value){
      let encryptedText = encodeURIComponent(this.crypto.encrypt(`${value}`));
      return encryptedText;
    }
    return value;
  }

}
