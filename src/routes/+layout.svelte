<script lang="ts">
  	import FakeNavbar from '$lib/components/FakeNavbar.svelte';
	import '../app.css';
	
	let { children } = $props();
</script>
<div class="h-svh w-full bg-zinc-600 flex items-center justify-center">
	<div class="w-4/5 h-9/10 rounded-lg flex shadow-2xl">
		<FakeNavbar />
		<div class="p-6 w-full bg-zinc-200">
			{@render children()}
		</div>
	</div>
</div>
