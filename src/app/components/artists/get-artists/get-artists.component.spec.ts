import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetArtistsComponent } from './get-artists.component';

describe('GetArtistsComponent', () => {
  let component: GetArtistsComponent;
  let fixture: ComponentFixture<GetArtistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetArtistsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
