<script>
	import { goto } from '$app/navigation';

	// // [START auth_google_signin_redirect_result_modular]
	// import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
	// import { isLoggedIn, userDetails, fromPath } from '../../../config/authstore';
	// import Firestoredb from '../../../config/firebase';

	// const onClick = async () => {
	// 	try {
	// 		const auth = new getAuth();
	// 		const provider = new GoogleAuthProvider();
	// 		signInWithPopup(auth, provider)
	// 			.then((result) => {
	// 				const credential = GoogleAuthProvider.credentialFromResult(result);
	// 				const token = credential.accessToken;
	// 				const user = result.user;
	// 				$userDetails = user;
	// 				$isLoggedIn = true;
	// 				localStorage.setItem('userDetails', JSON.stringify(userDetails));
	// 				localStorage.setItem('isLoggedIn', true);

	// 				console.log(user);
	// 				if ($fromPath == 'cart') {
	// 					goto('/views/products/cart');
	// 				} else {
	// 					goto('/views/products');
	// 				}
	// 			})
	// 			.catch((error) => {
	// 				// Handle Errors here.
	// 				const errorCode = error.code;
	// 				const errorMessage = error.message;
	// 				// The email of the user's account used.
	// 				const email = error.email;
	// 				// The AuthCredential type that was used.
	// 				const credential = GoogleAuthProvider.credentialFromError(error);
	// 			});
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// };
</script>

<div class="h-screen bg-gray-900 flex">
	<div class="w-full max-w-xs m-auto">
		<div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex  flex-col">
			<p
				class="font-bold text-center uppercase text-3xl py-12   bg-gradient-to-tr from-yellow-700 to-yellow-400 text-transparent bg-clip-text"
			>
				Grocery Store
			</p>
			<button
				class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
				type="button"
				on:click={onClick}
			>
				Sign In With Google
			</button>
			<button
				class=" text-gray-900 font-bold py-2 px-4 hover:text-green-700 cursor-pointer"
				type="button"
				on:click={() => {
					goto('/views/products');
				}}
			>
				Skip
			</button>
		</div>
		<p class="text-center text-gray-500 text-xs">All rights reserved by Rakib Joarder.</p>
	</div>
</div>
