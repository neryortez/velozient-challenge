import { Component } from '@angular/core';
import { CardService } from "./services/card.service";
import { filter, map, switchMap } from "rxjs/operators";
import { BehaviorSubject, Observable, merge } from "rxjs";
import { ICard } from "@nery/shared";
import { MatDialog } from "@angular/material/dialog";
import { EditCardComponent } from "./components/edit-card/edit-card.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ConfirmationDialogComponent } from "./components/confirmation-dialog/confirmation-dialog.component";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  #updateTrigger = new BehaviorSubject<void>(void 0);
  cards$: Observable<ICard[]>;
  filterByName = new FormControl<string>("");

  constructor(
      private cardService: CardService,
      private dialogs: MatDialog,
      private snack: MatSnackBar,
  ) {
    this.cards$ = merge(
        this.#updateTrigger,
        this.filterByName.valueChanges
    ).pipe(
        switchMap(() => {
          return this.cardService.getCards().pipe(map(cards => {
            const filter = this.filterByName.value;
            if (filter == null) {
              return cards;
            }
            return cards.filter(x => x.name.toLowerCase().match(filter.toLowerCase()));
          }));
        })
    )
  }

  editCard(card: ICard) {
    this.openCardDialog(card)
        .pipe(
            filter(Boolean),
            switchMap((editedCard) => this.cardService.editCard(card.name, editedCard))
        )
        .subscribe(() => {
          this.snack.open(`The card has been updated`);
          this.#updateTrigger.next();
        })
  }

  createCard() {
    this.openCardDialog()
        .pipe(
            filter(Boolean),
            switchMap((card) => this.cardService.createCard(card))
        )
        .subscribe(() => {
          this.snack.open(`The card has been created`);
          this.#updateTrigger.next();
        })
  }

  private openCardDialog(card?: ICard): Observable<ICard | null> {
    return this.dialogs.open(EditCardComponent, {
      data: card
    }).afterClosed();
  }

  deleteCard(card: ICard) {
    this.dialogs.open(ConfirmationDialogComponent, {
      data: {
        title: "Are you sure?",
        message: "You are about to remove permanently this card.",
      }
    })
        .afterClosed()
        .pipe(
            filter(Boolean),
            switchMap(() => this.cardService.deleteCard(card)),
        )
        .subscribe(() => {
          this.snack.open(`The card has been removed`);
          this.#updateTrigger.next();
        });
  }
}
