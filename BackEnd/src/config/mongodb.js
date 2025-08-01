import { env } from '~/config/environment'
import { MongoClient, ServerApiVersion } from 'mongodb'

// Initialize a todoDatabaseInstance object with an initial value of null
let todoDatabaseInstance = null

// Initialize a mongoClientInstance object to connect to MongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// Connect to MongoDB
export const CONNECT_DB = async () => {
  // Call the connection method on the mongoClientInstance
  await mongoClientInstance.connect()

  // Assign the connected client to the todoDatabaseInstance
  todoDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}
export const GET_DB = () => {
  if (!todoDatabaseInstance) throw new Error('Must connect to MongoDB first')
  return todoDatabaseInstance
}
