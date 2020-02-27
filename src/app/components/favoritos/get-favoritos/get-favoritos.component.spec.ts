import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFavoritosComponent } from './get-favoritos.component';

describe('GetFavoritosComponent', () => {
  let component: GetFavoritosComponent;
  let fixture: ComponentFixture<GetFavoritosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFavoritosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetFavoritosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
