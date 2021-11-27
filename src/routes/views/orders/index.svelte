<script>
	import { goto } from '$app/navigation';
	import Firestoredb from '../../../config/firebase';
	import { collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';
	import { scale } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';
	import OrderItemStore from '../../../config/orderstore';
	import emptyOrder from '../../../assets/images/empty-order.png';
	import { paginate, DarkPaginationNav } from 'svelte-paginate';
	let ref = collection(Firestoredb, 'orders');
	let OrderHistoryStore = [];
	var unsub;
	let items = [];
	onMount(() => {
		//getting user orders from firebase
		console.log('onMount');
		unsub = onSnapshot(ref, (snapshot) => {
			let results = [];
			snapshot.docs.forEach((doc) => {
				results.push({ ...doc.data(), id: doc.id });
			});
			OrderHistoryStore = results;
			items = results;
		});
	});
	let currentPage = 1;
	let pageSize = 6;
	$: paginatedItems = paginate({ items, pageSize, currentPage });
	onDestroy(() => {});

	const onBuyMoreButton = async () => {
		goto('/views/products');
	};
</script>

<div class="text-gray-900 text-center flex flex-col p-10  md:px-20 md:w-3/4 m-auto">
	<div class=" md:text-2xl  text-gray-900 font-bold  text-center p-2">Order History</div>

	<div class=" lg:h-screen overflow-y-auto ">
		{#if OrderHistoryStore.length > 0}
			<div class=" p-3 h-screen rounded-xl">
				{#each paginatedItems as item}
					<div
						class="flex justify-between p-4  m-2 bg-white rounded-lg shadow-sm cursor-pointer"
						on:click={() => {
							$OrderItemStore = item;
							goto('/views/orders/OrderHistory');
						}}
					>
						<div class=" text-sm text-gray-700 font-bold text-left ">
							<div>
								OrderId# {item.id}
							</div>
							<div class=" text-lg  text-yellow-500 font-bold  text-left mt-0.5">
								${item.total + item.delivery_charge}
							</div>
						</div>
						<div class=" text-gray-700 font-bold text-sm text-left ">
							<div>
								{item.date}
							</div>
							<div
								class=" text-xs  text-white font-bold  {item.order_status === 'pending'
									? 'bg-red-500'
									: 'bg-green-700'} text-center rounded-lg px-1 py-0.5 mt-2"
							>
								{item.order_status}
							</div>
						</div>
					</div>
				{/each}
				<DarkPaginationNav
					totalItems={items.length}
					{pageSize}
					{currentPage}
					limit={1}
					showStepOptions={true}
					on:setPage={(e) => (currentPage = e.detail.page)}
				/>
			</div>
		{:else}
			<div class="m-auto  bg-white pb-28  md:pb-8 rounded-3xl  w-full " in:scale>
				<img src={emptyOrder} alt="" class=" h-64 md:w-80 m-auto mt-6 pt-6 " />
				<div class="font-bold text-sm pt-4 text-gray-600 ">You have not place any orders</div>
				<div class="font-bold text-sm text-gray-600">Let's go by something.</div>
				<button
					class="bg-yellow-600 px-14 text-white mt-6 text-sm font-semibold p-1 rounded-2xl shadow-xl hover:bg-green-900 cursor-pointer"
					on:click={() => goto('/views/products')}
					>Order Now
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
