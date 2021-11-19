/*
	This module is used by the /todos.json and /todos/[uid].json
	endpoints to make calls to api.svelte.dev, which stores todos
	for each user. The leading underscore indicates that this is
	a private module, _not_ an endpoint — visiting /todos/_api
	will net you a 404 response.

	(The data on the todo app will expire periodically; no
	guarantees are made. Don't use it to organise your life.)
*/

const base = 'https://ebazar.droidappbd.com/public/api/v1';

export async function api(request, resource, data) {
	const res = await fetch(`${base}/${resource}`, {
		method: request.method,
		headers: {
			Accept: 'application/ld+json',
			'Content-Type': 'application/ld+json',
			'X-Authorization': '9dZ24lz9WC7VkfeQhxpYM4Wn6sKaENxGxihZN2wqdBroK6f5FzuRIiFddRqaf2bgu'
		},
		body: data && JSON.stringify(data)

	});
	// if the request came from a <form> submission, the browser's default
	// behaviour is to show the URL corresponding to the form's "action"
	// attribute. in those cases, we want to redirect them back to the
	// /todos page, rather than showing the response
	if (res.ok && request.method !== 'GET' && request.headers.accept !== 'application/json') {
		return {
			status: 303,
			headers: {
				location: '/todos'
			}
		};
	}

	return {
		status: res.status,
		body: await res.json()
	};
}
