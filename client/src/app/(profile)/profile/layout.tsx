import { HeaderProfile } from "@/components/Headers";
import { authConfug } from "@/configs/auth";
import { getServerSession } from "next-auth/next";

export default async function UsersLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    const session = await getServerSession(authConfug)
    const user = session?.user!;
    const name = user.first_name && user?.last_name
        ? `${user?.first_name} ${user?.last_name}`
        : user?.username

    return (
        <>
            <HeaderProfile name={name} />
            <div className='scroll my-1'>
                {children}
            </div>
        </>
    );
}
