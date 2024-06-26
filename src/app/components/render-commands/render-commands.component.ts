import { Component, input, output, AfterViewInit } from '@angular/core';
import { Command } from '../../../models/command';
import { Option } from '../../../models/option';
import { WindowService } from '../../services/host_app.service';

@Component({
  selector: 'app-render-commands',
  standalone: true,
  imports: [],
  templateUrl: './render-commands.component.html',
  styleUrl: './render-commands.component.scss',
})
export class RenderCommandsComponent {
  infoCommand = input.required<Command>();
  exitInteractiveCommand = output<void>();

  private keydownListener: EventListener | null = null;

  constructor(private windowService: WindowService) {
    this.keydownListener = this.handleKeyboardEvent.bind(this);
    window.addEventListener('keydown', this.keydownListener);
  }

  removeKeyboardListener(): void {
    if (this.keydownListener && this.windowService.isBrowser()) {
      window.removeEventListener('keydown', this.keydownListener);
      this.keydownListener = null;
    }
  }

  handleKeyboardEvent(event: Event): void {
    const keyboardEvent = event as KeyboardEvent;
    if (this.infoCommand().behavior) {
      event.preventDefault();
      if (keyboardEvent.key === 'Enter') {
        this.goToSelectedUrl();
      } else if (keyboardEvent.key === 'ArrowDown') {
        this.navigateOptions(1);
      } else if (keyboardEvent.key === 'ArrowUp') {
        this.navigateOptions(-1);
      } else if (
        (keyboardEvent.ctrlKey && keyboardEvent.key === 'c') ||
        keyboardEvent.key === 'C'
      ) {
        this.exitInteractiveCommand.emit();
        this.deactivateComponent();
      }
    }
  }

  navigateOptions(direction: number): void {
    const options = this.infoCommand().options || [];
    const maxIndex = options.length > 0 ? options.length - 1 : 0;

    let indexSelectedOption: number | undefined = 0;
    const selectedOption: Option | undefined = this.infoCommand().options?.find(
      (element) => element.selected === true
    );

    if (selectedOption !== undefined) {
      indexSelectedOption = this.infoCommand().options?.indexOf(selectedOption);
    }

    indexSelectedOption !== undefined
      ? (indexSelectedOption += direction)
      : undefined;

    if (indexSelectedOption && indexSelectedOption > maxIndex) {
      indexSelectedOption = maxIndex;
    } else if (indexSelectedOption && indexSelectedOption < 0) {
      indexSelectedOption = 0;
    }

    if (indexSelectedOption !== undefined) {
      this.dropAtributeSelected();

      options[indexSelectedOption].selected = true;
    }
  }

  dropAtributeSelected(): void {
    this.infoCommand().options?.forEach((option) => (option.selected = false));
  }

  goToSelectedUrl() {
    const selectedOption: Option | undefined = this.infoCommand().options?.find(
      (element) => element.selected === true
    );

    if (selectedOption && this.windowService.isBrowser()) {
      window.open(selectedOption.url, '_blank');
    }
  }

  deactivateComponent(): void {
    this.removeKeyboardListener();
  }
}
