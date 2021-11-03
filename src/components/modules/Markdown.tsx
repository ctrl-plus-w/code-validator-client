import type { FC } from 'react';

import clsx from 'clsx';

import ReactMarkdown from 'react-markdown';

import Code from '@module/Code';

interface IProps {
  content: string;

  className?: string;
}

const Markdown: FC<IProps> = ({ className: _className, content }) => {
  return (
    <ReactMarkdown
      className={clsx(['flex flex-col', _className])}
      components={{
        code: ({ inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <Code language={match[1]}>{children}</Code>
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
