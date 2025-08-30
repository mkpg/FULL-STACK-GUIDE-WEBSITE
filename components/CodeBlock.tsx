
import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { CodeSnippet } from '../types';
import { IconClipboard, IconCheck } from './Icons';
import Prism from 'prismjs';

interface CodeBlockProps {
  snippet: CodeSnippet;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ snippet }) => {
  const { language, code } = snippet;
  const [isCopied, setIsCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  }, [code]);

  return (
    <div className="my-4">
      <pre className={`language-${language} rounded-lg shadow-md`}>
        <code ref={codeRef} className={`language-${language}`}>
          {code.trim()}
        </code>
        <button
          onClick={handleCopy}
          className="copy-button p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
          aria-label={isCopied ? "Copied" : "Copy code"}
        >
          {isCopied ? (
            <IconCheck className="w-5 h-5 text-green-400" />
          ) : (
            <IconClipboard className="w-5 h-5" />
          )}
        </button>
      </pre>
    </div>
  );
};

export default CodeBlock;
