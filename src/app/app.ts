import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Menu } from './public/components/menu/menu';
import { ArViewComponent } from './public/components/ar-view/ar-view';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Menu, ArViewComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('menu-ar');
}
