'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardHeader, CardTitle, CardFooter, CardContent } from '@/components/ui/card'; // Adjust the import path as needed
import { Button } from '@/components/ui/button'; // Adjust the import path as needed
import { Input } from '@/components/ui/input';
import { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const response = await fetch('/api/signIn', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
      // Handle successful sign-in (e.g., redirect to dashboard)
      document.cookie = `token=${data.token}; path=/`;
      document.cookie = `user_type=${data.user_type}; path=/`;
      document.cookie = `username=${username}; path=/`;

      // redirect based on user_type
      if (data.user_type === 'admin') {
        router.push('/admin');
      } else if (data.user_type === 'user') {
        router.push('/user');
      }
    } else {
      // Handle sign-in error
      setError(data.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col items-center">
          <Image src="/logo.png" alt="Logo" width="480" height="480" />
          <CardTitle className="text-center">Sign in to your account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="flex flex-col space-y-2">
              <label htmlFor="username">Username</label>
              <Input
                id="username"
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label htmlFor="password">Password</label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <div className="mt-4 flex justify-end">
              <Button type="submit">Sign In</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}