import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import { getCurrentUser } from '@/lib/actions/auth.action'
import {
  getInterviewsByUserId,
  getLatestInterviews,
} from '@/lib/actions/general.actions'
import Image from 'next/image'
import Link from 'next/link'

const Home = async () => {
  const user = await getCurrentUser()

  const [userInterviews, latestInterviews] = await Promise.all([
    await getInterviewsByUserId(user?.id!),
    await getLatestInterviews({ userId: user?.id! }),
  ])

  const hasPastInterviews = userInterviews?.length > 0
  const hasUpcomingInterviews = latestInterviews?.length > 0
  return (
    <>
      <section className='card-cta'>
        <div className='flex items-center gap-6'>
          <div className='flex flex-col gap-6 max-w-lg '>
            <h2 className='text-2xl lg:text-[30px]'>
              Get Interview Ready with AI-Powered Practice & Feedback
            </h2>
            <p className='text-[16px] lg:text-lg'>
              Practice on real interview questions & get feedback
            </p>
            <Button asChild className='btn-primary max-sm:w-full'>
              <Link href='/interview'>Start an Interview</Link>
            </Button>
          </div>
          <div className=''>
            <Image
              src='/robot.png'
              alt='robo-dude'
              width={400}
              height={400}
              className='max-sm:hidden'
            />
          </div>
        </div>
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2 className='text-2xl lg:text-[30px]'>Your Interviews</h2>
        <div className='interviews-section'>
          {hasPastInterviews ? (
            userInterviews?.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p className='text-[16px] lg:text-lg'>
              You haven&apos;t taken any interviews yet
            </p>
          )}
        </div>
      </section>

      <section className='flex flex-col gap-6 mt-8'>
        <h2 className='text-2xl lg:text-[30px]'>Take an Interview</h2>
        <div className='interviews-section'>
          {hasUpcomingInterviews ? (
            latestInterviews?.map((interview) => (
              <InterviewCard key={interview.id} {...interview} />
            ))
          ) : (
            <p className='text-[16px] lg:text-lg'>
              There are no new interviews available
            </p>
          )}
        </div>
      </section>
    </>
  )
}

export default Home
