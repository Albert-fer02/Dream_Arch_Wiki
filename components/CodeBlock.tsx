
import React, { useState } from 'react';
import { CopyIcon, CheckIcon } from './icons';

interface CodeBlockProps {
  title: string;
  code: string;
  language?: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ title, code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const highlightSyntax = (line: string) => {
    if (line.trim().startsWith('[')) {
      return <span className="text-cyan-400">{line}</span>;
    }
    if (line.includes('=')) {
      const parts = line.split('=');
      return (
        <>
          <span className="text-purple-400">{parts[0]}</span>=
          <span className="text-green-400">{parts.slice(1).join('=')}</span>
        </>
      );
    }
    return <span>{line}</span>;
  };

  return (
    <div className="bg-slate-950 rounded-lg border border-slate-700 overflow-hidden not-prose">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-900/70 border-b border-slate-700">
        <h4 className="text-sm font-semibold text-slate-300">{title}</h4>
        <button
          onClick={handleCopy}
          className="flex items-center space-x-2 text-sm text-slate-400 hover:text-white transition focus:outline-none focus:ring-2 focus:ring-cyan-400 rounded px-2 py-1"
          aria-label={copied ? 'Code copied to clipboard' : 'Copy code to clipboard'}
        >
          {copied ? <CheckIcon className="w-4 h-4 text-green-400" aria-hidden="true" /> : <CopyIcon className="w-4 h-4" aria-hidden="true" />}
          <span>{copied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
      <pre className="p-4 text-sm overflow-x-auto" role="region" aria-label={`Code example: ${title}`}>
        <code>
          {code.split('\n').map((line, i) => (
            <div key={i}>{highlightSyntax(line)}</div>
          ))}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
