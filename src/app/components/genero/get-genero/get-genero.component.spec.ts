import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetGeneroComponent } from './get-genero.component';

describe('GetGeneroComponent', () => {
  let component: GetGeneroComponent;
  let fixture: ComponentFixture<GetGeneroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetGeneroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetGeneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
