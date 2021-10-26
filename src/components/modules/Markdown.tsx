import { FC } from 'react';

import ReactMarkdown from 'react-markdown';
import SyntaxHighlighter from 'react-syntax-highlighter';

import hljsTheme from '@style/hljs';

interface IProps {
  content: string;

  className?: string;
}

const Markdown: FC<IProps> = ({ className: _className, content }) => {
  return (
    <ReactMarkdown
      className={_className}
      components={{
        code: ({ inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={hljsTheme}
              customStyle={{
                marginTop: '2rem',
                padding: '1rem',
                borderRadius: '2px',
              }}
              language={match[1]}
              PreTag="div"
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;
