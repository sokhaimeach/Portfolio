import { Component } from '@angular/core';
import { Reveal } from '../../directives/reveal';
import { SectionHeader } from '../section-header/section-header';
import { EDUCATION } from '../../data';

@Component({
  selector: 'app-education',
  imports: [Reveal, SectionHeader],
  templateUrl: './education.html',
  styleUrl: './education.css',
})
export class Education {
  protected readonly education = EDUCATION;
}
