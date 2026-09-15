import { Component } from '@angular/core';
import { Reveal } from '../../directives/reveal';
import { SectionHeader } from '../section-header/section-header';
import { CONTACT_INFO } from '../../data';

@Component({
  selector: 'app-about',
  imports: [Reveal, SectionHeader],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {
  protected readonly info = CONTACT_INFO;

  protected readonly stats = [
    { value: '4th', label: 'Year MIS student' },
    { value: '4', label: 'Featured projects' },
    { value: '15+', label: 'Skills & tools' },
  ];

  protected readonly facts = [
    { icon: 'bi-person', label: 'Name', value: 'MEACH Sokhai' },
    { icon: 'bi-calendar3', label: 'Date of Birth', value: '19 January 2004' },
    { icon: 'bi-mortarboard', label: 'Education', value: 'Fourth-Year (SETEC MIS)' },
    { icon: 'bi-code-slash', label: 'Focus', value: 'Junior Web Developer' },
    { icon: 'bi-geo-alt', label: 'Location', value: 'Tuol Kouk, Phnom Penh' },
    { icon: 'bi-envelope', label: 'Email', value: CONTACT_INFO.email },
  ];
}
