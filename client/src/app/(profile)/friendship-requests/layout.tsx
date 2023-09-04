import { HeaderProfile } from "@/components/Headers";


export default async function UsersLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <HeaderProfile name={'Friend List Requests'} settings={false} />
            <div className='scroll my-1'>
                {children}
            </div >
        </>
    );
}
