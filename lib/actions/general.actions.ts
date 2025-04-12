import { db } from '@/firebase/admin'

export async function getInterviewsByUserId(
  userId: string
): Promise<Interview[] | null> {
  const interviews = db
    .collection('interviews')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get()

  return (await interviews).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[]
}

export async function getLatestInterviews(
  params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
  const { userId, limit = 5 } = params

  const interviews = db
    .collection('interviews')
    .orderBy('createdAt', 'desc')
    .where('finalized', '==', true)
    .where('userId', '!=', userId)
    .limit(limit)
    .get()

  return (await interviews).docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[]
}

export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = db.collection('interviews').doc(id).get()

  return (await interview).data() as Interview | null
}
