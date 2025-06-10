<script lang="ts">

    let {form, data} = $props()
    // export let form

    let apiKey = $derived.by(()=>{
        if(form?.apiKey){
            return form?.apiKey
        } else if(data.apiKey){
            return '****************************************'
        } else { 
            return ''
        }
    })
</script>
<h1>API Settings</h1>
<form method="post">
    <input type="text" class="w-[320px]" placeholder="Press Generate API Key below" disabled value={apiKey}/>
    <div class="opacity-50 text-xs  mb-2">Warning: Generating a new API will invalidate previous ones.</div>
    <button type="submit">Generate API Key</button>
</form>
<div>
    <div class="dropdownRow">
        <div class="text-xl">API Documentation</div>
        <div class="dropdownContents">

            <div class="font-bold mt-4">Auth</div>
            <div class="bg-green-100 border border-green-600 p-1.5 rounded-lg">
                <div class=" flex justify-between items-center">
                    <div>
                        <span class="bg-green-600 text-white p-1 px-3">POST</span> 
                        /auth
                    </div>
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-caret-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-.118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z" /></svg>
                </div>
                <div class="text-sm" >
                    <p>
                        Generates a new access token. Tokens expire in 1 hour.<br>
                        Use returned token in future API requests.
                    </p>
                    <h4 class="font-bold">Header(s)</h4>
                    <div class="ml-4">
                        <div>Authorization: Bearer {`{api key}`}</div>
                        <div>Content-Type: application/json</div>
                    </div>
                    <h4 class="font-bold">Response</h4>
                    <pre class="bg-zinc-600 text-white p-2 text-xs">{`{token:token}`}</pre>
                </div>
            </div>

            <div class="font-bold mt-4">Cities</div>
            <div class="bg-blue-100 border border-blue-600 p-1.5 rounded-lg mb-2">
                <div class=" flex justify-between items-center">
                    <div>
                        <span class="bg-blue-600 text-white p-1 px-3">GET</span> 
                        /cities
                    </div>
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-caret-down"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 9c.852 0 1.297 .986 .783 1.623l-.076 .084l-6 6a1 1 0 0 1 -1.32 .083l-.094 -.083l-6 -6l-.083 -.094l-.054 -.077l-.054 -.096l-.017 -.036l-.027 -.067l-.032 -.108l-.01 -.053l-.01 -.06l-.004 -.057v-.118l.005 -.058l.009 -.06l.01 -.052l.032 -.108l.027 -.067l.07 -.132l.065 -.09l.073 -.081l.094 -.083l.077 -.054l.096 -.054l.036 -.017l.067 -.027l.108 -.032l.053 -.01l.06 -.01l.057 -.004l12.059 -.002z" /></svg>
                </div>
                <div class="text-sm" >
                    <p>
                        Returns a list of all cities.<br>
                        When a 401 (Not Authorized) response is received, use the /auth/ endpoint to get a new token.
                    </p>
                    <h4 class="font-bold">Header(s)</h4>
                    <div class="ml-4">
                        <div>Authorization: Bearer {`token`}</div>
                        <div>Content-Type: application/json</div>
                    </div>
                    <h4 class="font-bold">Response</h4>
                    <pre class="bg-zinc-600 text-white p-2 text-xs">{`[
  {
    "id": 1,
    "state_id": 2,
    "city": "Adak",
  }
]`}</pre>
                </div>
            </div>
            <div class="bg-orange-100 border border-orange-600 p-1.5 rounded-lg">
                <div class=" flex justify-between items-center">
                    <div>
                        <span class="bg-orange-600 text-white p-1 px-3">PUT</span> 
                        /cities/{`{id}`}
                    </div>
                    <svg  xmlns="http://www.w3.org/2000/svg"  width="18"  height="18"  viewBox="0 0 24 24"  fill="currentColor"  class="icon icon-tabler icons-tabler-filled icon-tabler-caret-up"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11.293 7.293a1 1 0 0 1 1.32 -.083l.094 .083l6 6l.083 .094l.054 .077l.054 .096l.017 .036l.027 .067l.032 .108l.01 .053l.01 .06l.004 .057l.002 .059l-.002 .059l-.005 .058l-.009 .06l-.01 .052l-.032 .108l-.027 .067l-.07 .132l-.065 .09l-.073 .081l-.094 .083l-.077 .054l-.096 .054l-.036 .017l-.067 .027l-.108 .032l-.053 .01l-.06 .01l-.057 .004l-.059 .002h-12c-.852 0 -1.297 -.986 -.783 -1.623l.076 -.084l6 -6z" /></svg>
                </div>
            </div>
        </div>
    </div>
</div>