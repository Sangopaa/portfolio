import { Component, input, output, AfterViewInit } from '@angular/core';
import { Command } from '../../../models/command';

@Component({
  selector: 'app-render-commands',
  standalone: true,
  imports: [],
  templateUrl: './render-commands.component.html',
  styleUrl: './render-commands.component.scss',
})
export class RenderCommandsComponent {
  infoCommand = input.required<Command>();
  focusInput = output<void>();
}
