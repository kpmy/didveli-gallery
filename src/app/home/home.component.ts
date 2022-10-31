import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Item} from '../../assets/model/item.schema';
import {AppService} from '../app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  itemList: Item[];

  constructor(private router: Router, private appService: AppService ) { }

  ngOnInit(): void {
    console.log('component initialized');
    this.appService.getItems().subscribe((items) => (this.itemList = items));
  }

  addItem(): void {
    const item = new Item();
    item.name = 'Item ' + '1'; //this.itemList.length;
    this.appService.addItem(item).subscribe((items) => (this.itemList = items));
  }

  deleteItem(): void {
    const item = this.itemList[this.itemList.length - 1];
    this.appService
      .deleteItem(item)
      .subscribe((items) => (this.itemList = items));
  }

}
