
import React, { useEffect, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';

interface CodeBlockProps {
  code: string;
  language?: string;
  animated?: boolean;
  showLineNumbers?: boolean;
  onChange?: (code: string) => void;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code: initialCode,
  language = 'typescript',
  animated = false,
  showLineNumbers = true,
  onChange,
}) => {
  const [code, setCode] = useState(initialCode);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className="code-window">
      <div className="flex items-center px-4 py-2 bg-editor-gutter border-b border-border/10">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-destructive/70"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/70"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/70"></div>
        </div>
        {language && (
          <div className="ml-auto text-xs text-muted-foreground uppercase tracking-wide">
            {language}
          </div>
        )}
      </div>
      <div className={`p-0 bg-editor text-editor-foreground overflow-x-auto ${animated ? 'animate-code-typing' : ''}`}>
        <Textarea
          value={code}
          onChange={handleCodeChange}
          className="font-mono text-sm w-full h-full min-h-[300px] bg-transparent border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 p-4"
          spellCheck="false"
        />
      </div>
    </div>
  );
};

export default CodeBlock;
