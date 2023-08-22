'use client'
// import Loading from '@/components/Utility/Loading';
import UserPanel from '@/components/Users/UserPanel';
import { useGetUsersQuery } from '@/store/recipes/recipe.user';
import { NextPage } from 'next'
import Loading from './loading';

const UsersPage: NextPage = () => {

  const {data, error, isLoading} = useGetUsersQuery()
  const loading_index = [...Array(8).keys()];
  return (
    <>
      {error && console.log(error)}
      {isLoading && loading_index.map((element)=>{
            return <Loading key={element} />
        })}
      {data?.results && data.results.map((user)=>{
        return <UserPanel key={user.id} 
        username={ user.first_name && user.last_name ? `${user.first_name} ${user.last_name}` : user.username} 
        pictures={user.pictures[4]} slug={user.slug} loading={isLoading}/>
      })}
    </>
  );
}

export default UsersPage