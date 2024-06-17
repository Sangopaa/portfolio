import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryCommandsComponent } from './history-commands.component';

describe('HistoryCommandsComponent', () => {
  let component: HistoryCommandsComponent;
  let fixture: ComponentFixture<HistoryCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryCommandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
