import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { About } from './components/about/about';
import { Contact } from './components/contact/contact';
import { Education } from './components/education/education';
import { Experience } from './components/experience/experience';
import { Footer } from './components/footer/footer';
import { Hero } from './components/hero/hero';
import { Navbar } from './components/navbar/navbar';
import { Projects } from './components/projects/projects';
import { Shapes } from './components/shapes/shapes';
import { Skills } from './components/skills/skills';
import { SECTION_IDS, type SectionId } from './data';

type Theme = 'dark' | 'light';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Navbar,
    Hero,
    About,
    Skills,
    Experience,
    Projects,
    Education,
    Contact,
    Footer,
    Shapes,
  ],
  templateUrl: './app.html',
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  protected readonly year = new Date().getFullYear();
  protected readonly active = signal<SectionId>('home');
  protected readonly theme = signal<Theme>('dark');

  // pattern + heart refs
  @ViewChild('pattern') pattern!: ElementRef<HTMLDivElement>;
  @ViewChild('heart') heart!: ElementRef<HTMLDivElement>;

  private sections: Array<{ id: SectionId; el: HTMLElement }> = [];
  private patternReady = false;
  private ticking = false;

  ngOnInit(): void {
    this.initTheme();
    this.setActiveFromHash();
    window.addEventListener('hashchange', this.onHashChange);
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  ngAfterViewInit(): void {
    this.safeRebuildPattern();
    this.drawHeart();
    this.cacheSections();
    this.updateActiveByScroll(true);
  }

  ngOnDestroy(): void {
    window.removeEventListener('hashchange', this.onHashChange);
    window.removeEventListener('scroll', this.onScroll);
  }

  // -----------------------------
  // Theme
  // -----------------------------
  private initTheme(): void {
    const stored = localStorage.getItem('theme');
    const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    const theme: Theme =
      stored === 'light' || stored === 'dark'
        ? stored
        : prefersLight
          ? 'light'
          : 'dark';
    this.theme.set(theme);
    this.applyTheme();
  }

  protected toggleTheme(): void {
    this.theme.update((t) => (t === 'dark' ? 'light' : 'dark'));
    this.applyTheme();
  }

  private applyTheme(): void {
    document.documentElement.classList.toggle('light', this.theme() === 'light');
    localStorage.setItem('theme', this.theme());
  }

  // -----------------------------
  // Nav / hash / scrollspy
  // -----------------------------
  protected setActive(id: SectionId): void {
    this.active.set(id);
  }

  private onHashChange = () => {
    this.setActiveFromHash();
    this.cacheSections();
    this.updateActiveByScroll(true);
  };

  private setActiveFromHash(): void {
    const hash = (location.hash.replace('#', '') || 'home') as SectionId;
    if ((SECTION_IDS as readonly string[]).includes(hash)) {
      this.active.set(hash);
    }
  }

  private cacheSections(): void {
    this.sections = SECTION_IDS.map((id) => ({
      id,
      el: document.getElementById(id) as HTMLElement,
    })).filter((s) => !!s.el);
  }

  private onScroll = () => {
    if (this.ticking) return;
    this.ticking = true;

    requestAnimationFrame(() => {
      this.updateActiveByScroll();
      this.ticking = false;
    });
  };

  /**
   * Highlights the section currently in view and keeps the URL hash in sync.
   * @param forceHashSync if true, also sync URL hash without jumping
   */
  private updateActiveByScroll(forceHashSync = false): void {
    if (!this.sections.length) return;

    const offset = 96; // navbar height + breathing room
    let current: SectionId = 'home';

    for (const s of this.sections) {
      const top = s.el.getBoundingClientRect().top - offset;
      if (top <= 0) current = s.id;
    }

    // last section edge case
    const nearBottom =
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
    if (nearBottom) current = 'contact';

    if (this.active() !== current) {
      this.active.set(current);
      history.replaceState(null, '', `#${current}`); // no jump
    } else if (forceHashSync) {
      history.replaceState(null, '', `#${current}`);
    }
  }

  // -----------------------------
  // Pattern grid (mouse trail)
  // -----------------------------
  private safeRebuildPattern(): void {
    if (!this.pattern?.nativeElement) return;

    requestAnimationFrame(() => {
      this.buildPatternGrid();
      this.patternReady = true;
    });
  }

  private buildPatternGrid(): void {
    const el = this.pattern.nativeElement;
    el.innerHTML = '';

    const cell = 36;
    const rows = Math.floor(el.clientHeight / cell);
    const cols = Math.floor(el.clientWidth / cell);

    let html = '';

    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < cols; j++) {
        row += `<div class="size-[36px]" id="col-${j}"></div>`;
      }
      html += `<div class="flex" id="row${i}">${row}</div>`;
    }

    el.innerHTML = html;
  }

  protected trackingMousePosition(event: MouseEvent): void {
    if (!this.patternReady) return;

    const el = this.pattern.nativeElement;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const cell = 36;
    const colIndex = Math.floor(x / cell);
    const rowIndex = Math.floor(y / cell);

    const rowEl = el.children.item(rowIndex) as HTMLElement | null;
    if (!rowEl) return;

    const cellEl = rowEl.children.item(colIndex) as HTMLElement | null;
    if (!cellEl) return;

    cellEl.classList.add('bg-primary/25');
    setTimeout(() => cellEl.classList.remove('bg-primary/25'), 350);
  }

  // -----------------------------
  // Signature pixel heart
  // -----------------------------
  private drawHeart(): void {
    if (!this.heart?.nativeElement) return;

    const el = this.heart.nativeElement;
    let col = '';

    // row 1
    let row = '';
    for (let i = 0; i < 9; i++) {
      const color = i === 1 || i === 2 || i === 6 || i === 7 ? 'bg-primary/60' : '';
      row += `<div class="size-[20px] ${color}"></div>`;
    }
    col += `<div class="flex">${row}</div>`;

    // row 2
    row = '';
    for (let i = 0; i < 9; i++) {
      const color = i !== 4 ? 'bg-primary/60' : '';
      row += `<div class="size-[20px] ${color}"></div>`;
    }
    col += `<div class="flex">${row}</div>`;

    // bottom triangle
    for (let i = 0; i < 5; i++) {
      row = '';
      for (let j = 0; j < 5; j++) {
        const color = j >= i ? 'bg-primary/60' : '';
        row += `<div class="size-[20px] ${color}"></div>`;
      }
      for (let k = 0; k < 4 - i; k++) {
        row += `<div class="size-[20px] bg-primary/60"></div>`;
      }
      col += `<div class="flex">${row}</div>`;
    }

    el.innerHTML = col;
  }
}
