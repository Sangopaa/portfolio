import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Command } from '../models/command';
import { UnrecognizedCommand } from '../models/unrecognizedCommand';
import { RenderCommandsComponent } from './components/render-commands/render-commands.component';
import { WindowService } from './services/host_app.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RenderCommandsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('commandInput') commandInput!: ElementRef;

  historyCommands: (Command | UnrecognizedCommand)[] = [];
  historyInputs: string[] = [];
  private selectedIndexHistoryInputs: number = -1;
  protected commandWithBehavior: boolean = false;
  private nameCommands: string[] = [];

  private commands: Command[] = [];

  constructor(
    private renderer: Renderer2,
    private windowService: WindowService
  ) {
    this.commands = [
      {
        name: 'help',
        staticOptions: [
          { name: 'projects', description: 'List of completed projects' },
          { name: 'linkedin', description: 'Go to my linkedin' },
          { name: 'github', description: 'Go to my github' },
          {
            name: 'experience',
            description: 'List of my experience with companies and startups',
          },
          { name: 'knowledge', description: 'My tecnologic stack' },
          { name: 'clear', description: 'Clear console' },
        ],
      },
      {
        name: 'projects',
        behavior: true,
        options: [
          {
            name: '10Care',
            url: 'https://prod.10care.life/',
            selected: true,
            description: 'Patient manager in chronic disease conditions',
          },
        ],
      },
      {
        name: 'linkedin',
        url: 'https://www.linkedin.com/in/santiago-gonzalez-parra-872ab82b4/',
      },
      {
        name: 'github',
        url: 'https://github.com/Sangopaa',
      },
      {
        name: 'experience',
        behavior: true,
        options: [
          {
            name: 'Science For Life',
            url: 'https://www.s4l.life/',
            selected: true,
            description: '',
          },
        ],
      },
      {
        name: 'knowledge',
        staticOptions: [
          {
            name: 'Github',
            description: '2',
          },
          {
            name: 'JavaScript',
            description: '2',
          },
          {
            name: 'TypeScript',
            description: '2',
          },
          {
            name: 'Angular',
            description: '2',
          },
          {
            name: 'Python',
            description: '2',
          },
          {
            name: 'Flask',
            description: '2',
          },
          {
            name: 'MySQL',
            description: '2',
          },
          {
            name: 'Postman/Insomnia',
            description: '2',
          },
          {
            name: 'AWS',
            description: '2',
          },
          {
            name: 'Docker',
            description: '1',
          },
          {
            name: 'Sentry',
            description: '1',
          },
          {
            name: 'Jira',
            description: '1',
          },
        ],
      },
    ];

    this.nameCommands = this.commands.map((command) => command.name);
  }

  ngAfterViewInit() {
    this.focusInput();

    // Listen for any click event on the document
    this.renderer.listen('document', 'click', (event: Event) => {
      this.focusInput();
    });
  }

  focusInput() {
    this.commandInput.nativeElement.focus();
  }

  onKeydown(event: KeyboardEvent, value: string): void {
    if (event.key === 'Enter') {
      this.submitCommand(value);
      this.commandInput.nativeElement.value = '';
      this.selectedIndexHistoryInputs = -1;
    }

    if (!this.commandWithBehavior) {
      if (event.key === 'ArrowUp') {
        this.navigateHistory(1);
      } else if (event.key === 'ArrowDown') {
        this.navigateHistory(-1);
      }
    }
  }

  navigateHistory(direction: number): void {
    const maxIndex = this.historyInputs.length - 1;

    this.selectedIndexHistoryInputs += direction;

    if (this.selectedIndexHistoryInputs > maxIndex) {
      this.selectedIndexHistoryInputs = maxIndex;
    } else if (this.selectedIndexHistoryInputs < -1) {
      this.selectedIndexHistoryInputs = -1;
    }

    if (this.selectedIndexHistoryInputs >= 0) {
      this.commandInput.nativeElement.value =
        this.historyInputs[this.selectedIndexHistoryInputs];
    } else {
      this.commandInput.nativeElement.value = null;
    }
  }

  goUrl(url: string) {
    if (this.windowService.isBrowser()) {
      window.open(url, '_blank');
    }
  }

  private submitCommand(value: string) {
    this.historyInputs.unshift(value);
    let insertHistoryCommand: Command | UnrecognizedCommand;
    if (this.nameCommands.includes(value)) {
      insertHistoryCommand = this.commands.find(
        (command) => command.name === value
      ) as Command;

      this.executeCommand(insertHistoryCommand);
    } else {
      insertHistoryCommand = {
        inputValue: value,
        message: `Command ${value} not recognized`,
      } as UnrecognizedCommand;
    }

    this.addCommandToHistory(insertHistoryCommand);

    if (value == 'clear') {
      this.historyCommands = [];
    }
  }

  addCommandToHistory(command: Command | UnrecognizedCommand) {
    if (this.isCommand(command)) {
      let copyCurrentCommand = JSON.parse(JSON.stringify(command));
      this.historyCommands.push(copyCurrentCommand);
    } else if (this.isUnrecognizedCommand(command)) {
      this.historyCommands.push(command);
    }
  }

  executeCommand(command: Command): void {
    if (command.behavior) {
      this.commandWithBehavior = true;
    }
    if (command?.url) {
      this.goUrl(command.url);
    }
  }

  exitInteractiveCommand() {
    console.log('entra');
    this.commandWithBehavior = false;
    setTimeout(() => {
      this.focusInput();
    }, 500);
  }

  isCommand(command: any): command is Command {
    return 'name' in command;
  }

  isUnrecognizedCommand(command: any): command is UnrecognizedCommand {
    return 'inputValue' in command && 'message' in command;
  }

  ngAfterViewChecked(): void {
    this.scrollDown();
  }

  scrollDown() {
    if (this.windowService.isBrowser()) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'auto' });
    }
  }

  title = 'portfolio';
}
