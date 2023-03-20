import { useOidc } from '@axa-fr/react-oidc';
import React from 'react'

import AuthForm from '../components/forms/AuthForm';

export default function AuthPage() {
  const {isAuthenticated, login, logout} = useOidc();

  console.log("isAuthenticated", isAuthenticated)

  return (
    <div>
      <AuthForm/>
    </div>
  )
}
