import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Command } from '../models/command';
import { UnrecognizedCommand } from '../models/unrecognizedCommand';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  @ViewChild('commandInput') commandInput!: ElementRef;

  historyCommands: (Command | UnrecognizedCommand)[] = [];
  private nameCommands: string[] = [];

  private commands: Command[] = [];

  constructor(private renderer: Renderer2) {
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
      { name: 'projects', behavior: 'interactive_atribute' },
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
        behavior: 'interactive_atribute',
        options: [{ name: 'Science For Life', url: 'https://www.s4l.life/' }],
      },
      {
        name: 'knowledge',
      },
      {
        name: 'clear',
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

  private focusInput() {
    this.commandInput.nativeElement.focus();
  }

  onKeydown(event: KeyboardEvent, value: string): void {
    if (event.key === 'Enter') {
      this.submitCommand(value);
    }
  }

  private submitCommand(value: string) {
    let insertHistoryCommand: Command | UnrecognizedCommand;
    if (this.nameCommands.includes(value)) {
      this.executeCommand(value);
      insertHistoryCommand = this.commands.find(
        (command) => command.name === value
      ) as Command;
    } else {
      insertHistoryCommand = {
        inputValue: value,
        message: `Command ${value} not recognized`,
      } as UnrecognizedCommand;
    }

    this.historyCommands.push(insertHistoryCommand);
  }

  executeCommand(command: string): void {
    console.log(command);
    console.log(this.historyCommands);
  }

  isCommand(command: any): command is Command {
    return 'name' in command;
  }

  isUnrecognizedCommand(command: any): command is UnrecognizedCommand {
    return 'inputValue' in command && 'message' in command;
  }

  title = 'portfolio';
}
