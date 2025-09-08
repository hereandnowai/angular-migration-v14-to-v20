import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

@Component({
  selector: 'app-simple-popover',
  templateUrl: './simple-popover.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimplePopoverComponent {
  isOpen = input.required<boolean>();
  position = input<'top' | 'bottom' | 'left' | 'right'>('top');

  private readonly baseClasses = 'absolute z-10 w-max min-w-[150px] bg-white rounded-lg shadow-2xl border border-gray-200';

  private positionClasses = computed(() => {
    switch (this.position()) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    }
  });

  combinedClasses = computed(() => `${this.baseClasses} ${this.positionClasses()}`);
}
