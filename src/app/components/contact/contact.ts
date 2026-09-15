import { Component, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Reveal } from '../../directives/reveal';
import { SectionHeader } from '../section-header/section-header';
import { CONTACT_INFO, SOCIALS } from '../../data';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, Reveal, SectionHeader],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  protected readonly info = CONTACT_INFO;
  protected readonly socials = SOCIALS;
  protected readonly sent = signal(false);

  protected readonly form;

  protected readonly infoCards = [
    { icon: 'bi-geo-alt-fill', label: 'Address', value: CONTACT_INFO.address },
    { icon: 'bi-envelope-fill', label: 'Email', value: CONTACT_INFO.email },
    { icon: 'bi-telephone-fill', label: 'Phone', value: CONTACT_INFO.phone },
  ];

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  protected get f() {
    return this.form.controls;
  }

  protected submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, message } = this.form.value;
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${CONTACT_INFO.email}?subject=${subject}&body=${body}`;

    this.sent.set(true);
    this.form.reset();
    setTimeout(() => this.sent.set(false), 6000);
  }
}
