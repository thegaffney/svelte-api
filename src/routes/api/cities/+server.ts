import { Client } from '$lib/client.js'
import DB from '$lib/common/database.js'
import { json } from '@sveltejs/kit'

export async function GET({request}){
    const token = request.headers.get('Authorization')

    /*
    Check payload for customer id
    Get API key from database
    Check expiration
    Validate signature...
    */

    const valid = await Client().validate(token??'')
    if(!valid){
        return new Response(
            JSON.stringify({
                error:true,
                message:'Unauthorized'
            }), {status: 401, headers: {'Content-Type': 'application/json'}}
        )
    }

    // valid...
    const rows = await DB().query(` select * from data.cities `)
    return json(rows)
}