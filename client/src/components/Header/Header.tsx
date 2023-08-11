import { FC } from "react";

const Header: FC = () => {
  return (
    <header
      className="bg-violet-700 py-2 flex items-center justify-center">
      <div className="flex flex-1 justify-end">
        <img src="/im.webp"
          className="h-10 mx-6 inline-flex w-10 justify-end rounded-full"
          alt=""
        />
      </div>
    </header>
  );
};

export default Header;
