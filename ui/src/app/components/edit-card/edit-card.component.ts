import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { ICard } from "@nery/shared";
import { FormBuilder, FormGroup } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit {

  public form: FormGroup;
  hidePassword = true;

  constructor(
      @Inject(MAT_DIALOG_DATA)
      protected cardInfo: ICard,
      private snackBar: MatSnackBar,
      private dialogRef: MatDialogRef<EditCardComponent>,
      formBuilder: FormBuilder,
  ) {
    this.form = formBuilder.group<ICard>({
      name: this.cardInfo?.name || '',
      url: this.cardInfo?.url || '',
      password: this.cardInfo?.password || '',
      username: this.cardInfo?.username || '',
    });
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(this.form.value);
  }

  showCopiedMessage() {
    this.snackBar.open(`The password has been copied`);
  }
}
