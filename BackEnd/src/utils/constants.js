import { env } from '~/config/environment'
// Domains that are allowed to access the API
export const WHITELIST_DOMAINS = ['http://localhost:5173']

export const WEBSITE_DOMAIN =
  env.BUILD_MODE === 'production'
    ? env.WEBSITE_DOMAIN_PRODUCTION
    : env.WEBSITE_DOMAIN_DEVELOPMENT
