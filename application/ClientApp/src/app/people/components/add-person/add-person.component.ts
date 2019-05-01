import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.css']
})
export class AddPersonComponent implements OnInit {
  public person: Person;

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.person = new Person();
  }

  ngOnInit() {
  }

  addContact() {
    this.http.post('person', this.person).subscribe(_ => {
      this.person = new Person(); 
    }, error => {
      if (error.status === 409) {
        this.snackBar.open('You already have this person', null,
          {
            duration: 900
          });
      } else if (error.status === 400) {
        this.snackBar.open('All fields must be populated',
          null,
          {
            duration: 900
          });
      }
    });
  }

}

class Person {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}
