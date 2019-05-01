import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  public person: Person;

  constructor(private http: HttpClient) {
    this.person = new Person();
  }

  ngOnInit() {
  }

  addContact() {
    this.http.post('person', this.person).subscribe(_ => {

    });
  }

}

class Person {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}
