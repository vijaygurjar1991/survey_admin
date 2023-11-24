import { Pipe, PipeTransform } from '@angular/core';
import { CryptoService } from '../service/crypto.service';

@Pipe({
  name: 'decrypt'
})
export class DecryptPipe implements PipeTransform {

  constructor(private crypto:CryptoService){

  }
  transform(value: any): string {
    if(value){
      return this.crypto.decrypt(value);
    }
    return value;
  }

}
