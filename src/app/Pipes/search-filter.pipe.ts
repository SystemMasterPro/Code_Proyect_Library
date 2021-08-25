import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(list: any[], text:string): any[] {
    if (!text) return list
    return list.filter(book => book.title.toUpperCase().includes(text.toUpperCase()))
  }

}