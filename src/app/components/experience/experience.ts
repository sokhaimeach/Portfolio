import { Component } from '@angular/core';
import { Reveal } from '../../directives/reveal';
import { SectionHeader } from '../section-header/section-header';
import { EXPERIENCE } from '../../data';

@Component({
  selector: 'app-experience',
  imports: [Reveal, SectionHeader],
  templateUrl: './experience.html',
  styleUrl: './experience.css',
})
export class Experience {
  protected readonly experience = EXPERIENCE;
}
