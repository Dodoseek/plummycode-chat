import { FC } from "react";
import Image from 'next/image'
import logo from '@/assets/plummychat.svg'
import { getServerSession } from "next-auth";
import { authConfug } from "@/configs/auth";
import { SignOut } from "./Sign";

const Header: FC = async () => {

  const session = await getServerSession(authConfug)

  return (
    <>
      <header
        className=" bg-gray-200 py-2 h-12 flex items-center justify-center px-4">
        <div className="flex justify-between w-full">
          <Image src={logo} alt="plummy-chat" quality={100} className=" w-40 sm:w-56 h-10" priority />
          {session?.user &&
            <><SignOut />
              <Image
                src={session.user.image!}
                alt={session.user.name ? session.user.name : 'user'}
                quality={100}
                height={50} width={50} className=" rounded-full w-10 h-10" priority />
            </>
          }
        </div>
      </header>
    </>
  );
};

export default Header;