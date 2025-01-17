"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

type User = {
  id: number;
  status: string;
  username: string;
  password: string;
  user_type: string;
};


export default function CustomersPage() {

  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/getUsers');
      const data = await response.json();
      if (data.success) {
        setUsers(data.users);
      } else {
        console.error(data.message);
      }
    };

    fetchUsers();
  }, []);


  const handleAddUser = () => {
    router.push('/admin/createUser');
  };

  const handleSuspendUser = (id: number) => {
    // Logic to suspend a user
  };

  const handleResetPassword = (id: number) => {
    // Logic to reset a user's password
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users</CardTitle>
        <CardDescription>View all users and manage accounts.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Button onClick={handleAddUser}>Add User</Button>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Username</th>
              <th className="py-2 px-4 border-b">Password</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="py-2 px-4 border-b">{user.username}</td>
                <td className="py-2 px-4 border-b">{user.password}</td>
                <td className="py-2 px-4 border-b">{user.status}</td>
                <td className="py-2 px-4 border-b space-x-5">
                  <Button variant="outline" size="sm" onClick={() => handleSuspendUser(user.id)}>Suspend</Button>
                  <Button variant="outline" size="sm" onClick={() => handleResetPassword(user.id)}>Reset Password</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
}