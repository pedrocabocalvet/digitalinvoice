import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SalesOverviewGrapComponent } from './sales-overview-grap.component';

describe('SalesOverviewGrapComponent', () => {
  let component: SalesOverviewGrapComponent;
  let fixture: ComponentFixture<SalesOverviewGrapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOverviewGrapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOverviewGrapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
