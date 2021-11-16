<script>
	import { page } from '$app/stores';
	import logo from './svelte-logo.svg';
</script>

<header>
	<nav class="flex bg-red-500 justify-between items-center pr-2">
		<!-- <svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg> -->
		<div>
			<a href="https://kit.svelte.dev">
				<img class="w-10 p-2" src={logo} alt="SvelteKit" />
			</a>
		</div>
		<ul class="flex w-32 justify-evenly">
			<li class:active={$page.path === '/'} class="text-white">
				<a sveltekit:prefetch href="/">Home</a>
			</li>
			<li
				class:active={$page.path === '/views/users/add_person'}
				class="text-white border rounded-b-sm"
			>
				<a sveltekit:prefetch href="/views/users/add_person">Add User</a>
			</li>
		</ul>
		<!-- <svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg> -->
	</nav>
</header>
