import {ICard} from "@nery/shared"

export class CardDto implements ICard {
    name: string;
    url: string;
    username: string;
    password: string;

}
