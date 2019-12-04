import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentDataManagerComponent } from './content-data-manager.component';

describe('ContentDataManagerComponent', () => {
  let component: ContentDataManagerComponent;
  let fixture: ComponentFixture<ContentDataManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentDataManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentDataManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
