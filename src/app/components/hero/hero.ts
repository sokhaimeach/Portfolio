import { Component } from '@angular/core';
import { Reveal } from '../../directives/reveal';
import { SOCIALS } from '../../data';

@Component({
  selector: 'app-hero',
  imports: [Reveal],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  protected readonly socials = SOCIALS;
}
