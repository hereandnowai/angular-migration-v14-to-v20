
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface NavLink {
  path: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
})
export class AppComponent {
  isSidebarOpen = signal(true);

  navLinks: NavLink[] = [
    { path: '/input-fields', label: 'Input Fields', icon: '📝' },
    { path: '/virtual-table', label: 'Virtual Table', icon: '📊' },
    { path: '/drag-drop', label: 'Drag & Drop', icon: '✨' },
    { path: '/popover', label: 'Popover', icon: '💬' },
  ];

  toggleSidebar() {
    this.isSidebarOpen.update(open => !open);
  }
}
