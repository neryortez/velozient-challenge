import { Test, TestingModule } from '@nestjs/testing';
import { PasswordCardsController } from './password-cards.controller';
import { PasswordCardsService } from './password-cards.service';
import { PASSWORD_DATA, PASSWORD_DATA_TOKEN } from "./data/password-data";
import { CardDto } from "./models/card.dto";

describe('PasswordCardController', () => {
  let appController: PasswordCardsController;
  const originalPasswordData = [...PASSWORD_DATA];

  beforeEach(async () => {

    const app: TestingModule = await Test.createTestingModule({
      controllers: [PasswordCardsController],
      providers: [{provide: PASSWORD_DATA_TOKEN, useValue: originalPasswordData}, PasswordCardsService],
    }).compile();

    appController = app.get<PasswordCardsController>(PasswordCardsController);
  });

  it('should return the initial 3 items', () => {
    expect(appController.getAllCards().length).toBe(3);
  });

  it('Should add items to the list', () => {
    const newCard = {name: 'test', url: 'https://test.com', username: 'test', password: 'test'};
    appController.createNewCard(newCard);
    const allCards = appController.getAllCards();
    expect(allCards).toContain(newCard);
  });

  it('Should remove items in the list', () => {
    const cardToBeRemoved = originalPasswordData[0];
    appController.removeCard(cardToBeRemoved.name);
    const allCards = appController.getAllCards();

    expect(allCards).not.toContain(cardToBeRemoved);
  });

  it('Should edit items in the list', () => {
    const cardToBeEdited = originalPasswordData[0];
    const newCardInfo: CardDto = {...cardToBeEdited, password: 'editedPassword'}
    appController.editCard(cardToBeEdited.name, newCardInfo);
    const allCards = appController.getAllCards();

    expect(allCards).toContain(newCardInfo);
  });
});
