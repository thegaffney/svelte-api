import DB from "$lib/common/database";
import type { Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    // get ID of client/customer/user, from login?
    const customer_id = 1

    const rows = await DB().query(`select api_key from data.customers where customer_id = $1`, [customer_id])

    let api_key = ''
    if(rows[0] && rows[0].api_key){
        api_key = 'YES' // don't send real key
    }
    return {
        api_key
    }
}

export const actions = {
    default: async () => {
        // get ID of client/customer/user, from login?
        const customer_id = 1
        const api_key = crypto.randomUUID()

        await DB().query(`update data.customers set api_key = $1 where customer_id = $2`, [api_key, customer_id])

        return {
            api_key
        }
    }

} satisfies Actions