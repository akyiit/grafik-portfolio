import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email ve şifre gerekli')
        }

        console.log('🔍 Giriş denemesi:', credentials.email)

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        })

        if (!user) {
          console.log('❌ Kullanıcı bulunamadı:', credentials.email)
          throw new Error('Kullanıcı bulunamadı')
        }

        console.log('✅ Kullanıcı bulundu:', user.email)
        console.log('🔑 Girilen şifre:', credentials.password)
        console.log('🔒 Hash (ilk 20 karakter):', user.password.substring(0, 20))

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        )

        console.log('🎯 Şifre geçerli mi?', isPasswordValid)

        if (!isPasswordValid) {
          throw new Error('Şifre hatalı')
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/admin',      // ← /admin olarak değişti
    error: '/admin'        // ← /admin olarak değişti
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
      }
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
}