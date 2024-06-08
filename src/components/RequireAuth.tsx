"use client";

import { useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { UserContext } from '@/context/user.context';

const RequireAuth = ({ children }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));;
    setCurrentUser(storedUser);
  }, [setCurrentUser,router]);


  useEffect(() => {
    if (!currentUser) {
      router.push("/sign-in");
    }
  }, [currentUser, router]);

  return currentUser ? <>{children}</> : null;
};

export default RequireAuth;
