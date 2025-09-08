import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-input-fields',
  templateUrl: './input-fields.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, JsonPipe],
})
export class InputFieldsComponent {
  private fb = new FormBuilder();

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    age: [null as number | null, [Validators.required, Validators.min(18), Validators.max(100)]],
    country: ['USA', Validators.required],
    gender: ['other'],
    subscribe: [true],
    bio: ['', [Validators.maxLength(200)]],
    skills: this.fb.group({
      angular: [true],
      react: [false],
      vue: [false],
    })
  });

  submissionStatus = signal<'idle' | 'success' | 'error'>('idle');
  submittedData = signal<any>(null);

  countries = ['USA', 'Canada', 'UK', 'Australia', 'Germany'];
  
  // Use a computed signal for live form data preview
  formDataPreview = computed(() => this.form.getRawValue());

  // Add getters for easier and safer template access
  get name() { return this.form.get('name') as FormControl; }
  get email() { return this.form.get('email') as FormControl; }
  get age() { return this.form.get('age') as FormControl; }
  get country() { return this.form.get('country') as FormControl; }
  get bio() { return this.form.get('bio') as FormControl; }

  constructor() {
    // This is useful for debugging if needed
    // this.form.valueChanges.subscribe(() => this.formDataPreview.set(this.form.getRawValue()));
  }

  onSubmit() {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      console.log('Form Submitted', this.form.value);
      this.submissionStatus.set('success');
      this.submittedData.set(this.form.value);
      // In a real app, you would send this to a server
      setTimeout(() => this.resetSubmission(), 5000);
    } else {
      console.log('Form is invalid');
      this.submissionStatus.set('error');
      this.submittedData.set(null);
      setTimeout(() => this.resetSubmission(), 5000);
    }
  }

  onReset() {
    this.form.reset({
      name: '',
      email: '',
      age: null,
      country: 'USA',
      gender: 'other',
      subscribe: true,
      bio: '',
      skills: { angular: true, react: false, vue: false }
    });
    this.submissionStatus.set('idle');
    this.submittedData.set(null);
  }

  resetSubmission() {
    this.submissionStatus.set('idle');
  }
}