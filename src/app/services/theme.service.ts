import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private currentTheme: 'light' | 'dark';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.currentTheme = (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
    this.updateBodyClass();
  }

  private updateBodyClass(): void {
    if (this.currentTheme === 'dark') {
      this.renderer.addClass(document.body, 'dark-theme');
    } else {
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }

  toggleTheme(): void {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this.currentTheme);
    this.updateBodyClass();
  }

  isDarkMode(): boolean {
    return this.currentTheme === 'dark';
  }
}