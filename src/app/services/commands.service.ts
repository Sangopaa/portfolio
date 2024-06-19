import { Injectable } from '@angular/core';
import { Command } from '../../models/command';

@Injectable({
  providedIn: 'root',
})
export class CommandsService {
  getAvailableCommands(): Command[] {
    return [
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
          {
            name: 'shortcuts',
            description: 'All available shortcuts in the app',
          },
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
            description: 'Patient manager in chronic disease conditions.',
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
            description: 'Startup focused on the health industry.',
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
            description: '1',
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
      {
        name: 'shortcuts',
        staticOptions: [
          { name: 'CTRL + C', description: 'Exit of a interactive command' },
          {
            name: 'CTRL + L',
            description: 'Clean console if no in interactive command',
          },
          {
            name: '↑',
            description: 'Bring the command inserted previously',
          },
          {
            name: '↓',
            description: 'Bring the next command if exists',
          },
        ],
      },
    ];
  }
}
