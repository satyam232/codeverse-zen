
import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { EditorView } from '@codemirror/view';

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

  const handleCodeChange = (value: string) => {
    setCode(value);
    onChange?.(value);
  };

  const getLanguageExtension = () => {
    switch (language.toLowerCase()) {
      case 'javascript':
        return javascript();
      case 'typescript':
        return javascript({ typescript: true });
      case 'python':
        return python();
      case 'java':
        return java();
      case 'cpp':
      case 'c++':
        return cpp();
      default:
        return javascript({ typescript: true });
    }
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
        <CodeMirror
          value={code}
          height="300px"
          onChange={handleCodeChange}
          extensions={[
            getLanguageExtension(),
            EditorView.lineWrapping,
            showLineNumbers ? EditorView.lineNumbers() : [],
          ]}
          theme="dark"
          basicSetup={{
            lineNumbers: showLineNumbers,
            foldGutter: true,
            autocompletion: true,
            bracketMatching: true,
            closeBrackets: true,
            highlightActiveLine: true,
            highlightSelectionMatches: true,
            indentOnInput: true,
            syntaxHighlighting: true,
          }}
          className="h-full"
        />
      </div>
    </div>
  );
};

export default CodeBlock;
