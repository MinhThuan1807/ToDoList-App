import { env } from './environment'

//Config session
export const sessionConfig = {
  secret: env.SECRET_SESSION_KEY,
  resave: false, // don't save session if unmodified
  saveUninitialized: true, // save new session even if not set data
  cookie: {
    maxAge: 1000 * 60 * 5, // 5 minutes
    httpOnly: true // security: only server can access cookie
  }
}
