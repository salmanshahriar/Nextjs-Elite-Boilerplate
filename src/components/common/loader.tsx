'use client';

import LoaderIcon from '@/components/icons/loader-icon';

const Loader = ({
  border = false,
  shadow = false,
  rounded = false,
}: {
  border?: boolean;
  shadow?: boolean;
  rounded?: boolean;
}) => {
  return (
    <div
      className={`bg-white/5 p-10 ${border ? 'ring ring-black/10' : ''} ${shadow ? 'shadow-box' : ''} ${rounded ? 'rounded-xl' : 'rounded-b-xl'}`}
    >
      <div className="flex h-32 w-full items-center justify-center gap-2">
        <LoaderIcon />
        Loading...
      </div>
    </div>
  );
};

export default Loader;
