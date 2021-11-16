import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WawordComponent } from './waword.component';

describe('WawordComponent', () => {
  let component: WawordComponent;
  let fixture: ComponentFixture<WawordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WawordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WawordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
