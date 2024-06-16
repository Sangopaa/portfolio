import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderCommandsComponent } from './render-commands.component';

describe('RenderCommandsComponent', () => {
  let component: RenderCommandsComponent;
  let fixture: ComponentFixture<RenderCommandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenderCommandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RenderCommandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
