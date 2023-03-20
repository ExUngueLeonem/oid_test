import React, { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { authStore } from '../../store/AuthStore'

type Props = {
    children: React.ReactNode;
}

export default function AuthProvider({ children }: Props) {

    const navigate = useNavigate();

    if (authStore.isAuth) navigate("/auth");

    return { children };
}
