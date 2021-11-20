<script context="module">
	import { each } from 'svelte/internal';
	import Cartstore from '../../../config/cartstore';
</script>

<div class="m-auto h-screen overflow-auto text-gray-900 text-center relative">
	<a class="absolute right-0 bg-gray-900 rounded-3xl p-2 text-white" href="/views/products"
		><svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M10 19l-7-7m0 0l7-7m-7 7h18"
			/>
		</svg></a
	>
	{#each $Cartstore as item}
		<div class="text-red-900">{item.name}</div>
	{/each}
</div>

<style>
</style>
