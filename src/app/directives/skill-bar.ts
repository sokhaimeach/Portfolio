import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appSkillBar]',
  standalone: true,
})
export class SkillBar implements OnInit, OnDestroy {
  @Input() skillBar = 0;
  @Input() skillDelay = 0;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    const node = this.el.nativeElement;
    node.style.width = '0%';
    node.classList.add('transition-[width]', 'duration-1000', 'ease-out');

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            node.style.width = `${this.skillBar}%`;
          }, this.skillDelay);
          this.observer?.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
