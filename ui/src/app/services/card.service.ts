import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { ICard } from "@nery/shared";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  getCards() {
    return this.http.get<ICard[]>(`${environment.apiURL}/password-cards`);
  }

  editCard(name: string, editedCard: ICard) {
    return this.http.put(`${environment.apiURL}/password-cards/${name}`, editedCard);
  }

  createCard(card: ICard) {
    return this.http.post(`${environment.apiURL}/password-cards`, card);
  }

  deleteCard(card: ICard) {
    return this.http.delete(`${environment.apiURL}/password-cards/${card.name}`);
  }
}
