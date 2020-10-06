import { Pipe, PipeTransform } from '@angular/core';
import { Book } from './books/book.model';

@Pipe({
  name: 'searchFilter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Book[], searchText: string): any[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    return items.filter(it => {
      return it.isMatchQuery(searchText)
    });
  }

}
