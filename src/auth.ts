import { prisma } from '@/prisma'
import { PrismaAdapter } from '@auth/prisma-adapter'
import bcrypt from 'bcryptjs'
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { ZodError } from 'zod'
import pages from './config/pages'

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Usuario', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      authorize: async credentials => {
        try {
          const cliente = await prisma.clientes.findUnique({
            where: {
              email: credentials.email?.toString() ?? '',
            },
          })

          if (!cliente) {
            return null
          }

          const compare = await bcrypt.compare(
            credentials.password?.toString() ?? '',
            cliente?.password ?? 'null'
          )
          if (!compare) {
            return null
          }

          console.log({
            email: cliente?.email,
            id: cliente?.id,
            name: cliente?.nombre,
            success: true,
          })
          const user = {
            email: cliente?.email ?? '',
            id: cliente?.id ?? '',
            name: cliente?.nombre ?? '',
          }

          return user

          // const validatedFields = SignupFormSchema.safeParse({
          //   usuario: credentials.email,
          //   password: credentials.password,
          // })

          // if (!validatedFields.success) {
          //   return {
          //     errors: validatedFields.error.flatten().fieldErrors,
          //     success: false,
          //   }
          // }

          // const response = await fetchResponse('auth', 'POST', {
          //   flag: 'cliente',
          //   usuario: credentials.email,
          //   password: credentials.password,
          // })

          // console.log(response)

          // if (!response) {
          //   return {
          //     errors: {
          //       response: 'Error de conexión',
          //     },
          //     success: false,
          //   }
          // }

          // const { error, message, data } = response

          // if (error) {
          //   return {
          //     errors: {
          //       response: message,
          //     },
          //     success: false,
          //   }
          // }

          // const access = data?.access_token as string
          // console.log(access)
          // if (!access) {
          //   return {
          //     errors: {
          //       response: 'Token de acceso no encontrado',
          //     },
          //     success: false,
          //   }
          // }

          // const currentUserResponse = await fetch(`https://sandbox3.huastecanetwork.com/api/auth`, {
          //   method: 'GET',
          //   headers: {
          //     'Content-Type': 'application/json',
          //     authorization: `Bearer ${access}`,
          //   },
          // })
          // if (currentUserResponse.status != 200) {
          //   console.log(currentUserResponse)
          //   throw new Error(await currentUserResponse.text())
          // }

          // const currentUserJson = await currentUserResponse.json()
          // console.log(currentUserJson)
          // user = currentUserJson

          // return user
        } catch (error) {
          console.log(error)
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null
          }
          return null
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: pages,
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
    },
  },
  secret: process.env.AUTH_SECRET || 'kIGN7Ezh1b4XYVNUi8l8RmGSzVNt0yO6R3o2+APm07Q=',
})

console.log(process.env.AUTH_SECRET || 'kIGN7Ezh1b4XYVNUi8l8RmGSzVNt0yO6R3o2+APm07Q=')
