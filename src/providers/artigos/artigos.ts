import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the ArtigosProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ArtigosProvider {
  carrinhoCompras:Array<{}>=[];

  constructor(public http: HttpClient) {
    console.log('Hello ArtigosProvider Provider');
  }

  getArtigos(): Observable<{}>{
    return this.http.get('https://umartigos.firebaseio.com/.json')
  }

  getCarrinho(){
    return this.carrinhoCompras
  }

  carregaCarrinho(artigosCarrinho){
    this.carrinhoCompras.unshift(artigosCarrinho)
  }
}
