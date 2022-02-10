import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { VisiterGraphComponent } from './visiter-graph.component';

describe('VisiterGraphComponent', () => {
  let component: VisiterGraphComponent;
  let fixture: ComponentFixture<VisiterGraphComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ VisiterGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisiterGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
