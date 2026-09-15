import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  effect,
  signal,
} from '@angular/core';
import { NAV_LABELS, SECTION_IDS, type SectionId } from '../../data';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  @Input() active: SectionId = 'home';
  @Input() theme: 'dark' | 'light' = 'dark';
  @Output() navigate = new EventEmitter<SectionId>();
  @Output() toggleTheme = new EventEmitter<void>();

  protected readonly sections = SECTION_IDS;
  protected readonly labels = NAV_LABELS;
  protected readonly menuOpen = signal(false);
  protected readonly scrolled = signal(false);

  constructor() {
    effect(() => {
      document.body.style.overflow = this.menuOpen() ? 'hidden' : '';
    });
  }

  ngOnInit(): void {
    this.scrolled.set(window.scrollY > 8);
  }

  protected select(id: SectionId): void {
    this.navigate.emit(id);
    this.menuOpen.set(false);
  }

  @HostListener('window:scroll')
  protected onWindowScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }

  @HostListener('document:keydown.escape')
  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
