import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PeopleComponent } from './people/people.component';
import { AddPersonComponent } from './people/components/add-person/add-person.component';

import {
  MatInputModule, MatToolbarModule, MatIconModule,
  MatCardModule, MatButtonModule, MatSnackBarModule,
  MatTableModule
} from '@angular/material';
import { ListPeopleComponent } from './people/components/list-people/list-people.component';
import { NotificationsService } from './services/notifications.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    PeopleComponent,
    AddPersonComponent,
    ListPeopleComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'people-with-games', component: PeopleComponent, pathMatch: 'full'}
    ]),
    BrowserAnimationsModule,
    MatInputModule, MatToolbarModule, MatIconModule,
    MatCardModule, MatButtonModule, MatSnackBarModule,
    MatTableModule
  ],
  providers: [NotificationsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
