<script>
	import OrderHistoryStore from '../../../config/orderhistory';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import ArrowBack from '../components/icons/ArrowBack.svelte';
	import DecrementButton from '../components/icons/DecrementButton.svelte';
	import IncrementButton from '../components/icons/IncrementButton.svelte';
	import { fade, slide, scale } from 'svelte/transition';

	const onBuyMoreButton = async () => {
		goto('/views/products');
	};
</script>

<div class="overflow-auto text-gray-900 text-center flex flex-col p-10  md:px-20">
	<div class=" lg:h-screen">
		{#if $OrderHistoryStore.length > 0}
			<div class=" p-3 h-screen rounded-xl">
				<div class=" text-lg  text-gray-900 font-bold  text-center mt-0.5">Order History</div>
				{#each $OrderHistoryStore as item}
					<div class="flex justify-between p-4  m-2 bg-white rounded-lg shadow-sm">
						<div class=" text-sm text-gray-700 font-bold text-left ">
							<div>
								OrderId#{item.delivery_charge}
							</div>
							<div class=" text-lg  text-yellow-500 font-bold  text-left mt-0.5">
								${item.total}
							</div>
						</div>

						<div class=" text-gray-700 font-bold text-sm text-left ">
							<div>
								{item.date}
							</div>
							<div
								class=" text-xs  text-white font-bold  bg-gray-700 text-center rounded-lg p-0.5 mt-2"
							>
								{item.order_status}
							</div>
						</div>
					</div>
				{/each}
			</div>
		{:else}
			<div class="m-auto  bg-white pb-28  md:pb-8 rounded-3xl  w-full " in:scale>
				<img
					src="https://i.ibb.co/qrNxD2N/e8d986243b69af8a5323e3a4c41402b3.png"
					alt=""
					class=" w-64 md:w-80 m-auto mt-6 pt-6 "
				/>
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
