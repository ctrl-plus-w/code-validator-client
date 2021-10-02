import type { ReactElement } from 'react';

import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

import type { IProps } from '@element/Input';

import Input from '@element/Input';
import useSwitch from '@hook/useSwitch';

const PasswordInput = (props: IProps): ReactElement => {
  const { value: visible, swap } = useSwitch(false);

  return (
    <Input
      {...props}
      htmlType={visible ? 'text' : 'password'}
      icon={visible ? <EyeIcon className="w-5 h-5" /> : <EyeOffIcon className="w-5 h-5" />}
      onIconClick={swap}
    />
  );
};

export default PasswordInput;
