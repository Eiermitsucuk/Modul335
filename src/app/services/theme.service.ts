import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private darkMode = false;
  private initialized = false;

  constructor(private storageService: StorageService) {}

  async initTheme() {
    if (this.initialized) return;
    
    try {
      // Lade gespeicherte Präferenz
      const savedTheme = await this.storageService.getItem('darkMode');
      if (savedTheme !== null) {
        this.darkMode = savedTheme;
      } else {
        // Standardmäßig Light Mode (nicht System-Präferenz)
        this.darkMode = false;
      }
      this.applyTheme();
      this.initialized = true;
      console.log('✅ Theme initialized:', this.darkMode ? 'Dark' : 'Light');
    } catch (error) {
      console.error('Error initializing theme:', error);
      this.darkMode = false;
      this.applyTheme();
    }
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    console.log('🎨 Theme toggled to:', this.darkMode ? 'Dark' : 'Light');
    this.applyTheme();
    this.storageService.setItem('darkMode', this.darkMode);
  }

  private applyTheme() {
    // Force immediate class change
    document.body.classList.remove('dark');
    
    if (this.darkMode) {
      // Use setTimeout to ensure DOM update
      setTimeout(() => {
      document.body.classList.add('dark');
        console.log('🎨 Dark mode enabled, body classes:', document.body.className);
      }, 0);
    } else {
      console.log('🎨 Light mode enabled, body classes:', document.body.className);
    }
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }

  setDarkMode(enabled: boolean) {
    this.darkMode = enabled;
    console.log('🎨 Theme set to:', this.darkMode ? 'Dark' : 'Light');
    this.applyTheme();
    this.storageService.setItem('darkMode', this.darkMode);
  }
}
