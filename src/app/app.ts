import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Shapes } from './shapes/shapes';
import AOS from 'aos';
import 'aos/dist/aos.css';

type SectionId = 'home' | 'about' | 'project' | 'contact';

interface Tech {
  title: string;
  skill: number; // 0-100
  pic: string;
}

interface Project {
  title: string;
  year: string;
  description: string;
  image: string;
  techs: string[];
  codeUrl: string;
  liveUrl: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Shapes],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  protected title = 'Portfolio';

  year = new Date().getFullYear();

  // nav highlight
  active: SectionId = 'home';
  private sections: Array<{ id: SectionId; el: HTMLElement }> = [];

  // skill animation
  animateSkill: Record<string, number> = {};

  // pattern + heart refs
  @ViewChild('pattern') pattern!: ElementRef<HTMLDivElement>;
  @ViewChild('heart') heart!: ElementRef<HTMLDivElement>;

  private patternReady = false;

  private ticking = false;

  constructor(
    private zone: NgZone,
    private cdr: ChangeDetectorRef
  ) {}

  // -----------------------------
  // Lifecycle
  // -----------------------------
  ngOnInit(): void {
    this.setActiveFromHash();
    window.addEventListener('hashchange', this.onHashChange);
    window.addEventListener('resize', this.onResize);
  }

  ngAfterViewInit(): void {
    // 1) build visuals
    this.safeRebuildPattern();
    this.drawHeart();

    // 2) init AOS
    this.initAOS();

    // 3) cache sections + set active immediately
    this.cacheSections();
    this.updateActiveByScroll(true);

    // 4) scroll listener (IMPORTANT: run update inside Angular to trigger UI update)
    window.addEventListener('scroll', this.onScroll, { passive: true });

    // 5) animate progress bars from 0 -> value (after first paint)
    this.animateSkills();
  }

  ngOnDestroy(): void {
    window.removeEventListener('hashchange', this.onHashChange);
    window.removeEventListener('resize', this.onResize);
    window.removeEventListener('scroll', this.onScroll as any);
  }

  // -----------------------------
  // Nav / hash / scrollspy
  // -----------------------------
  setActive(id: SectionId) {
    this.active = id;
  }

  private onHashChange = () => {
    this.setActiveFromHash();
    // when user jumps by hash, recalc now
    this.cacheSections();
    this.updateActiveByScroll(true);
  };

  private setActiveFromHash() {
    const hash = (location.hash.replace('#', '') || 'home') as SectionId;
    this.active = hash;
  }

  private cacheSections() {
    const ids: SectionId[] = ['home', 'about', 'project', 'contact'];
    this.sections = ids
      .map((id) => ({ id, el: document.getElementById(id) as HTMLElement }))
      .filter((s) => !!s.el);
  }

  private onScroll = () => {
    if (this.ticking) return;
    this.ticking = true;

    requestAnimationFrame(() => {
      this.zone.run(() => {
        this.updateActiveByScroll();
        this.cdr.markForCheck();
      });

      this.ticking = false;
    });
  };

  /**
   * @param forceHashSync if true, also sync URL hash without jump
   */
  private updateActiveByScroll(forceHashSync = false) {
    if (!this.sections.length) return;

    const offset = 56 + 10; // navbar height + gap
    let current: SectionId = 'home';

    for (const s of this.sections) {
      const top = s.el.getBoundingClientRect().top - offset;
      if (top <= 0) current = s.id;
    }

    // last section edge case
    const nearBottom =
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
    if (nearBottom) current = 'contact';

    if (this.active !== current) {
      this.active = current;
      history.replaceState(null, '', `#${current}`); // no jump
    } else if (forceHashSync) {
      // keep URL consistent when entering by hash or refreshing
      history.replaceState(null, '', `#${current}`);
    }
  }

  // -----------------------------
  // AOS
  // -----------------------------
  private initAOS() {
    AOS.init({
      duration: 900,
      easing: 'ease-out-cubic',
      once: true,
      offset: 120,
      delay: 0,
      mirror: false,
      anchorPlacement: 'top-bottom',
    });

    // if content changes later, you can call AOS.refresh()
    AOS.refreshHard();
  }

  // -----------------------------
  // Skills animation (0 -> value)
  // -----------------------------
  private animateSkills() {
    // start at 0
    this.techs.forEach((t) => (this.animateSkill[t.title] = 0));

    // next frame -> animate to value using CSS transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.techs.forEach((t) => (this.animateSkill[t.title] = t.skill));
        this.cdr.markForCheck();
      });
    });
  }

  // -----------------------------
  // Pattern grid
  // -----------------------------
  private onResize = () => {
    this.safeRebuildPattern();
    this.cacheSections(); // sections positions may change on resize
    this.updateActiveByScroll(true);
  };

  private safeRebuildPattern() {
    if (!this.pattern?.nativeElement) return;

    requestAnimationFrame(() => {
      this.buildPatternGrid();
      this.patternReady = true;
    });
  }

  private buildPatternGrid() {
    const el = this.pattern.nativeElement;
    el.innerHTML = '';

    const cell = 30;
    const rows = Math.floor(el.clientHeight / cell);
    const cols = Math.floor(el.clientWidth / cell);

    let html = '';

    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < cols; j++) {
        row += `<div class="size-[30px]" id="col-${j}"></div>`;
      }
      html += `<div class="flex" id="row${i}">${row}</div>`;
    }

    el.innerHTML = html;
  }

  trackingMousePosition(event: MouseEvent) {
    if (!this.patternReady) return;

    const el = this.pattern.nativeElement;

    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const cell = 30;
    const colIndex = Math.floor(x / cell);
    const rowIndex = Math.floor(y / cell);

    const rowEl = el.children.item(rowIndex) as HTMLElement | null;
    if (!rowEl) return;

    const cellEl = rowEl.children.item(colIndex) as HTMLElement | null;
    if (!cellEl) return;

    cellEl.classList.add('bg-blue-200');
    setTimeout(() => cellEl.classList.remove('bg-blue-200'), 350);
  }

  // -----------------------------
  // Heart
  // -----------------------------
  private drawHeart() {
    if (!this.heart?.nativeElement) return;

    const el = this.heart.nativeElement;

    let col = '';

    // row 1
    let row = '';
    for (let i = 0; i < 9; i++) {
      const color = i === 1 || i === 2 || i === 6 || i === 7 ? 'bg-blue-200' : '';
      row += `<div class="size-[20px] ${color}"></div>`;
    }
    col += `<div class="flex">${row}</div>`;

    // row 2
    row = '';
    for (let i = 0; i < 9; i++) {
      const color = i !== 4 ? 'bg-blue-200' : '';
      row += `<div class="size-[20px] ${color}"></div>`;
    }
    col += `<div class="flex">${row}</div>`;

    // bottom triangle
    for (let i = 0; i < 5; i++) {
      row = '';

      for (let j = 0; j < 5; j++) {
        const color = j >= i ? 'bg-blue-200' : '';
        row += `<div class="size-[20px] ${color}"></div>`;
      }

      for (let k = 0; k < 4 - i; k++) {
        row += `<div class="size-[20px] bg-blue-200"></div>`;
      }

      col += `<div class="flex">${row}</div>`;
    }

    el.innerHTML = col;
  }

  // -----------------------------
  // Data
  // -----------------------------
  techs: Tech[] = [
    { title: 'Angular', skill: 75, pic: 'assets/angular-logo.png' },
    { title: 'TypeScript', skill: 70, pic: 'assets/ts.png' },
    { title: 'JavaScript', skill: 75, pic: 'assets/javascript.png' },
    { title: 'HTML', skill: 85, pic: 'assets/html.png' },
    { title: 'CSS', skill: 80, pic: 'assets/css.png' },
    { title: 'Tailwind', skill: 20, pic: 'assets/tailwind.png' },
  ];

  projects: Project[] = [
    {
      title: 'Library Management',
      year: '2025',
      description:
        'Library dashboard with member history, borrowing status, and admin tools. Built with reusable Angular components.',
      image: 'assets/library.png',
      techs: ['Angular', 'TypeScript', 'CSS', 'Node API'],
      codeUrl: 'https://github.com/sokhaimeach/Library_Management_Dashboard',
      liveUrl: 'https://library-management-dashboard-six.vercel.app/',
    },
    {
      title: 'Book Shop',
      year: '2025',
      description:
        'A responsive book shop UI with product listing, search, cart interactions, and clean component structure.',
      image: 'assets/bookshop.png',
      techs: ['Angular', 'TypeScript', 'Tailwind', 'ASP.NET API'],
      codeUrl: 'https://github.com/sokhaimeach/BooksShop',
      liveUrl: '',
    },
    {
      title: 'Clothe Shop',
      year: '2025',
      description:
        'A responsive clothing shop web app with product listing, category filtering, and a clean UI layout. Built with reusable Angular components and Bootstrap styling for a smooth shopping experience.',
      image: 'assets/clotheshop.png',
      techs: ['Angular', 'TypeScript', 'Bootstrap'],
      codeUrl: 'https://github.com/sokhaimeach/ClotheShop',
      liveUrl: 'https://clothe-shop-delta.vercel.app/',
    },
    {
      title: 'Coffee Management',
      year: '2025',
      description:
        'A coffee shop management system for tracking menu items and orders with an admin-friendly dashboard. Uses Angular + Tailwind on the front end and connects to an ASP.NET API for data and operations.',
      image: 'assets/coffee.png',
      techs: ['Angular', 'TypeScript', 'Tailwind', 'ASP.NET API'],
      codeUrl: 'https://github.com/sokhaimeach/CafeManagementSystem',
      liveUrl: '',
    },
  ];
}
