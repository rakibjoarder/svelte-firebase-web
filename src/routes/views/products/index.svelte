<script context="module">
	import Cartstore from '../../../config/cartstore';
	import { browser } from '$app/env';

	import { onDestroy } from 'svelte';
	export const load = async ({ fetch }) => {
		try {
			const res = await fetch('/api/product');
			const productList = await res.json();
			return {
				props: {
					productList
				}
			};
		} catch (e) {
			console.log(e);
		}
	};

	const onProductAdded = async (item) => {
		let cartItems = [];
		if (browser && localStorage.getItem('cartItems')) {
			cartItems = JSON.parse(browser && localStorage.getItem('cartItems')) || [];
		}
		cartItems.push(item);
		localStorage.setItem('cartItems', JSON.stringify(cartItems));
		await Cartstore.update((item) => {
			return [item, ...cartItems];
		});
	};
</script>

<script>
	export let productList;
</script>

<div class="relative">
	<a class="absolute right-0 bg-gray-900 rounded-3xl p-2" href="/views/products/cart"
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
				d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
			/>
		</svg></a
	>
	<div class="text-center font-bold text-2xl pb-5 text-gray-900">Product List</div>
	<div class="md:grid md:grid-cols-3 lg:grid-cols-5">
		{#each productList as item}
			<div class="card grid grid-rows-4">
				<div class="row-span-2">
					<img
						src="https://ebazar247.s3-ap-southeast-1.amazonaws.com/{item.image}"
						alt="stew"
						class="h-28 m-auto "
					/>
				</div>
				<!-- <p>{item.price}</p> -->
				<p class="block text-gray-500 text-xs p-4 row-span-1">
					{item.name} - {item.quantity}
					{item.unit_name}
				</p>
				<button
					class="bg-gray-900 row-span-1 rounded-3xl h-7 text-xs w-28 m-auto hover:bg-green-700 shadow-2xl"
					on:click={() => {
						onProductAdded(item);
					}}
				>
					Add To Cart</button
				>
			</div>
		{/each}
	</div>
</div>

<style>
	.card {
		@apply rounded-xl h-60    md:m-2  m-7 bg-white border-gray-200 shadow-sm overflow-hidden text-center pt-5;
	}
</style>
