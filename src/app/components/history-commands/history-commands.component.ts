import { Component, input } from '@angular/core';
import { Command } from '../../../models/command';
import { UnrecognizedCommand } from '../../../models/unrecognizedCommand';

@Component({
  selector: 'app-history-commands',
  standalone: true,
  imports: [],
  templateUrl: './history-commands.component.html',
  styleUrl: './history-commands.component.scss',
})
export class HistoryCommandsComponent {
  historyCommands = input.required<(Command | UnrecognizedCommand)[]>();

  isCommand(command: any): command is Command {
    return 'name' in command;
  }

  isUnrecognizedCommand(command: any): command is UnrecognizedCommand {
    return 'inputValue' in command && 'message' in command;
  }

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.historyCommands());
  }
}
