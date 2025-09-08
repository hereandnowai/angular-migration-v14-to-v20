
import { ChangeDetectionStrategy, Component, computed, effect, signal } from '@angular/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule } from '@angular/forms';

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
  status: 'Active' | 'Inactive' | 'Pending';
}

@Component({
  selector: 'app-virtual-table',
  templateUrl: './virtual-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ScrollingModule, FormsModule],
})
export class VirtualTableComponent {
  readonly allEmployees = signal<Employee[]>([]);
  readonly departments = ['All', 'Engineering', 'Sales', 'Marketing', 'HR', 'Finance'];
  readonly statuses = ['All', 'Active', 'Inactive', 'Pending'];

  searchText = signal('');
  selectedDepartment = signal('All');
  selectedStatus = signal('All');

  filteredEmployees = computed(() => {
    const search = this.searchText().toLowerCase();
    const department = this.selectedDepartment();
    const status = this.selectedStatus();
    
    return this.allEmployees().filter(emp => {
      const matchesSearch = search === '' || emp.name.toLowerCase().includes(search) || emp.email.toLowerCase().includes(search);
      const matchesDept = department === 'All' || emp.department === department;
      const matchesStatus = status === 'All' || emp.status === status;
      return matchesSearch && matchesDept && matchesStatus;
    });
  });

  constructor() {
    this.generateData();
  }

  generateData() {
    const data: Employee[] = [];
    const departments = this.departments.slice(1);
    const statuses = this.statuses.slice(1) as ('Active' | 'Inactive' | 'Pending')[];
    for (let i = 1; i <= 10000; i++) {
      data.push({
        id: i,
        name: `Employee ${i}`,
        email: `employee.${i}@example.com`,
        department: departments[i % departments.length],
        status: statuses[i % statuses.length],
        salary: 50000 + Math.floor(Math.random() * 50000),
      });
    }
    this.allEmployees.set(data);
  }
  
  formatSalary(salary: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(salary);
  }

  getDepartmentClass(department: string): string {
    const classes: { [key: string]: string } = {
      'Engineering': 'bg-blue-100 text-blue-800',
      'Sales': 'bg-green-100 text-green-800',
      'Marketing': 'bg-purple-100 text-purple-800',
      'HR': 'bg-pink-100 text-pink-800',
      'Finance': 'bg-yellow-100 text-yellow-800',
    };
    return classes[department] || 'bg-gray-100 text-gray-800';
  }

  getStatusClass(status: string): string {
    const classes: { [key: string]: string } = {
      'Active': 'bg-green-100 text-green-800',
      'Inactive': 'bg-red-100 text-red-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
    };
    return classes[status] || 'bg-gray-100 text-gray-800';
  }
  
  trackById(index: number, item: Employee): number {
    return item.id;
  }
}
