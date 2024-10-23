import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function authGuard() {
  const cookieStore = cookies()
  const token = cookieStore.get('_medusa_jwt')

  if (!token) {
    redirect('/account')
  }

  return token
}