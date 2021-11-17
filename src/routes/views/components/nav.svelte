<script>
	const showMenuItem = () => {
		if (document.querySelector('#ul').classList.contains('hidden')) {
			document.querySelector('#ul').classList.remove('hidden');
		} else {
			document.querySelector('#ul').classList.add('hidden');
		}
	};
	let navItem = 'Home';

	function setNavValue(name) {
		navItem = name;
	}
</script>

<nav class="md:fixed">
	<div>
		<div class="flex justify-between items-center">
			<h1 class="font-bold uppercase p-4 border-b md:border-gray-50">Svelte</h1>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="h-6 w-6 mr-4 cursor-pointer md:hidden "
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
	<ul class="text-sm mt-6  md:block items-center flex  justify-center hidden " id="ul">
		<li class="text-gray-700 font-bold py-1">
			<a
				href="/views/users"
				class={navItem === 'Home'
					? 'border-red-500' + ' px-4 flex justify-end border-r-4 animate-pulse '
					: 'border-white-500' + ' px-4 flex justify-end border-r-4 '}
				on:click={() => setNavValue('Home')}
			>
				<span>Home</span>
				<svg
					class="w-5 ml-2"
					fill="none"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					stroke="currentColor"
					viewBox="0 0 24 24"
					><path
						d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
					/></svg
				>
			</a>
		</li>
		<li class="py-1">
			<a
				href="/asd"
				class={navItem === 'About'
					? 'border-red-500' + ' px-4 flex justify-end border-r-4 animate-pulse '
					: 'border-white-500' + ' px-4 flex justify-end border-r-4  '}
				on:click={() => setNavValue('About')}
			>
				<span>About</span>
				<svg
					class="w-5 ml-2"
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
				href="/asd"
				class={navItem === 'Contact'
					? 'border-red-500' + ' px-4 flex justify-end border-r-4 animate-pulse '
					: 'border-white-500' + ' px-4 flex justify-end border-r-4  '}
				on:click={() => setNavValue('Contact')}
			>
				<span>Contact</span>
				<svg
					class="w-5 ml-2"
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
