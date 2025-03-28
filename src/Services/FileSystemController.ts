import { FileSystemHandle, FileSystemFileHandle, FileSystemDirectoryHandle } from 'file-system-access';
import { openDB } from 'idb';

interface FileNode {
  name: string;
  type: 'file' | 'directory';
  handle?: FileSystemHandle;
  children?: FileNode[];
}

class FileSystemController {
  private rootHandle: FileSystemDirectoryHandle | null = null;
  private fileTree: FileNode | null = null;
  private persistedKey = 'lastDirectoryHandle';

  private static instance: FileSystemController;

  async createFile(filePath: string, content: string = ''): Promise<boolean> {
    if (!this.rootHandle) return false;
    
    try {
      const pathParts = filePath.split('/').filter(Boolean);
      let currentDir = this.rootHandle;
      
      // Navigate to parent directory
      for (let i = 0; i < pathParts.length - 1; i++) {
        currentDir = await currentDir.getDirectoryHandle(pathParts[i]);
      }
      
      const fileName = pathParts[pathParts.length - 1];
      const fileHandle = await currentDir.getFileHandle(fileName, { create: true });
      const writable = await fileHandle.createWritable();
      await writable.write(content);
      await writable.close();
      
      await this.buildFileTree();
      return true;
    } catch (error) {
      console.error('Error creating file:', error);
      return false;
    }
  }

  async createDirectory(dirPath: string): Promise<boolean> {
    if (!this.rootHandle) return false;
    
    try {
      const pathParts = dirPath.split('/').filter(Boolean);
      let currentDir = this.rootHandle;
      
      for (const dirName of pathParts) {
        currentDir = await currentDir.getDirectoryHandle(dirName, { create: true });
      }
      
      await this.buildFileTree();
      return true;
    } catch (error) {
      console.error('Error creating directory:', error);
      return false;
    }
  }

  async deleteItem(itemPath: string): Promise<boolean> {
    if (!this.rootHandle) return false;
    
    try {
      const pathParts = itemPath.split('/').filter(Boolean);
      const itemName = pathParts.pop();
      let currentDir = this.rootHandle;
      
      // Navigate to parent directory
      for (const dirName of pathParts) {
        currentDir = await currentDir.getDirectoryHandle(dirName);
      }
      
      if (itemName) {
        // Verify item exists before deletion
        try {
          await currentDir.getFileHandle(itemName);
        } catch {
          return false; // File doesn't exist
        }
        
        await currentDir.removeEntry(itemName, { recursive: true });
        await this.buildFileTree();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error deleting file:', error);
      return false;
    }
  }

  // async executeTerminalCommand(command: string): Promise<string> {
  //   try {
  //     // This would need to be implemented with a proper backend service
  //     // For now we'll just return a mock response
  //     return `Executed: ${command}`;
  //   } catch (error) {
  //     console.error('Error executing command:', error);
  //     return String(error);
  //   }
  // }

  private async saveDirectoryHandle() {
    if (this.rootHandle) {
      // Store in IndexedDB instead of localStorage
      const db = await openDB('FileSystem', 1);
      await db.put('handles', this.rootHandle, 'root');
    }
  }

  async openDirectory(): Promise<boolean> {
    try {
      this.rootHandle = (await window.showDirectoryPicker()) as FileSystemDirectoryHandle;
      await this.buildFileTree();
      await this.saveDirectoryHandle();
      return true;
    } catch (error) {
      console.error('Error opening directory:', error);
      return false;
    }
  }

  async revokeDirectoryAccess(): Promise<void> {
    if (this.rootHandle) {
      this.rootHandle = null;
      this.fileTree = null;
      console.log('Directory access revoked');
    }
  }

  async restoreSession(): Promise<boolean> {
    try {
      const db = await openDB('FileSystem', 1, {
        upgrade(db) {
          db.createObjectStore('handles');
        }
      });
      const handle = await db.get('handles', 'root');
      if (handle) {
        this.rootHandle = handle;
        await this.buildFileTree();
        await this.buildFileTree();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error restoring session:', error);
      return false;
    }
  }

  private async buildFileTree(): Promise<void> {
    if (!this.rootHandle) return;
    this.fileTree = await this.createFileNode(this.rootHandle);
  }

  private async createFileNode(handle: FileSystemHandle): Promise<FileNode> {
    const node: FileNode = {
      name: handle.name,
      type: handle.kind,
      handle: handle,
    };

    if (handle.kind === 'directory') {
      const dirHandle = handle as FileSystemDirectoryHandle;
      node.children = [];
      for await (const entry of dirHandle.values()) {
        node.children.push(await this.createFileNode(entry));
      }
    }

    return node;
  }

  async readFileContent(fileHandle: FileSystemFileHandle): Promise<string> {
    try {
      const file = await fileHandle.getFile();
      return await file.text();
    } catch (error) {
      console.error('Error reading file:', error);
      throw error;
    }
  }

  async writeFileContent(fileHandle: FileSystemFileHandle, content: string): Promise<void> {
    try {
      const writable = await fileHandle.createWritable();
      await writable.write(content);
      await writable.close();
    } catch (error) {
      console.error('Error writing file:', error);
      throw error;
    }
  }

  getFileTree(): FileNode | null {
    return this.fileTree;
  }

  getRootHandle(): FileSystemDirectoryHandle | null {
    return this.rootHandle;
  }

  async findFileByPath(path: string): Promise<FileSystemFileHandle | null> {
    if (!this.rootHandle) return null;
    const parts = path.split('/').filter(Boolean);
    let current: FileSystemDirectoryHandle = this.rootHandle;

    try {
      for (let i = 0; i < parts.length - 1; i++) {
        current = await current.getDirectoryHandle(parts[i]);
      }
      return await current.getFileHandle(parts[parts.length - 1]);
    } catch (error) {
      console.error('Error finding file:', error);
      return null;
    }

    
  }
  async executeTerminalCommand(command: string): Promise<string> {
    try {
      const { exec } = require('child_process');
      return new Promise((resolve, reject) => {
        exec(command, { encoding: 'utf8' }, (error, stdout, stderr) => {
          error ? reject(stderr || error.message) : resolve(stdout);
        });
      });
    } catch (error) {
      throw new Error(`Command execution failed: ${error}`);
    }
  }
}

// Singleton instance



  


export const fileSystemController = new FileSystemController();