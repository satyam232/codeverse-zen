
import React from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  animated?: boolean;
  showLineNumbers?: boolean;
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code,
  language = 'typescript',
  animated = false,
  showLineNumbers = true,
}) => {
  const lines = code.trim().split('\n');

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
        <pre className="code-content">
          {lines.map((line, index) => (
            <div key={index} className="code-line">
              {showLineNumbers && <span className="code-line-number">{index + 1}</span>}
              <span className="code-line-content">{line}</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
