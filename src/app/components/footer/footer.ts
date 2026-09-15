import { Component } from '@angular/core';
import { SOCIALS } from '../../data';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly year = new Date().getFullYear();
  protected readonly socials = SOCIALS;
}
