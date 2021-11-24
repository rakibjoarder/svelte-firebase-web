<script context="module">
	import Cartstore from '../../../config/cartstore';
	import { browser } from '$app/env';
	import { fade, slide, scale } from 'svelte/transition';

	//fetching products from api
	export const load = async ({ fetch }) => {
		try {
			const res = await fetch('/api/product');
			const productList = await res.json();

			//to check already added products on cart
			let cartItems = JSON.parse(browser && localStorage.getItem('cartItems')) || [];

			for (var i = 0; i < productList.length; i++) {
				let selectedItem = cartItems.find((product) => product.id === productList[i].id);
				if (selectedItem) {
					productList[i]['count'] = selectedItem.count;
				} else {
					productList[i]['count'] = 0;
				}
			}

			return {
				props: {
					productList
				}
			};
		} catch (e) {
			console.log(e);
		}
	};
</script>

<script>
	import Crasoul from '../components/Crasoul.svelte';
	import CartIcon from '../components/icons/CartIcon.svelte';

	export let productList;

	$: productList = productList;

	var totalAmount = 0;

	//we will save cart item on CartStore
	const onProductAdded = async (item) => {
		let cartItems = JSON.parse(browser && localStorage.getItem('cartItems')) || [];
		totalAmount = JSON.parse(browser && localStorage.getItem('totalAmount')) || 0;
		item.count = 1;
		productList = productList;
		totalAmount += item.price;
		cartItems.push(item);
		localStorage.setItem('cartItems', JSON.stringify(cartItems));
		localStorage.setItem('totalAmount', totalAmount);
		await Cartstore.update((item) => {
			return cartItems;
		});
	};
</script>

<div class="px-2 pt-1 md:px-8"><Crasoul /></div>
<div class="relative px-2 md:px-8 py-4">
	<a
		class="absolute right-0 {$Cartstore.length == 0
			? 'bg-gray-900'
			: 'bg-green-900 animate-bounce'} rounded-3xl p-2 right-14 invisible md:visible "
		href="/views/products/cart"><CartIcon /></a
	>
	<div class="text-center font-bold text-xl md:text-2xl pb-5 text-gray-900">Product List</div>

	<div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 " in:scale>
		{#each productList as item}
			<div class="card grid grid-rows-4 relative  bg-black">
				<div
					class="absolute bg-gray-700 top-4 px-2 rounded-r-3xl text-xs font-bold shadow-md drop-shadow-md text-white"
				>
					${item.price}
				</div>
				<div class="row-span-2">
					<img
						src="https://ebazar247.s3-ap-southeast-1.amazonaws.com/{item.image}"
						alt="stew"
						class="h-24 md:h-28 m-auto "
					/>
				</div>
				<p class="block text-gray-500 text-xs p-4 row-span-1">
					{item.name} - {item.quantity}
					{item.unit_name}
				</p>
				<button
					class=" {item.count === 0
						? 'bg-gray-900'
						: 'bg-green-700'} text-white  row-span-1 rounded-3xl h-7 text-xs w-28 m-auto hover:bg-green-700 shadow-2xl "
					on:click={() => {
						if (item.count === 0) {
							onProductAdded(item);
						}
					}}
				>
					{item.count === 0 ? 'Add To Cart' : '✓ Added To Cart'}</button
				>
			</div>
		{/each}
	</div>
</div>

<style>
	.card {
		@apply rounded-xl md:h-60 h-64    m-2  bg-white border-gray-200 shadow-sm overflow-hidden text-center pt-5;
	}
</style>
