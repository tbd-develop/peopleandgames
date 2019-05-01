import { Component, AfterViewInit, Input } from '@angular/core';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent implements AfterViewInit {
  @Input() person: Person;

  constructor() { }

  ngAfterViewInit() {
    
  }

}
