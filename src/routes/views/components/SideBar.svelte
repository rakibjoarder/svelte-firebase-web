<script>
	import Cartstore from '../../../../src/config/cartstore';
	const showMenuItem = () => {
		if (document.querySelector('#ul').classList.contains('navul')) {
			document.querySelector('#ul').classList.remove('navul');
		} else {
			document.querySelector('#ul').classList.add('navul');
		}
	};
	let navItem = 'User';

	function setNavValue(name) {
		navItem = name;
	}
</script>

<nav class="md:fixed">
	<div>
		<div class=" relative flex justify-between items-center">
			<h1
				class="font-semibold uppercase p-4 pb-2 border-b md:border-gray-50 bg-gradient-to-tr from-yellow-800 to-yellow-200 text-transparent bg-clip-text"
			>
				Svelte
			</h1>
			<a
				class="absolute right-12 {$Cartstore.length == 0
					? 'bg-gray-900'
					: 'bg-green-900 animate-bounce'} rounded-3xl p-2 right-11 visible md:hidden "
				href="/views/products/cart"
				><svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4 text-white  "
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
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 mr-4 cursor-pointer md:hidden text-white"
				id="menu"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				on:click={showMenuItem}
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</div>
	</div>
	<ul class="navul" id="ul">
		<li class="text-gray-700 font-bold py-1">
			<a
				href="/views/users"
				class={navItem === 'User'
					? 'border-yellow-500' + ' px-4 flex justify-end border-r-4 animate-pulse '
					: 'border-white-500' + ' px-4 flex justify-end border-r-4 '}
				on:click={() => setNavValue('User')}
			>
				<span class="text-lg text-white mr-2">User</span>
				<span class="text-lg text-white ">👥</span>
			</a>
		</li>
		<li class="py-1">
			<a
				href="/views/products"
				class={navItem === 'Product'
					? 'border-yellow-500' + ' px-4 flex justify-end border-r-4 animate-pulse '
					: 'border-white-500' + ' px-4 flex justify-end border-r-4  '}
				on:click={() => setNavValue('Product')}
			>
				<span class="text-lg text-white mr-2">Product</span>
				<span class="text-lg text-white ">📦</span>
			</a>
		</li>
		<li class="py-1">
			<a
				href="/views/products/cart"
				class={navItem === 'Cart'
					? 'border-yellow-500' + ' px-4 flex justify-end border-r-4 animate-pulse  '
					: 'border-white-500' + ' px-4 flex justify-end border-r-4  '}
				on:click={() => setNavValue('Cart')}
			>
				<span class="text-lg text-white mr-2">Cart</span>
				<span class="text-lg text-white ">🛒</span>
			</a>
		</li>
		<li class="py-1">
			<a
				href="/views/orders"
				class={navItem === 'Orders'
					? 'border-yellow-500' + ' px-4 flex justify-end border-r-4 animate-pulse  '
					: 'border-white-500' + ' px-4 flex justify-end border-r-4  '}
				on:click={() => setNavValue('Orders')}
			>
				<span class="text-lg text-white mr-2">Orders</span>
				<span class="text-lg text-white ">📜</span>
			</a>
		</li>
	</ul>
</nav>

<style>
	.navul {
		@apply text-sm mt-6  md:block items-center flex  justify-center hidden;
	}
</style>
