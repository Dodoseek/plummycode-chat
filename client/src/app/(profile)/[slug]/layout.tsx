import { HeaderProfile } from "@/components/Headers";
import { getUserBySlug } from "@/services/UserActions";

interface Params {
    slug: string
}

export default async function UsersLayout({
    children, params
}: {
    children: React.ReactNode;
    params: Params
}) {

    const user = await getUserBySlug(params.slug)
    const name = user.first_name && user?.last_name
        ? `${user?.first_name} ${user?.last_name}`
        : user?.username

    return (
        <>
            <HeaderProfile name={name} />
            <div className='scroll my-1'>
                {children}
            </div >
        </>
    );
}
