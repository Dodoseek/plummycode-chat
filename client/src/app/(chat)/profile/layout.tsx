import { Scrollbar, TitleNavigation } from '@/components/Utility';

export default function UsersLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <TitleNavigation title='Profile'>
            <Scrollbar>
                {children}
            </Scrollbar>
        </TitleNavigation>
    );
}
