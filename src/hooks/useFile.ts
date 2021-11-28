import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IReturnProps {
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;

  content: string;
}

const useFile = (): IReturnProps => {
  const [file, setFile] = useState<File | null>(null);

  const [content, setContent] = useState('');

  useEffect(() => {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      setContent(reader.result as string);
    };

    reader.readAsText(file);
  }, [file]);

  return { file, setFile, content };
};

export default useFile;
