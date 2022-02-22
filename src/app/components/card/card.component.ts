import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { Subscription } from 'rxjs';
import { GetcardsService } from '../../service/getcards.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @ViewChild('deckCards') deckCards: ElementRef<HTMLElement> | any;

  getCard$!: Subscription;
  allCards: any;
  imageUrl: any;
  imageUrlBack: any;
  lockFlip: boolean = false;

  constructor(private cardtarot: GetcardsService) {}

  ngOnInit(): void {
    //Inicializa a alimentação das cartas
    this.callCardTarot();
  }

  callCardTarot() {
    //Puxa da API o Json
    this.getCard$ = this.cardtarot.getCard().subscribe((card) => {
      //Insere a array de cartas
      this.allCards = card.cards;
      //Insere a imagem URL
      this.imageUrl = card.imagesUrl;
      //Insere a imagem de fundo
      this.imageUrlBack = card.imageBackCard;
      //Organiza de 'A' a 'Z' as cartas
      this.allCards.sort();
    });
  }
//Responsavel pelo giro da carta
  toggleCard(e: any) {
    //Verifica se as cartas foram embaralhadas
    if(this.deckCards.nativeElement.classList.contains('shuffled')){
      //Constroi uma array a patir do HTML de cartas
      let checkDeck = [...this.deckCards.nativeElement.children];
      //Verifica se esta travada para uma carta
      if(!this.lockFlip){
        //percorre todos os cards
        checkDeck.forEach((element:any) => {
          //Ativa o giro desta carta
          e.target.parentElement.parentElement.classList.toggle('flipped');
          //Verifica se existe alguma carta girada
          if(!element.classList.contains('flipped')){
            //Ativa a trava da carta
            this.lockFlip = true;
            return;
          }
        });  
      }

      return;
    }

    //Gira a carta
    e.target.parentElement.parentElement.classList.toggle('flipped');
  }
 
  clearAllCards(){
    
    let checkDeck = [...this.deckCards.nativeElement.children];

    checkDeck.forEach((element:any) => {
      if(element.classList.contains('flipped')){
        //Se existir alguma carta que ja foi girada, reseta todas as cartas giradas
        element.classList.remove('flipped');
      }
    });  
  }

  shuffleCards(){
    //Adiciona a animação de embaralhamento
    this.deckCards.nativeElement.classList.add('shuffling');
    //Vira as cartas de costas
    this.deckCards.nativeElement.classList.add('shuffled');
    //Randomiza array de cartas
    this.allCards = this.shuffle(this.allCards);
    //Destava o giro de uma carta
    this.lockFlip = false;
    //Reseta o giro de todas as cartas
    this.clearAllCards();
    //Limita a exibição de cartas para 3
    this.allCards.length = 3;
    
    //Reseta a animação após 2.5 segundos
    setTimeout(() => {
      this.deckCards.nativeElement.classList.remove('shuffling');
    }, 2500);
  }
    //Embaralha as cartas
  shuffle(array: any) {
    let currentIndex = array.length,
      randomIndex;

    //Enquanto houver elementos para embaralhar
    while (currentIndex != 0) {
      // Pegue o elemento restante
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      //E troca-o com o elemento atual
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    //Retorna o valor
    return array;
  }
}
