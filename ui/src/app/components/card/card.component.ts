import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICard } from "@nery/shared";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input()
  card!: ICard;

  @Output()
  edit = new EventEmitter<void>();

  @Output()
  delete = new EventEmitter<void>();


  constructor() { }

  ngOnInit(): void { }

}
