<script>
	import Cartstore from '../../../config/cartstore';
	import OrderHistoryStore from '../../../config/orderhistory';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import ArrowBack from '../components/icons/ArrowBack.svelte';
	import DecrementButton from '../components/icons/DecrementButton.svelte';
	import IncrementButton from '../components/icons/IncrementButton.svelte';
	import { scale, fade } from 'svelte/transition';
	import { collection, doc, addDoc, updateDoc, onSnapshot } from 'firebase/firestore';
	import Firestoredb from '../../../config/firebase';

	$: totalAmount = parseInt((browser && localStorage.getItem('totalAmount')) || 0);
	const onIncrement = async (item) => {
		Cartstore.update((currentItems) => {
			let copiedItems = [...currentItems];
			let selectedItem = copiedItems.find((poll) => poll.id === item.id);
			if (item.id === selectedItem.id) {
				selectedItem.count += 1;

				totalAmount += selectedItem.price;
			}
			localStorage.setItem('totalAmount', totalAmount ?? 0);
			localStorage.setItem('cartItems', JSON.stringify(copiedItems));

			return copiedItems;
		});
	};

	const onDecrement = async (item) => {
		Cartstore.update((currentItems) => {
			let copiedItems = [...currentItems];
			let selectedItem = copiedItems.find((product) => product.id === product.id);
			if (item.id === selectedItem.id) {
				if (selectedItem.count > 1) {
					selectedItem.count -= 1;
					totalAmount -= selectedItem.price;
				} else {
					totalAmount -= selectedItem.price;
					copiedItems = copiedItems.filter((product) => product.id != item.id);
				}
			}
			localStorage.setItem('totalAmount', totalAmount);
			localStorage.setItem('cartItems', JSON.stringify(copiedItems));
			return copiedItems;
		});
	};

	const onCheckOut = async () => {
		let products = [];

		//elemeneting unnecessary attributes from the response
		for (var i = 0; i < $Cartstore.length; i++) {
			products.push({
				id: $Cartstore[i].id,
				name: $Cartstore[i].name,
				count: $Cartstore[i].count,
				price: $Cartstore[i].price,
				image: $Cartstore[i].image,
				unit_name: $Cartstore[i].unit_name,
				quantity: $Cartstore[i].quantity
			});
		}
		//creating oder item.
		var order = {
			id: orderIdGenerator(),
			products: products,
			total: totalAmount,
			date: new Date().toISOString().slice(0, 10),
			delivery_charge: 40,
			order_status: 'pending'
		};
		//saving order history on both firebase on store.
		let orderHistory = JSON.parse(browser && localStorage.getItem('orders')) || [];
		orderHistory.push(order);
		localStorage.setItem('orders', JSON.stringify(orderHistory));
		$OrderHistoryStore = orderHistory;
		let ref = collection(Firestoredb, 'orders');
		addDoc(ref, order);
		location.href = '#my-modal';
	};

	//for unique order id
	function orderIdGenerator() {
		var result, i, j;
		result = '';
		for (j = 0; j < 12; j++) {
			if (j == 8 || j == 12 || j == 16 || j == 20) result = result + '-';
			i = Math.floor(Math.random() * 16)
				.toString(16)
				.toUpperCase();
			result = result + i;
		}
		return result;
	}

	const onBuyMoreButton = async () => {
		goto('/views/products');
		localStorage.removeItem('cartItems');
		localStorage.removeItem('totalAmount');
		await wait();
		$Cartstore = {};
	};

	const wait = () => new Promise((res) => setTimeout(res, 2000));
</script>

<div
	class="overflow-auto text-gray-900 text-center flex flex-col  {$Cartstore.length > 0
		? 'p-1'
		: 'p-10'}  md:p-10"
