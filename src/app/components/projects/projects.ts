import { Component } from '@angular/core';
import { Reveal } from '../../directives/reveal';
import { SectionHeader } from '../section-header/section-header';
import { PROJECTS } from '../../data';

@Component({
  selector: 'app-projects',
  imports: [Reveal, SectionHeader],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects {
  protected readonly projects = PROJECTS;
}
