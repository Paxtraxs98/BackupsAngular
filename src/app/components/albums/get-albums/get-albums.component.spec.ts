import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAlbumsComponent } from './get-albums.component';

describe('GetAlbumsComponent', () => {
  let component: GetAlbumsComponent;
  let fixture: ComponentFixture<GetAlbumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetAlbumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAlbumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
