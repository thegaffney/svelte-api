import DB from '$lib/common/database.js'
import { json } from '@sveltejs/kit'
import jws from 'jws'

export async function POST({request}) {
    const auth_header = request.headers.get('Authorization')??''
    const api_key = auth_header.replace('Bearer ', '')
    
    let customer_id
    let valid = false
    
    const rows = await DB().query(`select * from data.customers where api_key = $1 and api_key is not null`, [api_key])
    if(rows[0]){
        customer_id = rows[0].customer_id
        valid = true
    }
    // API key missing or wrong
    if(!valid){
        return new Response(
            JSON.stringify({
                error:true,
                message:'Unauthorized'
            }), {status: 401, headers: {'Content-Type': 'application/json'}}
        )
    }

    // create JWT token
    const expiration = new Date()
    expiration.setHours(expiration.getHours()+1)

    const payload = JSON.stringify({
        expiration: expiration.getTime(), //timestamp
        customer_id,
    })

    const token = jws.sign({
        header: { alg:'HS256'},
        payload: payload,
        secret: api_key,
    })

    return json({token})
}