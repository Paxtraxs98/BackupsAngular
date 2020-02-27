import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPlayListComponent } from './get-play-list.component';

describe('GetPlayListComponent', () => {
  let component: GetPlayListComponent;
  let fixture: ComponentFixture<GetPlayListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetPlayListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetPlayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
