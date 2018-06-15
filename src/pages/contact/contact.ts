import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ArtigosProvider } from '../../providers/artigos/artigos';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  artigosCarrinho: any;

  constructor(public navCtrl: NavController, public artigosProvider:ArtigosProvider) {

  }

  ionViewDidLoad(){
    this.getCarrinho();
  }

  getCarrinho(){
    this.artigosCarrinho=this.artigosProvider.getCarrinho()
  }
}
