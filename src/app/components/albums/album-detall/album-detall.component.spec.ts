import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumDetallComponent } from './album-detall.component';

describe('AlbumDetallComponent', () => {
  let component: AlbumDetallComponent;
  let fixture: ComponentFixture<AlbumDetallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumDetallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumDetallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
