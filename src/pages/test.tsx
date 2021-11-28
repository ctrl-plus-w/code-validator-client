import { NextPage } from 'next';

import MenuSkeleton from '@skeleton/MenuSkeleton';

const Test: NextPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-4">
      <MenuSkeleton />
    </div>
  );
};

export default Test;
