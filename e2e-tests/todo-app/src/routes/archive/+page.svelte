<script lang="ts">
	import { goto } from '$app/navigation';

	class Todo {
		text: string = '';
		completed: boolean = false;
	}

	let archivedTodos = $state<Todo[]>([]);

	$effect(() => {
		const savedTodos = localStorage.getItem('archivedTodos');
		savedTodos && (archivedTodos = JSON.parse(savedTodos));
	});

	$effect(() => {
		localStorage.setItem('archivedTodos', JSON.stringify(archivedTodos));
	});

	function clearArchive() {
		archivedTodos = [];
	}

	function goBack() {
		goto('/');
	}
</script>

<svelte:head>
    <title>Archive</title> 
</svelte:head>

<div class="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center px-4 py-8">
	<h1 class="mb-6 text-3xl font-bold">Archived Todos</h1>

	<div class="w-full">
		{#if archivedTodos.length > 0}
			<ul class="mb-6 w-full divide-y rounded border">
				{#each archivedTodos as todo, i}
					<li class="flex items-center gap-3 p-3">
						<span class="text-gray-500 line-through">{todo.text}</span>
					</li>
				{/each}
			</ul>

			<div class="flex justify-between">
				<button
					onclick={clearArchive}
					class="flex items-center gap-2 rounded border border-red-500 px-4 py-2 font-medium text-red-500 hover:border-red-600 hover:bg-gray-50 hover:text-red-600"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="size-5"
					>
						<path
							fill-rule="evenodd"
							d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
							clip-rule="evenodd"
						/>
					</svg>
					Clear Archive
				</button>

				<button
					onclick={goBack}
					class="flex items-center gap-2 rounded bg-gray-500 px-4 py-2 font-medium text-white hover:bg-gray-600"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="size-5"
					>
						<path
							fill-rule="evenodd"
							d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
							clip-rule="evenodd"
						/>
					</svg>
					Back to Todos
				</button>
			</div>
		{:else}
			<p class="my-8 text-center text-gray-500">No archived todos yet.</p>
			<div class="flex justify-end">
				<button
					onclick={goBack}
					class="flex items-center gap-2 rounded bg-gray-500 px-4 py-2 font-medium text-white hover:bg-gray-600"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="size-5"
					>
						<path
							fill-rule="evenodd"
							d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z"
							clip-rule="evenodd"
						/>
					</svg>
					Back to Todos
				</button>
			</div>
		{/if}
	</div>
</div>
