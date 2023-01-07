import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeidelComponent } from './seidel.component';

describe('SeidelComponent', () => {
  let component: SeidelComponent;
  let fixture: ComponentFixture<SeidelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeidelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeidelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
