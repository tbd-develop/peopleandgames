import { Component, AfterViewInit, Input } from '@angular/core';
import { Person } from '../../models/person.model';
import { MatDialog } from '@angular/material';
import { DialogAddGameComponent } from '../dialog-add-game/dialog-add-game.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements AfterViewInit {
  @Input() person: Person;

  public games: Game[];
  public displayedColumns: string[] = [ "name", "platform", "year" ];

  constructor(public dialog: MatDialog, private http:HttpClient) { }

  ngAfterViewInit() {
    this.loadGames();
  }

  addGame(): void {
    const dialogRef = this.dialog.open(DialogAddGameComponent,
      {
        width: '350px',
        data: { personId: this.person.id, personName: `${this.person.firstName} ${this.person.lastName}` }
      });

    dialogRef.afterClosed().subscribe((gameName: string) => {
      if (gameName !== undefined) {
        this.loadGames();
      }
    });
  }

  private loadGames(): void {
    this.http.get<Game[]>(`games/for/${this.person.id}`).subscribe(results => {
      this.games = results;
    });
  }
}

interface Game {
  id: number;
  name: string;
  platform: string;
  year: number;
}
