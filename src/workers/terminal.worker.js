self.addEventListener('message', async (e) => {
  try {
    // Browser-safe command simulation
    const commands = {
      'ls': () => self.postMessage({ output: 'file1.txt\nfile2.txt\nfolder1' }),
      'javac Main.java': () => self.postMessage({ output: 'Compilation simulated' })
    };

    if (commands[e.data.command]) {
      commands[e.data.command]();
    } else {
      throw new Error('Command not allowed in browser context');
    }
  } catch (error) {
    self.postMessage({ error: error.message });
  }
});