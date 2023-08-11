import DetailNavigation from '@/components/Navigation/DetailNavigation'

export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DetailNavigation title='Settings'>
      {children}
    </DetailNavigation>
  );
}
