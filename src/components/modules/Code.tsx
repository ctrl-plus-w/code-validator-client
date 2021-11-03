import type { FC, ReactNode } from 'react';

import SyntaxHighlighter from 'react-syntax-highlighter';

import hljsTheme from '@style/hljs';

interface IProps {
  language: string;

  customStyle?: {
    [key: string]: string;
  };

  children: ReactNode;
}

const Code: FC<IProps> = ({ language, customStyle, children }) => {
  return (
    <SyntaxHighlighter
      style={hljsTheme}
      customStyle={{
        marginTop: '2rem',
        padding: '1rem',
        borderRadius: '2px',
        ...customStyle,
      }}
      language={language}
      PreTag="div"
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  );
};

export default Code;
