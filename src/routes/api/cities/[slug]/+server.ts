import { Client } from '$lib/common/client.js'

export async function PUT({request, params}) {
const token = request.headers.get('Authorization')??''
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

    // Update a city...
    const id = params.slug
    const data = request.json()
}