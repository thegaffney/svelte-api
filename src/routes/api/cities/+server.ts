import { Client } from '$lib/common/client.js'
import DB from '$lib/common/database.js'
import { json } from '@sveltejs/kit'

export async function GET({request}) {
    const token = request.headers.get('Authorization')
    /*
    Checks payload for customer_id
    Gets API key from database
    Checks expiration
    Validates signature
    */
   
    const valid = await Client().validate(token??'')
    if(!valid){
        return new Response(
            JSON.stringify({ 
                error: true, 
                message: 'Unauthorized',
            }), {status: 401, headers: {'Content-Type': 'application/json'}}
        )
    }

    /// valid token
    const rows = await DB().query('select * from data.cities')
    return json(rows)
}
