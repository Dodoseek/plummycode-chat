import { authConfug } from '@/configs/auth';
import NextAuth from 'next-auth/next';

const handler = NextAuth(authConfug);

export { handler as GET, handler as POST };
