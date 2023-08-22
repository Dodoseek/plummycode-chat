import { FC, useEffect, useState } from "react";
import Image from 'next/image'
import { useAppSelector } from "@/store/hooks";
import { useGetMyAccountQuery } from "@/store/recipes/recipe.user";
import LoginPopup from "./Modal/LoginPopup";
import Loading from "./loading";

const Header: FC = () => {

  const user = useAppSelector((state) => state.IsAuthenticated);
  const { data, isError, isLoading } = useGetMyAccountQuery();
  const [userAuth, setAuth] = useState(false)

  useEffect(() => {
    user.id !== 0 ? setAuth(true) : 
    false;
    console.log(userAuth)
  }, [])

  return (
    <>
        <header
      className=" bg-gray-200 py-2 h-12 flex items-center justify-center px-4">
      <div className="flex justify-between w-full">
        <Image src="/plummycode.svg" alt="" height={20} width={10}
        className=" w-40 sm:w-56 h-10" priority/>
        {data && <Image src={user.pictures[4]} height={50} width={50} quality={50}
            className="h-10 inline-flex w-10 justify-end rounded-full"
            alt=""
            />}
        { isLoading && <Loading/> }
        { isError && <LoginPopup/> }
      </div>
      </header>
    </>
  );
};

export default Header;