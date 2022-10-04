import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PASSWORD_DATA_TOKEN } from "./data/password-data";
import { CardDto } from "./models/card.dto";
import { ConflictException } from "@nestjs/common/exceptions/conflict.exception";

@Injectable()
export class PasswordCardsService {
  readonly #cards: CardDto[];

  constructor(
      @Inject(PASSWORD_DATA_TOKEN)
      originalPasswordData: CardDto[]
  ) {
    this.#cards = originalPasswordData;
  }

  getAllCards() {
    return this.#cards;
  }

  createNewCard(card: CardDto) {
    const cardIndex = this.#cards.findIndex(c => c.name === card.name);
    if (cardIndex !== -1) {
      throw new ConflictException("Card already exists")
    }

    this.#cards.push(card);
    return this.#cards;
  }

  editCard(cardName: string, newCardInfo: CardDto) {
    const cardIndex = this.#cards.findIndex(c => c.name === cardName);
    if (cardIndex === -1) {
      throw new NotFoundException(`Card ${cardName} was not found`);
    }

    this.#cards[cardIndex] = newCardInfo;
    return this.#cards;
  }

  removeCard(cardName: string) {
    const cardIndex = this.#cards.findIndex(c => c.name === cardName);
    if (cardIndex === -1) {
      throw new NotFoundException(`Card ${cardName} was not found`);
    }

    this.#cards.splice(cardIndex, 1);
  }
}
