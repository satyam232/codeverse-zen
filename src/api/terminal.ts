import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export const executeTerminalCommand = async (command: string): Promise<{ output: string; error?: string }> => {
  try {
    const { stdout, stderr } = await execAsync(command);
    if (stderr) {
      return { output: stderr, error: 'Command execution failed' };
    }
    return { output: stdout };
  } catch (error) {
    return { output: String(error), error: 'Command execution failed' };
  }
};