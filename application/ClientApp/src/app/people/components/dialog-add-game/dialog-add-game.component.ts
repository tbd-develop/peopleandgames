import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dialog-add-game',
  templateUrl: './dialog-add-game.component.html',
  styleUrls: ['./dialog-add-game.component.css']
})
export class DialogAddGameComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DialogAddGameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
  }

  onCancelClick():void {
    this.dialogRef.close();
  }

  addGameToUser(): void {
    this.http.post('games', this.data).subscribe(_ => {
      this.dialogRef.close(this.data.name);
    });
  }

}

export class DialogData {
  personId: number;
  name: string;
  platform: string;
  year: number;
}
