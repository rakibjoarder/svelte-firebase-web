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

<main class="flex justify-center items-center h-screen ">
	<div
		class="flex flex-col items-center bg-gray-100  p-14 max-w-sm rounded overflow-hidden shadow-xl justify-items-center "
		in:scale
	>
		<p class="text-red-500  p-3 font-bold text-xl border-b-2 mb-6 border-red-600">Add Person</p>
		<form on:submit|preventDefault={onSubmit} class="flex justify-center flex-col ">
			<input
				class="shadow appearance-none border hover:border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
				type="text"
				name="Name"
				bind:value={fields.name}
				placeholder="Name"
			/>
			{#if valid == false}
				<div class="error">{errors.name}</div>
			{/if}
			<input
				class="shadow appearance-none border hover:border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
				type="number"
				name="Age"
				bind:value={fields.age}
				placeholder="Age"
			/>
			{#if valid == false}
				<div class="error">{errors.age}</div>
			{/if}
			<select
				class="selectGender shadow appearance-none border hover:border-red-500 rounded w-full py-2 px-3  mb-3 leading-tight focus:outline-none focus:shadow-outline text-gray-500"
				bind:value={fields.gender}
			>
				<option class="" value="">Select Gender</option>
				<option value="Male">Male</option>
				<option value="Female">Female</option>
			</select>
			{#if valid == false}
				<div class="error">{errors.gender}</div>
			{/if}
			<br />
			<input
				class=" bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full hover:shadow-md cursor-pointer"
				type="submit"
			/><br />
		</form>
	</div>
</main>

<style>
</style>
