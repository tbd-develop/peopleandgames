import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  public person: Person;

  constructor() {
    this.person = new Person();
  }

  ngOnInit() {
  }

}

class Person {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}
