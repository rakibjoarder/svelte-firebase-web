<script>
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';
	import { fade, slide, scale } from 'svelte/transition';
	import OrderItemStore from '../../../config/orderstore';
</script>

<div
	class="overflow-auto text-gray-900 text-center flex flex-col  {$OrderItemStore.products.length > 0
		? 'p-1'
		: 'p-10'}  md:p-10"
>
	{#if $OrderItemStore.products.length > 0}
		<button
			class="text-yellow-600  text-lg  p-1 font-semibold  hover:text-gray-700 cursor-pointer text-left"
			on:click={() => {
				goto('/views/orders');
			}}
		>
			<div class="flex justify-end">Back</div>
		</button>
	{/if}
	<div class=" lg:grid lg:grid-cols-4 lg:h-screen" in:scale>
		{#if $OrderItemStore.products.length > 0}
			<div class="lg:col-span-3 bg-white p-3">
				<div class="flex justify-between p-4 border-b-2 border-gray-200">
					<div class="text-gray-800 text-lg font-bold">OrderId# {$OrderItemStore.id}</div>
					<div class="text-gray-800 text-lg font-bold">
						{$OrderItemStore.products.length} items
					</div>
				</div>
				<div class="grid grid-cols-6 p-4 ">
					<div class=" text-sm text-gray-900 font-bold text-left col-span-5">Product Details</div>
					<div class="text-sm  text-gray-900  font-bold  text-right col-span-1 ">Price</div>
				</div>

				{#each $OrderItemStore.products as item}
					<div class="grid grid-cols-6 p-4 lg:divide-x-2 lg:divide-gray-300 ">
						<div
							class=" text-xs text-gray-700 font-semibold text-left col-span-5 flex flex-col items-start"
						>
							<div>
								{item.name}
								- {item.quantity + item.unit_name} x {item.count}
							</div>
						</div>

						<div class="flex  justify-end col-span-1 ">
							<div class=" text-xs  text-gray-700 font-semibold  text-center ">
								- ${item.price}
							</div>
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
							Items {$OrderItemStore.products.length}
						</div>
						<div class="text-white text-xs font-semibold">
							${$OrderItemStore.total}
						</div>
					</div>

					<div class="flex justify-between mt-3  border-gray-200 ">
						<div class="text-white text-xs font-semibold">Delivery Charge</div>
						<div class="text-white text-xs font-semibold">{$OrderItemStore.delivery_charge}</div>
					</div>
					<div class="flex justify-between mt-4  border-gray-100 border-b" />
					<div class="flex justify-between mt-1">
						<div class="text-white text-sm font-semibold">Total</div>
						<div class="text-white text-sm font-semibold">
							{$OrderItemStore.total + $OrderItemStore.delivery_charge}
						</div>
					</div>
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
</style>
