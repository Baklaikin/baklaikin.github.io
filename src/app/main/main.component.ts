import { Component, OnInit } from '@angular/core';
import { DataShareService } from '../share/data-share.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  firstCurrency = document.getElementById('#firstCurrency');
  secondCurrency = document.getElementById('#secondCurrency');
  amount = document.querySelector('.amount');

  firstCurrencyValue: number = 0;
  secondCurrencyValue: number = 0;
  quantity: number = 0;
  result: number = 0;
  output: string = "";

  message: any;
  
  items: any[] = [
    { id: 0, name: 'Валюта' },
    { id: 1, name: 'uah' },
    { id: 2, name: 'usd' },
    { id: 3, name: 'eur' },
    { id: 4, name: 'btc' }
  ];
  
  constructor(private data: DataShareService) { }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message)
  }

  calculateRate() {
    const usd = this.message.find((item: any) => {
      if (item.ccy === "USD") {
        return item.sale
      }
    })
    if (this.firstCurrency === this.items[4].name.toUpperCase() && this.secondCurrency === this.items[1].name.toUpperCase()) {
      this.result = ((this.firstCurrencyValue / this.secondCurrencyValue) * Number(usd.sale)) * this.quantity;
      this.result = Number(this.result.toFixed(2));
      this.output = this.result.toString();
      return;
    }
    if (this.firstCurrencyValue && this.secondCurrencyValue &&this. quantity) {
      this.result = (this.firstCurrencyValue / this.secondCurrencyValue) * this.quantity;
    }
  
    this.result = Number(this.result.toFixed(2));
    this.output = this.result.toString();
    return this.output;
  }
 
  getSelectedValue(event: any) {
  
    if (event.target.id === "firstCurrency") {
      this.firstCurrency = this.items[event.target.value].name.toUpperCase();

       if (this.firstCurrency === this.items[1].name.toUpperCase()) {
          this.firstCurrencyValue = 1;
          return;
        }
      this.message.filter((item: any) => {   
        if (item.ccy === this.firstCurrency) {
          this.firstCurrencyValue = item.sale;
          return
        }
      })
      return;
    }
     if (event.target.id === "secondCurrency") {
       this.secondCurrency = this.items[event.target.value].name.toUpperCase();
        if (this.secondCurrency === this.items[1].name.toUpperCase()) {
          this.secondCurrencyValue = 1;
          return;
        }
       this.message.filter((item:any) => {
         if (item.ccy === this.secondCurrency) {
           this.secondCurrencyValue = item.sale;
         }
       })
      return;
    } 
    if (event.target.name === "amount") {
      this.quantity = Number(event.target.value);
      // this.calculateRate(this.firstCurrencyValue,this.secondCurrencyValue,this.quantity);
      return;
    }
  }
}
