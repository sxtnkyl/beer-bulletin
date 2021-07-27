import NextAuth from "next-auth";
import Providers from "next-auth/providers";
const { User } = require("../../../lib/models/User");

export default NextAuth({
  //TODO: decide cookies or JWT persist
  //only use cookies secure flag in prod (with https)
  cookie: {
    secure: process.env.NODE_ENV && process.env.NODE_ENV === "production",
  },
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60,
  },
  // Configure one or more authentication providers
  providers: [
    //TODO: setup magic email > https://next-auth.js.org/providers/email
    Providers.Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      // maxAge: 24 * 60 * 60, // How long email links are valid for (default 24h)
    }),
    //https://github.com/nextauthjs/next-auth/blob/main/src/providers/github.js
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    Providers.Credentials({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        const res = await User.findOne({
          where: {
            username: req.body.username,
            password: req.body.password,
          },
        });
        const user = await res.json()
        
        // If no error and we have user data, return it
        if (res.ok && user) {
          return user
        }
        // Return null if user data could not be retrieved
        return null
      }
    }),
  ],

  //Not sure on difference of adapter and database Options
  adapter: Adapters.TypeORM.Adapter(({
    type: 'mysql',
    database: ':memory:',
    // database: 'mysql://nextauth:password@127.0.0.1:3306/nextauth?synchronise=true',
    synchronize: true
  })),

  //Custom pages instead of Next's built-in components
  // pages: {
  //   signIn: '/auth/signin',
  //   signOut: '/auth/signout',
  //   error: '/auth/error', // Error code passed in query string as ?error=
  //   verifyRequest: '/auth/verify-request', // (used for check email message)
  //   newUser: '/auth/new-user' // New users will be directed here on first sign in
  // },

  //db connection
  database: {
    type: "mysql",
    host: "127.0.0.1",
    port: 3306,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
});
export default (req, res) => NextAuth(req, res, configuration)