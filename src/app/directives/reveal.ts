import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

type RevealVariant = 'up' | 'down' | 'left' | 'right' | 'zoom' | 'fade';

const TRANSFORMS: Record<RevealVariant, { from: string; to: string }> = {
  up: { from: 'translate-y-8', to: 'translate-y-0' },
  down: { from: '-translate-y-8', to: 'translate-y-0' },
  left: { from: 'translate-x-8', to: 'translate-x-0' },
  right: { from: '-translate-x-8', to: 'translate-x-0' },
  zoom: { from: 'scale-95', to: 'scale-100' },
  fade: { from: '', to: '' },
};

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class Reveal implements OnInit, OnDestroy {
  @Input() appReveal: RevealVariant = 'up';
  @Input() revealDelay = 0;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const node = this.el.nativeElement;
    const { from, to } = TRANSFORMS[this.appReveal];

    node.classList.add(
      'transition-all',
      'duration-700',
      'ease-out',
      'opacity-0'
    );
    if (from) node.classList.add(from);
    if (this.revealDelay > 0) {
      node.style.transitionDelay = `${this.revealDelay}ms`;
    }

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('opacity-100');
          if (to) node.classList.remove(from);
          if (to) node.classList.add(to);
          node.style.transitionDelay = '';
          this.observer?.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
