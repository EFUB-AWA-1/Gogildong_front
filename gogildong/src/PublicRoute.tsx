import { Navigate } from 'react-router-dom';
import { useAuthStore } from '@/Login/stores/useAuthStore';
import type { JSX } from 'react';

export default function PublicRoute({ children }: { children: JSX.Element }) {
  const accessToken = useAuthStore((state) => state.accessToken);

  if (accessToken) {
    return <Navigate to="/home" replace />;
  }

  return children;
}
