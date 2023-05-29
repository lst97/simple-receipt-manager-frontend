import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventBusService {
  private eventSubject: Subject<any> = new Subject<any>();

  constructor() {}

  publish(event: any) {
    this.eventSubject.next(event);
  }

  subscribe(callback: (event: any) => void) {
    this.eventSubject.subscribe(callback);
  }

  unsubscribe() {
    // Complete the event subject to clean up subscriptions
    this.eventSubject.complete();
  }
}
