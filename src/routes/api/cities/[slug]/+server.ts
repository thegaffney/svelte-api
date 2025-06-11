import { Client } from "$lib/client"

export async function PUT({request, params}){
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
    const id = params.slug // city ID
    const data = request.json() // body data
    // Do other things...
}