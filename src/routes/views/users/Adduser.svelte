<script>
	import { fade, slide, scale } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import Firestoredb from '../../../config/firebase';
	import { collection, doc, addDoc, updateDoc, onSnapshot } from 'firebase/firestore';
	let dispatch = createEventDispatcher();

	// firestore reference
	let ref = collection(Firestoredb, 'users');

	const fields = {
		name: '',
		age: '',
		gender: ''
	};
	let valid = true;

	let errors = {
		name: '',
		age: '',
		gender: ''
	};

	const onSubmit = async () => {
		valid = true;
		if (fields.name.trim().length == 0) {
			valid = false;
			errors.name = 'Please Enter Name';
		} else {
			errors.name = '';
		}

		if (fields.age == 0) {
			valid = false;
			errors.age = 'Please Enter Age';
		} else {
			errors.age = '';
		}

		if (fields.gender.trim().length == 0) {
			valid = false;
			errors.gender = 'Please Select Gender';
		} else {
			errors.gender = '';
		}

		if (valid == true) {
			const person = {
				name: fields.name,
				age: fields.age,
				gender: fields.gender,
				id: Math.random()
			};

			// add user  to store
			await PersonStore.update((currentPerson) => {
				return [person, ...currentPerson];
			});
			// add user  to firebase
			await addDoc(ref, person);

			dispatch('addPerson', person);
		}
	};
</script>

<main class="flex justify-center items-center h-screen">
	<div
		class="flex flex-col items-center bg-gray-100  p-14  rounded  shadow-xl justify-items-center md:w-3/5 "
		in:scale
	>
		<p class="text-gray-700  p-1 font-semibold text-xl border-b-2 mb-6 border-gray-600">Add User</p>

		<form
			on:submit|preventDefault={onSubmit}
			class="flex justify-center flex-col bg-gray-100 md:w-4/6 "
		>
			<input class="input" type="text" name="Name" bind:value={fields.name} placeholder="Name" />
			{#if valid == false}
				<div class="error">{errors.name}</div>
			{/if}
			<input class="input" type="number" name="Age" bind:value={fields.age} placeholder="Age" />
			{#if valid == false}
				<div class="error">{errors.age}</div>
			{/if}
			<select class="input" bind:value={fields.gender}>
				<option class="" value="">Select Gender</option>
				<option value="Male">Male</option>
				<option value="Female">Female</option>
			</select>
			{#if valid == false}
				<div class="error">{errors.gender}</div>
			{/if}
			<br />
			<div class="flex justify-around flex-row">
				<input class="btn flex-grow" type="submit" /><br />
				<a
					class="  hover:bg-red-700 text-white font-bold py-1 px-4 rounded-full hover:shadow-md cursor-pointer bg-red-500 flex-grow ml-4 text-sm text-center"
					href="/views/users"
					>Back<a />
				</a>
			</div>
		</form>
	</div>
</main>

<style>
	.btn {
		@apply bg-gray-900 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded-full hover:shadow-md cursor-pointer text-sm;
	}

	.input {
		@apply border-0 px-3 py-3 mb-3 placeholder-gray-300 text-gray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150;
	}
	.error {
		@apply text-red-600 text-xs;
	}
</style>
