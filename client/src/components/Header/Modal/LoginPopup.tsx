import { useAppDispatch, useAppSelector } from '@/store/hooks'
import { useRouter } from 'next/navigation'
import { useGetMyAccountQuery, useLoginUserMutation } from '@/store/recipes/recipe.user'
import { FC, useEffect, useRef, useState } from 'react'
import Modal from 'react-modal'
import { setTokens } from '../../Utility/Cookie'
import ErrorIcon from '../../Utility/Error'
import LoadingIcon from '../../Utility/Loading'
import SuccesIcon from '../../Utility/Succes'
import { setIsOpen } from '@/store/reducers/LoginPopupSlice'

const LoginPopup: FC = () => {

  useEffect(()=>{
    Modal.setAppElement('body');
    return()=>{}
  }, []);

  let initialData = {
    email: 'glushnev22@gmail.com',
    password: '1234'
  }
  
  const state = useAppSelector((state) => state.LoginPopupSlice.condition);
  const dispatch = useAppDispatch();
  const router = useRouter()
  const submitButton = useRef<HTMLButtonElement | null>(null)
  const [ getToken, {isLoading, isSuccess, isError, error} ] = useLoginUserMutation()
  const [userData, setUserData] = useState(initialData);

  const enableButton = ()=>{
    submitButton.current ?
    submitButton.current.disabled = true : null
  };

  const disableButton = ()=>{
    submitButton.current ?
    submitButton.current.disabled = false : null
  };

  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) =>{
    event.preventDefault();
    disableButton();
    try{
      const payload = await getToken(userData).unwrap()
      setUserData(initialData);
      setTokens(payload.token);
      dispatch(setIsOpen(false));
      router.push(process.env.NEXT_PUBLIC_LOGIN_URL ?? '/chat')
    }
    catch{
      error &&
      console.log(error)
    };
  };

  const customStyles = {
    overlay: {
       backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    content: {
       top: '50%',
       left: '50%',
       right: 'auto',
       bottom: 'auto',
       transform: 'translate(-50%, -50%)',
       backgroundColor: 'rgb(55 65 81)',
       border: "1px solid rgb(55 65 81)",
       borderRadius: "20px",
       display: 'flex',
       height: "400px",
       width: "90%",
       maxWidth:'500px',
       fontSize: "large",
    }
 };

  return (
    <>
    <button onClick={() => dispatch(setIsOpen(true))}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#a21caf" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
        </svg>
     </button>
    <Modal 
      className=' absolute bg-gray-800 flex-col p-5'
      style={customStyles} 
      isOpen={state} 
      onRequestClose={() => dispatch(setIsOpen(false))}>
      <div className='flex font-bold justify-between pb-7 border-b border-violet-400'>
        <h1 className=' text-violet-400'>LOGIN</h1>
        <button onClick={() => dispatch(setIsOpen(false))}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgb(167 139 250)" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
      <form onSubmit={handleSubmit} method="post">
        <div className="flex flex-col h-full font-bold justify-around text-violet-400">
          <label className='flex flex-col'>
            <span className='mb-5'>Email:</span>
            <input className=' focus:outline-none focus:ring-2 focus:ring-violet-600 border-2 pl-3 border-violet-600 text-violet-600 rounded-lg p-1
            placeholder:text-sm'
            type="text"  placeholder='YOUR EMAIL ADDRESS'
            value={userData.email}
            onChange={ e => setUserData({...userData, email: e.target.value})}
            autoComplete='on'/>
          </label>
          <label className='flex flex-col'>
          <span className='mb-5'>Password:</span>
            <input className=' focus:outline-none focus:ring-2 focus:ring-violet-600 border-2 pl-3 border-violet-600 text-violet-600 rounded-lg p-1
            placeholder:text-sm'
            type="password" placeholder='PASSWORD' 
            value={userData.password}
            onChange={ e => setUserData({...userData, password: e.target.value})}
            autoComplete='on'/>
          </label>
        </div>
        <button className='mt-5 self-center text-white font-bold w-48 py-1 bg-violet-600 rounded-lg' type='submit'
          ref={submitButton}>
          {isLoading ? <div className='icons'><LoadingIcon width={'24'}/></div> :
           isSuccess ? <div className='icons'><SuccesIcon color='white' width={'30'}/></div> : 
           isError ? <div className='icons'><ErrorIcon width={'30'} color='white'/></div> : 'LogIn'}
        </button>
      </form>
    </Modal>
    </>
  )
}

export default LoginPopup