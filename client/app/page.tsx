'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/utils/useAuth';
import { Button } from './components/ui/button';
import { Header } from './components/customsComponents/layout/Header';
import { NavMenu } from './enums/NavMenuEnum';


const LandingPage: React.FC = () => {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <p>Redirection vers la page de login...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Header title={NavMenu.HOME} />
      <h1 className="text-4xl font-bold mb-4">Bienvenue sur la Landing Page</h1>
      <p className="text-lg mb-6">Tu es authentifié. Bienvenue dans ton espace !</p>
      <Button onClick={() => router.push('/dashboard')}>Accéder à ton tableau de bord</Button>
    </div>
  );
};

export default LandingPage;
