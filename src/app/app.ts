import { CommonModule, Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Shapes } from './shapes/shapes';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Shapes],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit, AfterViewInit {
  protected title = 'Portfolio';

  active: string = '';
  year: number = new Date().getFullYear();
  animateSkill: Record<string, number> = {};

  // style HELP
  @ViewChild('pattern') pattern!: ElementRef<HTMLDivElement>;
  @ViewChild('heart') heart!: ElementRef<HTMLDivElement>;

  private hashChangeHandler = () => this.updateActiveFromHash();
  private resizeHandler = () => this.safeRebuildPattern();

  private patternReady = false;

  ngOnInit(): void {
    this.updateActiveFromHash();
    window.addEventListener('hashchange', this.hashChangeHandler);
    window.addEventListener('resize', this.resizeHandler);
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.techs.forEach((t) => (this.animateSkill[t.title] = t.skill));
      });
    });
    // keep your behavior (small delay) but make it safe + rebuild on resize
    this.safeRebuildPattern();
    this.drawHeart();
  }

  ngOnDestroy(): void {
    window.removeEventListener('hashchange', this.hashChangeHandler);
    window.removeEventListener('resize', this.resizeHandler);
  }

  updateActiveFromHash() {
    // keep your style: '' means Home
    this.active = location.hash.replace('#', '') || '';
  }

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

  // -----------------------------
  // Pattern grid
  // -----------------------------

  private safeRebuildPattern() {
    if (!this.pattern?.nativeElement) return;

    // avoid rebuilding too often / before DOM paints
    requestAnimationFrame(() => {
      this.getSize();
      this.patternReady = true;
    });
  }

  getSize() {
    const el = this.pattern.nativeElement;

    // clear before rebuild to avoid stacking
    el.innerHTML = '';

    const cell = 30;
    const rows = Math.floor(el.clientHeight / cell);
    const cols = Math.floor(el.clientWidth / cell);

    let generateBox = '';

    for (let i = 0; i < rows; i++) {
      let row = '';
      for (let j = 0; j < cols; j++) {
        // keep your size and id pattern
        row += `<div class="size-[30px]" id="col-${j}"></div>`;
      }
      generateBox += `<div class="flex" id="row${i}">${row}</div>`;
    }

    el.innerHTML = generateBox;
  }

  trackingMousePosition(event: MouseEvent) {
    if (!this.patternReady) return;

    const el = this.pattern.nativeElement;

    // IMPORTANT:
    // Use element-relative coordinates (so it works even if pattern isn't at top-left)
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const cell = 30;
    const colIndex = Math.floor(x / cell); // x => column
    const rowIndex = Math.floor(y / cell); // y => row

    // bounds check (prevents errors)
    const rowEl = el.children.item(rowIndex) as HTMLElement | null;
    if (!rowEl) return;

    const cellEl = rowEl.children.item(colIndex) as HTMLElement | null;
    if (!cellEl) return;

    cellEl.classList.add('bg-blue-200');

    // small fade feel (still Tailwind class based)
    setTimeout(() => {
      cellEl.classList.remove('bg-blue-200');
    }, 350);
  }

  setActive(route: string) {
    this.active = route;
  }

  // -----------------------------
  // Heart
  // -----------------------------
  drawHeart() {
    if (!this.heart?.nativeElement) return;

    const el = this.heart.nativeElement;

    let row = '';
    let col = '';

    for (let i = 0; i < 9; i++) {
      let color = '';
      if (i === 1 || i === 2 || i === 6 || i === 7) {
        color = 'bg-blue-200';
      }
      row += `<div class="size-[20px] ${color}"></div>`;
    }
    col += `<div class="flex">${row}</div>`;

    row = '';
    for (let i = 0; i < 9; i++) {
      let color = '';
      if (i !== 4) {
        color = 'bg-blue-200';
      }
      row += `<div class="size-[20px] ${color}"></div>`;
    }
    col += `<div class="flex">${row}</div>`;

    for (let i = 0; i < 5; i++) {
      row = '';
      for (let j = 0; j < 5; j++) {
        let color = '';
        if (j >= i) {
          color = 'bg-blue-200';
        }
        row += `<div class="size-[20px] ${color}"></div>`;
      }
      for (let k = 0; k < 4 - i; k++) {
        row += `<div class="size-[20px] bg-blue-200"></div>`;
      }
      col += `<div class="flex">${row}</div>`;
    }

    el.innerHTML = col;
  }
}

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
