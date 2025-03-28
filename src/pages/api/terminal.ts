import { executeTerminalCommand } from '@/api/terminal';

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    const { command } = await req.json();
    if (!command) {
      return new Response('Command is required', { status: 400 });
    }

    const result = await executeTerminalCommand(command);
    return new Response(result.output, {
      status: result.error ? 500 : 200,
      headers: { 'Content-Type': 'text/plain' }
    });
  } catch (error) {
    return new Response(String(error), { status: 500 });
  }
}