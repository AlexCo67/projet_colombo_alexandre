import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtreRecherche'
})
export class RecherchePipe implements PipeTransform {

  transform(value: any, searchValue: string): any {

    if (!searchValue) return value;
    return value.filter((v: { id: number; nom: string; prix:number; }) => v.id.toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || v.nom.toLowerCase().indexOf(searchValue.toLowerCase()) > -1 || v.prix.toString().toLowerCase().indexOf(searchValue.toLowerCase()) > -1)

  }

}