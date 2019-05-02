import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { NotificationsService, Notification} from '../../../services/notifications.service';

@Component({
  selector: 'app-dialog-add-game',
  templateUrl: './dialog-add-game.component.html',
  styleUrls: ['./dialog-add-game.component.css']
})
export class DialogAddGameComponent implements OnInit {
  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DialogAddGameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private notificationService: NotificationsService) { }

  ngOnInit() {
  }

  onCancelClick():void {
    this.dialogRef.close();
  }

  addGameToUser(): void {
    this.http.post('games', this.data).subscribe(_ => {
      var notification = new Notification("game");

      notification.description = `New Game '${this.data.name}' added for ${this.data.personName}!!`;

      this.notificationService.notify(notification).then(_ => {
        this.dialogRef.close(this.data.name);
      });
    });
  }

}

export class DialogData {
  personId: number;
  personName: string;
  name: string;
  platform: string;
  year: number;
}
