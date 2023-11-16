'use client'
import { useSession } from "next-auth/react";

export default function Usuario() {
  const { data: session } = useSession()

  if (session && session.user) {
    console.log(session)
    return (
      <div>{session.user.name}</div>
    )
  }
  return (
    <div>dane-se</div>
  )
}