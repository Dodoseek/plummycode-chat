import { NextPage } from 'next'
import { UserPanel } from '@/components/UserPanels'
import { getUsers } from '@/services/UserActions';
import { AllUsers } from '@/types/types';



const UsersPage: NextPage = async () => {

  const data = await getUsers() as AllUsers

  return (
    <>
      {data?.results && data.results.map((user) => {
        return <UserPanel key={user.id}
          username={user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.username}
          image={user.image} slug={user.slug} />
      })}
    </>
  );
}

export default UsersPage