
import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  {
    path: 'input-fields',
    loadComponent: () => import('./components/input-fields/input-fields.component').then(m => m.InputFieldsComponent),
    title: 'Reactive Forms'
  },
  {
    path: 'virtual-table',
    loadComponent: () => import('./components/virtual-table/virtual-table.component').then(m => m.VirtualTableComponent),
    title: 'Virtual Scroll Table'
  },
  {
    path: 'drag-drop',
    loadComponent: () => import('./components/drag-drop/drag-drop.component').then(m => m.DragDropComponent),
    title: 'Drag and Drop'
  },
  {
    path: 'popover',
    loadComponent: () => import('./components/popover-demo/popover-demo.component').then(m => m.PopoverDemoComponent),
    title: 'Popover Demo'
  },
  { path: '', redirectTo: 'input-fields', pathMatch: 'full' },
  { path: '**', redirectTo: 'input-fields' }
];
