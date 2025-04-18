import AuthForm from '@/components/AuthForm'

const SignIn = () => {
  return (
    <div className='card-border lg:min-w-[566px]'>
      <div className='flex flex-col gap-6 card py-14 px-10'>
        <AuthForm type='sign-in' />
      </div>
    </div>
  )
}

export default SignIn
