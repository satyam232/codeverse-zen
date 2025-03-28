import React, { useState, useEffect } from 'react';
import { FileText, Folder, ChevronRight, ChevronDown, Play, ChevronLeft, FolderOpen, RefreshCw, FileCode, FileJson, FileTerminal, FileType2, FileArchive, FileImage, FileVideo, FileAudio, FileSpreadsheet, FileDigit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import CodeBlock from '@/components/CodeBlock';
import { fileSystemController } from '@/Services/FileSystemController';
import { codeExecutionService } from '@/Services/codeExecution';
import { Trash2, FolderGit2 } from 'lucide-react';
import { PopupDialog } from '@/components/PopupDialog';
import getFileIcon from '@/lib/fileIcons';

const LocalEditor = () => {
  const [currentPath, setCurrentPath] = useState<string>('');
  const [files, setFiles] = useState<{ name: string; type: 'file' | 'directory'; children?: typeof files }[]>([]);
  const [selectedFile, setSelectedFile] = useState<{ path: string; name: string; handle: FileSystemFileHandle } | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [isExplorerOpen, setIsExplorerOpen] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [terminalHistory, setTerminalHistory] = useState<Array<{type: 'input' | 'output', content: string}>>([]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [savedFileTree, setSavedFileTree] = useState(null);

  // Restore state from localStorage on mount
  useEffect(() => {
    const initializeFileSystem = async () => {
      const sessionRestored = await fileSystemController.restoreSession();
      const savedState = localStorage.getItem('localEditorState');
      
      if (sessionRestored && savedState) {
        const { storedPath, storedExpanded, storedSelected } = JSON.parse(savedState);
        const fileTree = fileSystemController.getFileTree();
        setCurrentPath(storedPath);
        setFiles(fileTree?.children || []);
        setExpandedFolders(new Set(storedExpanded));
        
        if (storedSelected) {
          const findFileHandle = (items) => {
            for (const item of items) {
              if (item.path === storedSelected) return item.handle;
              if (item.children) {
                const found = findFileHandle(item.children);
                if (found) return found;
              }
            }
          };
          const handle = findFileHandle(fileTree?.children || []);
          if (handle) {
            setSelectedFile({ 
              path: storedSelected, 
              name: storedSelected.split('/').pop() || '',
              handle 
            });
          }
        }
      }
    };
    initializeFileSystem();
  }, []);

  // Save state to localStorage on changes
  useEffect(() => {
    const stateToSave = {
      storedPath: currentPath,
      storedExpanded: Array.from(expandedFolders),
      storedSelected: selectedFile?.path
    };
    localStorage.setItem('localEditorState', JSON.stringify(stateToSave));
  }, [currentPath, files, expandedFolders, selectedFile]);

  // Auto-save functionality
  useEffect(() => {
    if (!selectedFile || !fileContent) return;
    const saveTimer = setTimeout(async () => {
      try {
        setIsSaving(true);
        await fileSystemController.writeFileContent(selectedFile?.handle, fileContent);
      } catch (error) {
        console.error('Error saving file:', error);
      } finally {
        setIsSaving(false);
      }
    }, 1000);
    return () => clearTimeout(saveTimer);
  }, [fileContent, selectedFile]);

  const handleOpenDirectory = async () => {
    setIsLoading(true);
    try {
      const success = await fileSystemController.openDirectory();
      if (success) {
        const fileTree = fileSystemController.getFileTree();
        if (fileTree) {
          setFiles(fileTree.children || []);
          setCurrentPath(fileTree.name);
        }
      }
    } catch (error) {
      console.error('Error opening directory:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = async (fileHandle: FileSystemFileHandle, fileName: string) => {
    try {
      if (!(fileHandle instanceof FileSystemFileHandle)) {
        throw new Error('Invalid file handle type');
      }
      const content = await fileSystemController.readFileContent(fileHandle);
      const filePath = `${currentPath}/${fileName}`;
      setSelectedFile({ name: fileName, path: filePath, handle: fileHandle });
      setFileContent(content);
      
      // Update file tree reference after selection
      const updatedTree = fileSystemController.getFileTree();
      setFiles(updatedTree?.children || [])
    } catch (error) {
      console.error('Error loading file content:', error);
    }
  };

  const handleDeleteFile = async (fileToDelete: { path: string }) => {
    try {
      await fileSystemController.deleteItem(fileToDelete.path);
      handleRefreshFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  };

  

  const getLanguageFromExtension = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'ts': return 'typescript';
      case 'js': return 'javascript';
      case 'py': return 'python';
      case 'java': return 'java';
      case 'cpp': return 'cpp';
      default: return 'typescript';
    }
  };

  const handleRunCode = async () => {
    if (!selectedFile || !fileContent) return;
    try {
      const language = getLanguageFromExtension(selectedFile.name);
      const result = await codeExecutionService.executeCode({
        language,
        code: fileContent
      });

      setTerminalHistory(prev => [
        ...prev,
        { type: 'input', content: `Run ${selectedFile.name}` },
        { type: 'output', content: result.output?.output || result.output.error }
      ]);
    } catch (error) {
      setTerminalHistory(prev => [
        ...prev,
        { type: 'input', content: `Run ${selectedFile.name}` },
        { type: 'output', content: (error as Error).message || 'Execution failed' }
      ]);
    }
  };

  const handleFolderClick = (folderName: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderName)) {
        newSet.delete(folderName);
      } else {
        newSet.add(folderName);
      }
      return newSet;
    });
  };

  const [showFolderActions, setShowFolderActions] = useState<string | null>(null);
  const [showFileActions, setShowFileActions] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<{ path: string; handle: FileSystemFileHandle } | null>(null);

  const renderFileTree = (items: typeof files) => {
    return items.map((file, index) => (
      <div key={index}>
        <div
          className={`flex items-center gap-2 p-2 hover:bg-accent/50 cursor-pointer rounded-md relative ${
            selectedFile?.name === file.name ? 'bg-accent' : ''
          }`}
          onClick={() => {
            if (file.type === 'directory') {
              handleFolderClick(file.name);
            } else if (file.handle) {
              handleFileSelect(file.handle as FileSystemFileHandle, file.name);
            }
          }}
          onMouseEnter={() => {
            if (file.type === 'directory') setShowFolderActions(file.name);
            else setShowFileActions(file.name);
          }}
          onMouseLeave={() => {
            if (file.type === 'directory') setShowFolderActions(null);
            else setShowFileActions(null);
          }}
        >
          {file.type === 'directory' ? (
            <>
              {expandedFolders.has(file.name) ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
              <Folder className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{file.name}</span>
              
              {showFolderActions === file.name && (
                <div className="absolute right-2 flex gap-1 bg-background rounded-md p-1 shadow-sm border border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCreateNewFolder(file.name);
                    }}
                    title="Create new folder"
                  >
                    <FolderGit2 className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCreateNewFile(file.name);
                    }}
                    title="Create new file"
                  >
                    <FileText className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <>
              {getFileIcon(file.name)}
              <span className="text-sm">{file.name}</span>
              
              {showFileActions === file.name && (
                <div className="absolute right-2 flex gap-1 bg-background rounded-md p-1 shadow-sm border border-border">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={(e) => {
                      e.stopPropagation();
                      setFileToDelete({
                        path: `${currentPath}/${file.name}`,
                        handle: file.handle as FileSystemFileHandle
                      });
                      setIsDeleteDialogOpen(true);
                    }}
                    title="Delete file"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
        {file.type === 'directory' && file.children && expandedFolders.has(file.name) && (
          <div className="ml-4">
            {renderFileTree(file.children)}
          </div>
        )}
      </div>
    ));
  };

  const handleRefreshFiles = async () => {
    const fileTree = fileSystemController.getFileTree();
    setFiles(fileTree?.children || []);
  };

  const [isFolderDialogOpen, setIsFolderDialogOpen] = useState(false);
  const [isFileDialogOpen, setIsFileDialogOpen] = useState(false);
  const [currentParentPath, setCurrentParentPath] = useState('');

  const handleCreateNewFolder = async (parentPath: string) => {
    setCurrentParentPath(parentPath);
    setIsFolderDialogOpen(true);
  };

  const handleCreateNewFile = async (parentPath: string) => {
    setCurrentParentPath(parentPath);
    setIsFileDialogOpen(true);
  };

  const validateName = (name: string) => {
    if (!name.trim()) return 'Name cannot be empty';
    if (/[\\/:*?"<>|]/.test(name)) return 'Name contains invalid characters';
    return null;
  };

  const handleFolderSubmit = async (name: string) => {
    try {
      await fileSystemController.createDirectory(`${currentParentPath}/${name}`);
      handleRefreshFiles();
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  };

  const handleFileSubmit = async (name: string) => {
    try {
      await fileSystemController.createFile(`${currentParentPath}/${name}`);
      handleRefreshFiles();
    } catch (error) {
      console.error('Error creating file:', error);
    }
  };

  const handleResetUI = () => {
    fileSystemController.revokeDirectoryAccess();
    // Clear all state references to files
    setCurrentPath('');
    setFiles([]);
    setSelectedFile(null);
    setFileContent('');
    setTerminalHistory([]);
    setCurrentCommand('');
    setSavedFileTree(null);
    
    // Force clear all residual permissions
    if (window.isSecureContext) {
      navigator.storage && navigator.storage.persisted().then(persisted => {
        if (persisted) navigator.storage.persist();
      });
    }
    
    // Remove all localStorage entries related to editor
    localStorage.removeItem('localEditorState');
    localStorage.removeItem('fileSystemAccess');
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background fixed inset-x-0 top-16">
      <PopupDialog
        title="Create New Folder"
        description="Enter a name for the new folder"
        placeholder="Folder name"
        open={isFolderDialogOpen}
        onOpenChange={setIsFolderDialogOpen}
        onSubmit={handleFolderSubmit}
        validate={validateName}
      />
      <PopupDialog
        title="Create New File"
        description="Enter a name for the new file"
        placeholder="File name"
        open={isFileDialogOpen}
        onOpenChange={setIsFileDialogOpen}
        onSubmit={handleFileSubmit}
        validate={validateName}
      />
      <PopupDialog
        title="Delete File"
        description={`Are you sure you want to delete ${fileToDelete?.path.split('/').pop()}? This action cannot be undone.`}
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onSubmit={async () => {
          if (fileToDelete) {
            try {
              await fileSystemController.deleteItem(fileToDelete.path);
              handleRefreshFiles();
              if (selectedFile?.path === fileToDelete.path) {
                setSelectedFile(null);
                setFileContent('');
              }
            } catch (error) {
              console.error('Error deleting file:', error);
            }
          }
        }}
        submitLabel="Delete"
        submitVariant="destructive"
      />
      {/* File Explorer */}
      <div
        className={`border-r border-border ${isExplorerOpen ? 'w-64' : 'w-0'} transition-all duration-300`}
      >
        {isExplorerOpen && (
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-border flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleOpenDirectory}
                disabled={isLoading}
                className="flex-1 gap-2"
              >
                <FolderOpen className="h-4 w-4" />
                {isLoading ? 'Opening...' : 'Open Folder'}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCreateNewFolder(currentPath)}
                title="Create new folder"
              >
                <FolderGit2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCreateNewFile(currentPath)}
                title="Create new file"
              >
                <FileText className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefreshFiles}
                title="Refresh file list"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleResetUI}
                title="Reset workspace"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="flex-1 p-4">{renderFileTree(files)}</ScrollArea>
          </div>
        )}
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b border-border p-4">
          <div className="flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">root</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {currentPath.split('/').map((segment, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#">{segment}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsExplorerOpen(!isExplorerOpen)}
              >
                {isExplorerOpen ? <ChevronLeft /> : <ChevronRight />}
              </Button>
              <div className="flex items-center gap-2">
                {isSaving && <span className="text-xs text-muted-foreground">Saving...</span>}
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleRunCode}
                  className="gap-2"
                >
                  <Play className="h-4 w-4" />
                  Run
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 flex flex-col">
          <div className="flex-1">
            {selectedFile ? (
              <div className="h-full rounded-md border border-border bg-sidebar overflow-hidden">
                <CodeBlock
                  code={fileContent}
                  language={selectedFile ? getLanguageFromExtension(selectedFile.name) : 'typescript'}
                  onChange={setFileContent}
                  size="large"
                />
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                Select a file to edit
              </div>
            )}
          </div>
          
          {/* Terminal Section */}
          <div className="h-64 mt-4 rounded-md border border-border bg-sidebar overflow-hidden">
            <div className="p-2 border-b border-border bg-card/50 flex items-center justify-between">
              <span className="text-sm font-medium">Terminal</span>
              <Button variant="ghost" size="sm" className="h-6 px-2">
                <ChevronDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="p-2 font-mono text-sm h-[calc(100%-2.5rem)] overflow-auto bg-black/90">
              {terminalHistory.map((entry, index) => (
                <div key={index} className={entry.type === 'input' ? 'text-green-400' : 'text-white'}>
                  {entry.type === 'input' ? '$ ' : ''}{entry.content}
                </div>
              ))}
              <div className="flex text-green-400">
                <span>$ </span>
                <input
                  type="text"
                  value={currentCommand}
                  onChange={(e) => setCurrentCommand(e.target.value)}
                  onKeyDown={async (e) => {
                    if (e.key === 'Enter' && currentCommand.trim()) {
                      e.preventDefault();
                      const command = currentCommand.trim();
                      
                      if (command === 'clear') {
                        setTerminalHistory([]);
                        setCurrentCommand('');
                        return;
                      }
                      
                      setTerminalHistory(prev => [...prev, { type: 'input', content: currentCommand }]);
                      try {
                        const output = await fileSystemController.executeTerminalCommand(command);
                        setTerminalHistory(prev => [...prev, { type: 'output', content: output }]);
                      } catch (error) {
                        setTerminalHistory(prev => [...prev, { type: 'output', content: String(error) }]);
                      }
                      setCurrentCommand('');
                    }
                  }}
                  className="flex-1 bg-transparent outline-none ml-1"
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocalEditor;