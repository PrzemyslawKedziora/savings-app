import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordItemDetailedComponent } from './record-item-detailed.component';

describe('RecordItemDetailedComponent', () => {
  let component: RecordItemDetailedComponent;
  let fixture: ComponentFixture<RecordItemDetailedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordItemDetailedComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecordItemDetailedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
