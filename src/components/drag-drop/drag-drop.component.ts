
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CdkDrag, CdkDragDrop, DragDropModule, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

interface Item {
  name: string;
  emoji: string;
  type: 'fruit' | 'vegetable';
}

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DragDropModule],
})
export class DragDropComponent {
  fruits = signal<Item[]>([
    { name: 'Apple', emoji: '🍎', type: 'fruit' },
    { name: 'Banana', emoji: '🍌', type: 'fruit' },
    { name: 'Orange', emoji: '🍊', type: 'fruit' },
    { name: 'Grapes', emoji: '🍇', type: 'fruit' },
  ]);

  vegetables = signal<Item[]>([
    { name: 'Carrot', emoji: '🥕', type: 'vegetable' },
    { name: 'Broccoli', emoji: '🥦', type: 'vegetable' },
    { name: 'Eggplant', emoji: '🍆', type: 'vegetable' },
    { name: 'Tomato', emoji: '🍅', type: 'vegetable' },
  ]);

  fruitBasket = signal<Item[]>([]);
  veggieBasket = signal<Item[]>([]);

  drop(event: CdkDragDrop<Item[]>) {
    if (event.previousContainer === event.container) {
      // Move item within the same list
      const containerData = event.container.data;
      const updatedData = [...containerData];
      moveItemInArray(updatedData, event.previousIndex, event.currentIndex);
      this.updateSignal(event.container.id, updatedData);
    } else {
      // Transfer item to a different list
      const prevContainerData = event.previousContainer.data;
      const currContainerData = event.container.data;
      
      const updatedPrevData = [...prevContainerData];
      const updatedCurrData = [...currContainerData];

      transferArrayItem(
        updatedPrevData,
        updatedCurrData,
        event.previousIndex,
        event.currentIndex
      );
      
      this.updateSignal(event.previousContainer.id, updatedPrevData);
      this.updateSignal(event.container.id, updatedCurrData);
    }
  }

  // Helper to update the correct signal based on list ID
  private updateSignal(listId: string, data: Item[]) {
    switch(listId) {
      case 'fruitsList': this.fruits.set(data); break;
      case 'vegetablesList': this.vegetables.set(data); break;
      case 'fruitBasketList': this.fruitBasket.set(data); break;
      case 'veggieBasketList': this.veggieBasket.set(data); break;
    }
  }

  // Predicate function to allow only fruits in the fruit basket
  isFruit(item: CdkDrag<Item>): boolean {
    return item.data.type === 'fruit';
  }

  // Predicate function to allow only vegetables in the veggie basket
  isVegetable(item: CdkDrag<Item>): boolean {
    return item.data.type === 'vegetable';
  }
}