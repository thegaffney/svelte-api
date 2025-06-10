import DB from "$lib/common/database";
import type { Actions, PageServerLoad } from "./$types"

export const load: PageServerLoad = async () => {
    // have access to the customer_id somehow
    const customer_id = 1
    const rows = await DB().query(`select api_key from data.customers where customer_id = $1`, [customer_id])
 
    let apiKey = ''
    if(rows[0]){
        apiKey = 'YES' // DONT SEND KEY!
    }
    return { 
        apiKey
    }
}

export const actions = {
	default: async () => {
        // have access to the customer_id somehow
        const customer_id = 1
		const apiKey = crypto.randomUUID()
        await DB().query('update data.customers set api_key = $1 where customer_id = $2', [apiKey, customer_id])
        return {
            apiKey
        }
	}
} satisfies Actions;