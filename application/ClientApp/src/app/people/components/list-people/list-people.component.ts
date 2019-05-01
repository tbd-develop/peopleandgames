import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-list-people',
  templateUrl: './list-people.component.html',
  styleUrls: ['./list-people.component.css']
})
export class ListPeopleComponent implements AfterViewInit {
  public people: Person[];
  public displayedColumns: string[] = [ "firstName", "lastName", "email", "phone" ];

  constructor(private http:HttpClient) { }

  ngAfterViewInit() {
    this.http.get<Person[]>('people').subscribe(results => {
      this.people = results;
    });
  }

}

interface Person {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
