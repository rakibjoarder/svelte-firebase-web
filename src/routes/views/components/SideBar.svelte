<script>
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
		<div class="flex justify-between items-center">
			<h1
				class="font-semibold uppercase p-4 pb-2 border-b md:border-gray-50 bg-gradient-to-tr from-yellow-800 to-yellow-200 text-transparent bg-clip-text"
			>
				Svelte
			</h1>
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
				<span class="text-sm text-white">User</span>

				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="w-5 ml-2 text-white"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
					/>
				</svg>
			</a>
		</li>
		<li class="py-1">
			<a
				href="/views/products"
				class={navItem === 'Product'
					? 'border-yellow-500' + ' px-4 flex justify-end border-r-4 animate-pulse '
					: 'border-white-500' + ' px-4 flex justify-end border-r-4  '}
				on:click={() => setNavValue('About')}
			>
				<span class="text-sm text-white">About</span>
				<svg
					class="w-5 ml-2 text-white"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					stroke="currentColor"
					viewBox="0 0 24 24"
					><path
						d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
					/></svg
				>
			</a>
		</li>
		<li class="py-1">
			<a
				href="/views/users"
				class={navItem === 'Contact'
					? 'border-yellow-500' + ' px-4 flex justify-end border-r-4 animate-pulse '
					: 'border-white-500' + ' px-4 flex justify-end border-r-4  '}
				on:click={() => setNavValue('Contact')}
			>
				<span class="text-sm text-white">Contact</span>
				<svg
					class="w-5 ml-2 text-white"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					stroke="currentColor"
					viewBox="0 0 24 24"
					><path
						d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
					/></svg
				>
			</a>
		</li>
	</ul>
</nav>

<style>
	.navul {
		@apply text-sm mt-6  md:block items-center flex  justify-center hidden;
	}
</style>
