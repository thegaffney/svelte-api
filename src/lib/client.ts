import jws from 'jws'
import DB from './common/database'

export const Client = () => {
    const api = {
        validate: async (token: string): Promise<boolean> => {
            try {
                let api_key = ''

                token = token.replace('Bearer ', '')
                const token_decoded = jws.decode(token)
                const payload = JSON.parse(token_decoded?.payload)

                const expiration = payload.expiration
                const customer_id = payload.customer_id

                if(!payload || new Date() > new Date(expiration)){
                    return false // not valid
                }

                // get api key from customer
                const rows = await DB().query(`select api_key from data.customers where customer_id = $1`, [customer_id])
                if(!rows[0]){
                    return false // could not find customer by ID
                } else {
                    api_key = rows[0].api_key
                }

                //verify signature
                return jws.verify(token, 'HS256', api_key)

                
            } catch {
                return false
            }
        }
    }
    return api
}