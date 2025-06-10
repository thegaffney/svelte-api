
import jws from 'jws'
import DB from './database'

export const Client = () => {
    const api = {
        /*
            Checks payload for customer_id
            Gets API key from database
            Checks expiration
            Validates signature
        */
        validate: async (token: string): Promise<boolean> => {
            try{
                let apiKey = ''

                token = token.replace('Bearer ', '')
                const tokenDecoded = jws.decode(token)
                const payload = JSON.parse(tokenDecoded?.payload)
 
                const expiration = payload.expiration
                const customer_id = payload.customer_id
                if(!payload || new Date() > new Date(expiration)){
                    return false
                }
                
                // get api key for customer
                const rows = await DB().query('select api_key from data.customers where customer_id = $1', [customer_id])
                if(!rows[0]){
                    return false // couldn't find customer by ID
                } else {
                    apiKey = rows[0].api_key
                }
                // verify signature
                
                return jws.verify(token,'HS256',apiKey)
            } catch {
                return false
            }

        },
    }

    return api
}