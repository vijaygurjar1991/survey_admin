import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertToUrl'
})
export class ConvertToUrlPipe implements PipeTransform {

  transform(value: any): string {
    let result =value as string;
    if(result){
      result = result.toLowerCase();
      result = result.replaceAll(' ','-');
    }
    return result;
  }

}
