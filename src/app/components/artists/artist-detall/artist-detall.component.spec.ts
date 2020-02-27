import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistDetallComponent } from './artist-detall.component';

describe('ArtistDetallComponent', () => {
  let component: ArtistDetallComponent;
  let fixture: ComponentFixture<ArtistDetallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtistDetallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtistDetallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
