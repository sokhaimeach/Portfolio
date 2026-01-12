import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shapes } from './shapes';

describe('Shapes', () => {
  let component: Shapes;
  let fixture: ComponentFixture<Shapes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shapes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Shapes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