>
	{#if $Cartstore.length > 0}
		<button
			class="text-yellow-600  text-lg  p-1 font-semibold  hover:text-gray-700 cursor-pointer text-left"
			on:click={() => {
				goto('/views/products');
			}}
		>
			<div class="flex justify-end">
				<ArrowBack />Continue Shopping
			</div>
		</button>
	{/if}
	<div class=" lg:grid lg:grid-cols-4 lg:h-screen">
		{#if $Cartstore.length > 0}
			<div class="lg:col-span-3 bg-white p-3">
				<div class="flex justify-between p-4 border-b-2 border-gray-200">
					<div class="text-gray-800 text-lg font-bold">Shopping Cart</div>
					<div class="text-gray-800 text-lg font-bold">
						{$Cartstore.length} items
					</div>
				</div>
				<div class="grid grid-cols-6 p-4 ">
					<div class=" text-sm text-gray-900 font-bold text-left col-span-5">Product Details</div>
					<div class="text-sm  text-gray-900  font-bold  text-center col-span-1 ">Action</div>
				</div>

				{#each $Cartstore as item}
					<div class="grid grid-cols-6 p-4 lg:divide-x-2 lg:divide-gray-300 ">
						<div
							class=" text-xs text-gray-700 font-semibold text-left col-span-5 flex flex-col items-start"
						>
							<div>
								{item.name}
								- {item.quantity + item.unit_name}
							</div>
							<div class=" text-xs  text-gray-700 font-semibold  text-center ">
								- ${item.price}
							</div>
						</div>

						<div class="flex  justify-end col-span-1 ">
							<button class="cursor-pointer" on:click={() => onDecrement(item)}>
								<DecrementButton /></button
							>

							<input
								class="mx-2 border text-center w-6 text-sm rounded-md bg-gray-50"
								type="text"
								value={item.count}
								disabled
							/>

							<button class="cursor-pointer" on:click={() => onIncrement(item)}>
								<IncrementButton />
							</button>
						</div>
					</div>
				{/each}
			</div>

			<div class="lg:col-span-1 bg-gray-800 pt-5 p-4">
				<div>
					<div class="pt-4 pb-4 border-b border-gray-100 text-left">
						<div class="text-white text-sm font-bold">Order Summary</div>
					</div>
					<div class="flex justify-between mt-2  border-gray-200 mb-2">
						<div class="text-white text-xs font-semibold">
							Items {$Cartstore.length}
						</div>
						<div class="text-white text-xs font-semibold">
							${totalAmount}
						</div>
					</div>

					<div class="flex justify-between mt-3  border-gray-200 ">
						<div class="text-white text-xs font-semibold">Delivery Charge</div>
						<div class="text-white text-xs font-semibold">$40</div>
					</div>
					<div class="flex justify-between mt-4  border-gray-100 border-b" />
					<div class="flex justify-between mt-1">
						<div class="text-white text-sm font-semibold">Total</div>
						<div class="text-white text-sm font-semibold">
							${totalAmount + 40}
						</div>
					</div>

					<button
						class="bg-yellow-600 w-3/5 md:w-2/5 lg:w-full text-white mt-6 text-sm font-semibold p-1 rounded shadow-xl ho:bg-green-900 cursor-pointer"
						on:click={onCheckOut}>CHECK OUT</button
					>
				</div>
			</div>
		{:else}
			<div class="m-auto col-span-5  bg-white pb-28  md:pb-8 rounded-3xl  w-full " in:fade>
				<img
					src="https://www.apnashopping.in/assets/img/payment/Empty-Cart.jpg"
					alt=""
					class="rounded-xl"
				/>
				<div class="font-bold text-sm pt-4 text-gray-600 ">
					You have no items in your shopping cart.
				</div>
				<div class="font-bold text-sm text-gray-600">Let's go by something.</div>
				<button
					class="bg-yellow-600 px-14 text-white mt-6 text-sm font-semibold p-1 rounded-2xl shadow-xl hover:bg-green-900 cursor-pointer"
					on:click={() => goto('/views/products')}
					>Continue Shopping
				</button>
			</div>
		{/if}
	</div>
</div>

<div id="my-modal" class="modal ">
	<div class="modal-box bg-gray-100 flex flex-col justify-center items-center">
		<img
			src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBU_CuTVFbqZyLmtynDk55v3FQhcuHjeM0HYwO0JVdLXGe1NymP7YQ58tCDds3DSFJYok&usqp=CAU"
			alt=""
			class="w-24 pb-4"
		/>
		<p class="text-green-700 pb-2 font-bold text-xl">Order Successfully placed</p>
		<p class="text-gray-700 ">Estimated Delivery time : Approximately 1 to 24 hours</p>
		<div class="modal-action ">
			<button on:click={onBuyMoreButton} class="btn btn-primary bg-gray-900 hover:bg-yellow-500"
				>Buy More</button
			>
		</div>
	</div>
</div>

<style>
</style>
