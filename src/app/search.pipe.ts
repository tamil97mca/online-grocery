import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchTerm: string): any {
    if(!items) return [];
    if(!searchTerm) return items;
    console.log('Category Pipe:' , searchTerm);
    return items.filter( it => {     
     return it.name.toLowerCase().indexOf(searchTerm.toLowerCase()) != -1  ||
     it.category.toLowerCase().indexOf(searchTerm.toLocaleLowerCase()) != -1;
    });  }

}
