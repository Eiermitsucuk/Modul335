import { Injectable } from '@angular/core';
import { Geolocation, Position } from '@capacitor/geolocation';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  async checkPermissions(): Promise<boolean> {
    try {
      const permission = await Geolocation.checkPermissions();
      console.log('📍 Permission status:', permission);
      
      if (permission.location !== 'granted') {
        console.log('📍 Requesting permissions...');
        const request = await Geolocation.requestPermissions();
        console.log('📍 Permission request result:', request);
        return request.location === 'granted';
      }
      return true;
    } catch (error) {
      console.error('❌ Error checking location permissions:', error);
      return false;
    }
  }

  async getCurrentPosition(): Promise<Position | null> {
    try {
      console.log('📍 Starting location request...');
      
      // Erst Berechtigung prüfen
      const hasPermission = await this.checkPermissions();
      if (!hasPermission) {
        console.warn('⚠️ Location permission not granted');
        throw new Error('GPS-Berechtigung wurde nicht erteilt');
      }

      console.log('📍 Getting current position...');
      
      // Position mit längerer Timeout abrufen
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000,  // 15 Sekunden
        maximumAge: 5000 // Akzeptiere 5 Sekunden alte Position
      });

      console.log('✅ Position received:', position);
      return position;
    } catch (error: any) {
      console.error('❌ Error getting current position:', error);
      console.error('Error details:', {
        message: error.message,
        code: error.code,
        name: error.name
      });
      
      // Bessere Fehlermeldung
      if (error.message?.includes('timeout')) {
        throw new Error('GPS-Timeout: Position konnte nicht ermittelt werden. Stelle sicher, dass Location im Emulator gesetzt ist.');
      }
      throw error;
    }
  }

  async getFormattedLocation(): Promise<string | null> {
    const position = await this.getCurrentPosition();
    if (position) {
      const { latitude, longitude } = position.coords;
      return `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
    }
    return null;
  }

  async getLocationString(): Promise<string> {
    try {
      const position = await this.getCurrentPosition();
      if (position) {
        const { latitude, longitude, accuracy } = position.coords;
        console.log('✅ Location string generated:', { latitude, longitude, accuracy });
        return `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)} (±${Math.round(accuracy || 0)}m)`;
      }
      return 'Standort nicht verfügbar';
    } catch (error: any) {
      console.error('❌ getLocationString error:', error);
      throw error;
    }
  }

  // Öffnet Google Maps mit Koordinaten
  openInMaps(latitude: number, longitude: number): void {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    window.open(url, '_blank');
  }
}

