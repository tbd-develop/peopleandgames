import { Injectable } from '@angular/core';
import { HubConnectionBuilder, HubConnection } from '@aspnet/signalr';
import { Subscription, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private connection: HubConnection;
  private notificationsChannel: BehaviorSubject<Notification>;

  constructor() {
    this.notificationsChannel = new BehaviorSubject<Notification>(null);

    this.connection = new HubConnectionBuilder()
      .withUrl('/notifications').build();

    this.connection.on('onNotify',
      (notification: Notification) => {
        this.notificationsChannel.next(notification);
      });

    this.connection.start();
  }

  public subscribe(callback: (n: Notification) => any) : Subscription {    
    return this.notificationsChannel.subscribe(callback);
  }
  
  public notify(notification: Notification) {
    return this.connection.send('notify', notification);
  }
}

export class Notification {
  name: string;
  description: string;

  constructor(name: string) {
    this.name = name;
  }
}
