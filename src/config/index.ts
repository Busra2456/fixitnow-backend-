import dotenv from "dotenv"
dotenv.config()
 export default{
      port : process.env.PORT,
      app_url : process.env.APP_URL,
      database_url : process.env.DATABASE_URL,
      bcrypt_salt_rounds : process.env.BCRYPT_SALT_ROUNDS,
      jwt_access_secret :  process.env.JWT_ACCESS_SECRET!,
 jwt_refresh_secret :  process.env.JWT_REFRESH_SECRET!,
 jwt_access_expires_in :  process.env.JWT_ACCESS_EXPIRES_IN!,
 jwt_refresh_expires_in:  process.env.JWT_REFRESH_EXPIRES_IN!,
  ssl : {
    storeId: process.env.SSL_STORE_ID,
    storePassword: process.env.SSL_STORE_PASSWORD,
    isLive: process.env.SSL_IS_LIVE === "true",
}
 }