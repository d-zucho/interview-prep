'use client'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { Button } from './ui/button'
import { Input } from './ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'

type FormType = 'sign-up' | 'sign-in'

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === 'sign-up' ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  })
}

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authFormSchema(type)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === 'sign-up') {
        console.log('SIGN UP', values)
      } else {
        console.log('SIGN IN', values)
      }
    } catch (error) {
      // Handle error
      console.error('Error submitting form:', error)
      toast.error(`There was an error: ${error}`, {
        description: 'Please try again later.',
        duration: 3000,
      })
    }
  }

  const isSignIn = type === 'sign-in'
  return (
    <div>
      <div className='flex flex-col gap-6 card py-14 px-10'>
        <div className='flex flex-row gap-2 justify-center'>
          <Image src={'/logo.svg'} alt='logo' width={32} height={38} />
          <h2 className='text-primary-100'>PrepWise</h2>
        </div>

        <h3>Practice Job Interviews with AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='w-full space-y-6 mt-4 form'
          >
            {!isSignIn && <p>Name</p>}
            <p>Email</p>
            <p>Password</p>

            <Button type='submit' className='btn'>
              {isSignIn ? 'Sign in' : 'Create an account'}
            </Button>
          </form>
        </Form>
        <p className='text-center'>
          {isSignIn ? 'No account yet?' : 'Have an account already?'}
          <Link
            href={!isSignIn ? '/sign-in' : '/sign-up'}
            className='font-bold text-user-primary ml-1'
          >
            {!isSignIn ? 'Sign in' : 'Sign up'}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthForm
