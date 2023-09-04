import { FC } from "react";
import Image from 'next/image'
import logo from '@/assets/plummychat.svg'
import { BackButton, TitleNavigation } from "./Utility";
import { CLASSNAME, COLOR, WIDTH } from "@/constants/profile";
import Link from "next/link";
import { getMyRecievedRequests } from "@/services/FriendListActions";
import { getServerSession } from "next-auth";
import { authConfug } from "@/configs/auth";

const Header: FC = async () => {
  const session = await getServerSession(authConfug)
  const requests = await getMyRecievedRequests(session?.access_token!)
  const has_requests = requests.count > 0 ? true : false

  return (
    <>
      <header
        className="rounded-b-md border-b border-x my-0 border-violet-400/20 hover:bg-purple-900/20 bg-purple-950/20 backdrop-blur-sm/20 inline-flex items-center justify-center px-4">
        <div className="flex relative justify-between items-center w-full">
          <TitleNavigation />
          <Link href={'/friendship-requests'} className="flex hover:backdrop-blur-sm hover:bg-purple-400/20 rounded-md absolute right-48 sm:right-64 top-0 items-center w-10 justify-center py-2 h-10">
            <div className="border-x border-purple-400 w-full h-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={has_requests ? '#BD00FF' : "none"} viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#BD00FF"
                className={`w-full h-6 ${has_requests ? 'animate-bounce' : null}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            </div>
          </Link>
          <Image src={logo} alt="plummy-chat" quality={100} className=" w-40 sm:w-56 h-10" priority />
        </div >
      </header >
    </>
  );
};

export default Header;


interface UserProps {
  name: string,
  settings?: boolean
}

export const HeaderProfile: FC<UserProps> = ({ name, settings = true }) => {
  return (
    <>
      <div
        className='mx-1
                p-1 mt-1 hover:bg-purple-500/10 border border-violet-400/20 bg-purple-400/20 backdrop-blur-sm/20 rounded-full
                flex justify-between items-center flex-row'>
        <BackButton color={COLOR} width={WIDTH} className={CLASSNAME} />
        {!settings ? <span className="pe-5">{name}</span> : name}
        {settings && <Link href={'/settings'}>
          <svg
            width={WIDTH}
            height={WIDTH}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke={COLOR}
            className={CLASSNAME + 'hover:animate-spin'}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </Link>}
      </div>
    </>
  )
}
