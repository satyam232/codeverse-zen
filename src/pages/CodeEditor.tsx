import React, { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Play, Download, Copy, Check, Clock, Cpu } from 'lucide-react';
import CodeBlock from '@/components/CodeBlock';
import { useToast } from '@/hooks/use-toast';
import { codeExecutionService } from '@/Services/codeExecution';

const languages = [
  { value: 'typescript', label: 'TypeScript' },
  { value: 'javascript', label: 'JavaScript' },
  { value: 'python', label: 'Python' },
  { value: 'java', label: 'Java' },
  { value: 'cpp', label: 'C++' }
];

const CodeEditor = () => {
  const [language, setLanguage] = useState('python');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const result = await codeExecutionService.executeCode({ language, code });
      if (result.error) {
        setOutput(result.error);
        toast({
          variant: 'destructive',
          title: 'Execution Error',
          description: result.output.error
        });
      } else {
        setOutput(result.output.error||result.output.output);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Request Failed',
        description: 'Failed to reach execution server'
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-background text-foreground flex flex-col fixed inset-x-0 top-16 overflow-hidden">
      {/* Toolbar */}
      <div className="w-full px-6 py-4 bg-card shadow-sm flex justify-between items-center border-b border-border/40 z-10">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[180px] bg-background/50 text-foreground border-border/40 hover:bg-accent/10 transition-colors">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div className="flex items-center gap-3">
          <Button onClick={handleRun} disabled={isRunning} className="bg-primary hover:bg-primary/90 text-primary-foreground flex gap-2 transition-colors">
            {isRunning ? <><Clock className="h-4 w-4 animate-spin" /> Processing...</> : <><Play className="h-4 w-4" /> Run Code</>}
          </Button>
          <Button variant="outline" size="icon" onClick={handleCopy} className="border-border/40 hover:bg-accent/10 transition-colors">
            {copied ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
          </Button>
          <Button variant="outline" size="icon" className="border-border/40 hover:bg-accent/10 transition-colors">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Code Editor */}
        <div className="flex-1 p-6 border-r border-border/40 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-medium text-foreground/80">Editor</h2>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Cpu className="h-4 w-4" />
              <span className="text-xs">Processing Power: High</span>
            </div>
          </div>
          <div className="h-[calc(80%-3rem)]">
            <CodeBlock code={code} language={language} onChange={setCode} size="large" />
          </div>
        </div>

        {/* Output Section */}
        <div className="w-1/3 p-6 bg-background/50">
          <h2 className="mb-4 text-sm font-medium text-foreground/80">Output</h2>
          <div className="p-4 bg-card rounded-lg text-foreground whitespace-pre-wrap h-[calc(100%-3rem)] overflow-auto border border-border/40 shadow-inner">
            {output || <span className="text-muted-foreground">No output yet. Click "Run Code" to execute your code and see the results here.</span>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
