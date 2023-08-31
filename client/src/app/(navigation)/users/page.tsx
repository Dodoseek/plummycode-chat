import { NextPage } from 'next'
import { UserPanel } from '@/components/UserPanels'
import { getUsers } from '@/services/UserActions';
import { AllUsers } from '@/types/types';
import { IsEmpty } from '@/components/Utility';



const UsersPage: NextPage = async () => {

  const data = await getUsers() as AllUsers

  return (
    <>
      {data?.results.length > 0 ? data.results.map((user) => {
        return <UserPanel key={user.id}
          username={user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.username}
          image={user.image} slug={user.slug} />
      }) :
        <IsEmpty text='The list of users is empty :(' buttonToUsers={false} />}
    </>
  );
}

export default UsersPage