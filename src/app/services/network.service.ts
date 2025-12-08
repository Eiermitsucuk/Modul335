import { Injectable } from '@angular/core';
import { Network } from '@capacitor/network';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private isOnline$ = new BehaviorSubject<boolean>(true);
  private networkType$ = new BehaviorSubject<string>('unknown');

  constructor() {
    this.initNetworkListener();
  }

  private async initNetworkListener() {
    // Initial Status
    const status = await Network.getStatus();
    this.isOnline$.next(status.connected);
    this.networkType$.next(status.connectionType);

    // Listener für Statusänderungen
    Network.addListener('networkStatusChange', status => {
      this.isOnline$.next(status.connected);
      this.networkType$.next(status.connectionType);
      console.log('Network status changed:', status);
    });
  }

  getNetworkStatus(): Observable<boolean> {
    return this.isOnline$.asObservable();
  }

  getNetworkType(): Observable<string> {
    return this.networkType$.asObservable();
  }

  isCurrentlyOnline(): boolean {
    return this.isOnline$.value;
  }
}

