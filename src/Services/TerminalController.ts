import { exec } from 'child_process';

class TerminalController {
  executeCommand(command: string): Promise<string> {
    return new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(stderr || error.message);
          return;
        }
        resolve(stdout);
      });
    });
  }
}

export const terminalController = new TerminalController();