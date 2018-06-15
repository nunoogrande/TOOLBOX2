import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ArtigosProvider } from '../../providers/artigos/artigos';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  artigos:any;

  constructor(public navCtrl: NavController,public artigosProvider:ArtigosProvider) {}

  ionViewDidLoad(){
    this.getArtigos();
  }

  getArtigos(){
    this.artigosProvider.getArtigos()
    .subscribe(
      artigos => this.artigos = Object.keys(artigos).map(function(key){return artigos[key];})
    )
  }

  carregaCarrinho(artigo){
    this.artigosProvider.carregaCarrinho(artigo)
  }
}
