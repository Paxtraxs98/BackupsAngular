import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaylistDetallComponent } from './playlist-detall.component';

describe('PlaylistDetallComponent', () => {
  let component: PlaylistDetallComponent;
  let fixture: ComponentFixture<PlaylistDetallComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlaylistDetallComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaylistDetallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
