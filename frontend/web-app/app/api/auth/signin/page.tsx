import EmptyFilter from '@/app/components/EmptyFilter'
import React from 'react'

export default function SignIn({searchParams}: {searchParams: {callbackUrl: string}}) {
  return (
    <>
    <EmptyFilter 
        title='You are not signed in'
        subtitle='Please sign in to your account'
        showLogin
        callbackUrl={searchParams.callbackUrl}
    />
    </>
  )
}
