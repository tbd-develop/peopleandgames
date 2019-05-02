import { Component, AfterViewInit, Input } from '@angular/core';
import { Person } from '../../models/person.model';
import { MatDialog } from '@angular/material';
import { DialogAddGameComponent } from '../dialog-add-game/dialog-add-game.component';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements AfterViewInit {
  @Input() person: Person;

  public games: Game[];
  public displayedColumns: string[] = [ "name", "platform", "year" ];

  constructor(public dialog: MatDialog) {
    this.games = [
      {
        name: 'Sonic The Hedgehog',
        platform: 'Sega Genesis',
        year: 1991
      },
      {
        name: 'Tetris',
        platform: 'Nintendo Gameboy',
        year: 1989
      }
    ];
  }

  ngAfterViewInit() {
   
  }

  addGame(): void {
    const dialogRef = this.dialog.open(DialogAddGameComponent,
      {
        width: '350px',
        data: { personId: this.person.id }
      });

    dialogRef.afterClosed().subscribe(() => {
      console.log('Dialog Was Closed');
    });
  }

}

interface Game {
  name: string;
  platform: string;
  year: number;
}
