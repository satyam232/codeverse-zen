
import React, { useEffect, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { EditorView } from '@codemirror/view';
import { lineNumbers } from '@codemirror/view';
import { autocompletion, CompletionContext } from '@codemirror/autocomplete';

interface CodeBlockProps {
  code: string;
  language?: string;
  animated?: boolean;
  showLineNumbers?: boolean;
  onChange?: (code: string) => void;
  size?: 'default' | 'large';
}

const CodeBlock: React.FC<CodeBlockProps> = ({
  code: initialCode,
  language = 'typescript',
  animated = false,
  showLineNumbers = true,
  onChange,
  size = 'default',
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

  // Create an array of extensions including conditional line numbers
  const getJavaCompletions = (context: CompletionContext) => {
    const word = context.matchBefore(/\w*/)
    if (!word) return null

    const javaSnippets = [
      {
        label: 'psvm',
        detail: 'public static void main',
        type: 'snippet',
        apply: 'public static void main(String[] args) {\n\t\n}'
      },
      {
        label: 'sout',
        detail: 'System.out.println',
        type: 'snippet',
        apply: 'System.out.println();'
      },
      {
        label: 'souf',
        detail: 'System.out.printf',
        type: 'snippet',
        apply: 'System.out.printf("");'
      },
      {
        label: 'fori',
        detail: 'for loop with index',
        type: 'snippet',
        apply: 'for (int i = 0; i < ; i++) {\n\t\n}'
      },
      {
        label: 'fore',
        detail: 'for-each loop',
        type: 'snippet',
        apply: 'for ( : ) {\n\t\n}'
      }
    ]

    return {
      from: word.from,
      options: javaSnippets,
      span: /^\w*$/
    }
  }

  const getExtensions = () => {
    const extensions = [
      getLanguageExtension(),
      EditorView.lineWrapping,
      autocompletion({
        override: language.toLowerCase() === 'java' ? [getJavaCompletions] : []
      }),
    ];
    
    if (showLineNumbers) {
      extensions.push(lineNumbers());
    }
    
    return extensions;
  };

  return (
    <div className="code-window relative overflow-hidden">
        <div className="floating-circle floating-circle-1 animate-float-slow"></div>
        <div className="floating-circle floating-circle-2 animate-float-medium"></div>
        <div className="floating-circle floating-circle-3 animate-float-fast"></div>
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
          height={size === 'large' ? '700px' : '400px'}
          onChange={handleCodeChange}
          extensions={getExtensions()}
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
