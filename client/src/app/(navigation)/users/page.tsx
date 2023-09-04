import { NextPage } from 'next'
import { UserPanel } from '@/components/Panels'
import { getUsers } from '@/services/UserActions';
import { AllUsers } from '@/types/users';
import { IsEmpty } from '@/components/Utility';



const UsersPage: NextPage = async () => {

  const data = await getUsers() as AllUsers

  return (
    <>
      {data?.results.length > 0 ? data.results.map((user) => {
        return <UserPanel key={user.id} {...user} />
      }) :
        <IsEmpty text='The list of users is empty :(' buttonToUsers={false} />}
    </>
  );
}

export default UsersPage