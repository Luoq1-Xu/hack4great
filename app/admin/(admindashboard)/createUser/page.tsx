'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'; // Adjust the import path as needed
import { Button } from '@/components/ui/button'; // Adjust the import path as needed
import { Input } from '@/components/ui/input';
import { Select } from '@radix-ui/react-select';
import { SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function CreateUserPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user_type, setUserType] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const response = await fetch('/api/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, user_type }),
    });

    const data = await response.json();

    if (data.success) {
      setSuccess('User created successfully!');
      setUsername('');
      setPassword('');
      // Optionally redirect to another page
      // router.push('/some-other-page');
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-8">
      <Card className="w-full max-w-sm">
        <CardHeader className="flex flex-col items-center">
          <CardTitle className="text-center">Create a New User</CardTitle>
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
              <label htmlFor="user_type">User Type</label>
              <Select
                name="user_type"
                value={user_type}
                onValueChange={(value) => setUserType(value)}
                required
                >
                <SelectTrigger>
                  <SelectValue placeholder="User Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectGroup>
                </SelectContent>
                </Select>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}
            <div className="mt-4 flex justify-end">
              <Button type="submit">Create User</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}