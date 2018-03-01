interface mongoConfig {
    user: String,
    pass: String | null,
    db: String,
    host: String,
    port: Number,
    authMechanism: String | null
  }
  
export const mongoConfig: mongoConfig = {
    user: 'localhost' ,
    pass: null,
    db: 'pizza_planet',
    host: '',
    port: 27017,
    authMechanism: null
}
  