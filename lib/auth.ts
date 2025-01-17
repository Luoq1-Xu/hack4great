import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import bcrypt from 'bcryptjs';
import { getUserByUsername, createUser } from './db';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub]
});

export async function signInTest({ username, password }: { username: string; password: string }) {
  const user = await getUserByUsername(username);
  if (!user) {
    throw new Error('Invalid username or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid username or password');
  }

  // Implement your session logic here (e.g., setting a cookie or token)
  // For example:
  // const token = createToken(user);
  // setCookie('token', token);

  return user;
}

export async function createUserTest(username: string, password: string, user_type: string) {
  const user = await createUser(username, password, user_type);
  if (!user) {
    throw new Error('Failed to create user');
  }
}
