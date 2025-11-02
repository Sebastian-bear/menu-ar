import { Routes } from '@angular/router';
import { Menu } from './public/components/menu/menu';
import { ArViewComponent } from './public/components/ar-view/ar-view';

export const appRoutes: Routes = [
  { path: '', component: Menu },
  { path: 'ar', component: ArViewComponent },
];
