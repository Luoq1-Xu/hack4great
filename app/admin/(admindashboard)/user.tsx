'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

function getCookieValue(name: string) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
}

export function User() {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const username = getCookieValue('username');
    setUsername(username ? "" + username : null);
  }, []);

  const handleSignOut = async () => {
    const response = await fetch('/api/signOut', {
      method: 'POST',
    });

    if (response.ok) {
      router.push('/login');
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Image
            src={'/placeholder-user.jpg'}
            width={36}
            height={36}
            alt="Avatar"
            className="overflow-hidden rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Support</DropdownMenuItem>
        <DropdownMenuSeparator />
        {username ? (
          <DropdownMenuItem asChild>
            <button onClick={handleSignOut}>Sign Out</button>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem asChild>
            <Link href="/login">Sign In</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}