import { Component, Input } from '@angular/core';
import { Reveal } from '../../directives/reveal';

@Component({
  selector: 'app-section-header',
  imports: [Reveal],
  templateUrl: './section-header.html',
  styleUrl: './section-header.css',
})
export class SectionHeader {
  @Input() eyebrow = '';
  @Input() title = '';
  @Input() subtitle = '';
}
