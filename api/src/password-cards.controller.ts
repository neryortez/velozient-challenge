import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PasswordCardsService } from './password-cards.service';
import { CardDto } from "./models/card.dto";

/**
 * Controller that provides the API to manage password cards
 */
@Controller({
  path: 'password-cards'
})
export class PasswordCardsController {
  constructor(private readonly appService: PasswordCardsService) {}

  /**+
   * Get all the cards
   */
  @Get()
  getAllCards(): CardDto[] {
    return this.appService.getAllCards();
  }

  /***
   * Creates a new card
   * @param newCard
   */
  @Post()
  createNewCard(@Body() newCard: CardDto) {
    return this.appService.createNewCard(newCard);
  }

  /**
   * Edits a card
   * @param cardName
   * @param newCardInfo
   */
  @Put(":id")
  editCard(@Param("id") cardName: string, @Body() newCardInfo: CardDto) {
    return this.appService.editCard(cardName, newCardInfo);
  }

  /**
   * Removes a card
   * @param cardName
   */
  @Delete(":id")
  removeCard(@Param("id") cardName: string) {
    return this.appService.removeCard(cardName);
  }
}
