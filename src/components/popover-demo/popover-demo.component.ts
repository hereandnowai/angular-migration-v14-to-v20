
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { SimplePopoverComponent } from '../shared/simple-popover/simple-popover.component';

@Component({
  selector: 'app-popover-demo',
  templateUrl: './popover-demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SimplePopoverComponent],
})
export class PopoverDemoComponent {
  isProfilePopoverOpen = signal(false);
  isSettingsPopoverOpen = signal(false);
  isNotificationsPopoverOpen = signal(false);

  togglePopover(popoverSignal: ReturnType<typeof signal<boolean>>) {
    // Close all other popovers before opening a new one
    this.isProfilePopoverOpen.set(false);
    this.isSettingsPopoverOpen.set(false);
    this.isNotificationsPopoverOpen.set(false);
    
    // Toggle the selected one
    popoverSignal.update(value => !value);
  }
}
