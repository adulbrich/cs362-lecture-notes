<script lang="ts">
	import { goto } from '$app/navigation';

	class Todo {
		text: string = '';
		completed: boolean = false;
	}

	let todos = $state<Todo[]>([]);
	let newTodo = $state('');

	$effect(() => {
		const savedTodos = localStorage.getItem('todos');
		savedTodos && (todos = JSON.parse(savedTodos));
	});

	$effect(() => {
		localStorage.setItem('todos', JSON.stringify(todos));
	});

	function addTodo() {
		if (newTodo.trim()) {
			todos = [...todos, { text: newTodo, completed: false }];
			newTodo = '';
		}
	}

	function deleteTodo(index: number) {
		todos = todos.filter((_, i) => i !== index);
	}

	function toggleComplete(index: number) {
		todos = todos.map((todo, i) => {
			if (i === index) {
				return { ...todo, completed: !todo.completed };
			}
			return todo;
		});
	}

	function archiveCompleted() {
		const completed = todos.filter((todo) => todo.completed);

		if (completed.length === 0) {
			alert('Nothing to archive.');
			return;
		}

		const storedArchived = localStorage.getItem('archivedTodos') || '[]';
		const archivedTodos = JSON.parse(storedArchived);

		const updatedArchived = [...archivedTodos, ...completed];
		localStorage.setItem('archivedTodos', JSON.stringify(updatedArchived));

		todos = todos.filter((todo) => !todo.completed);
	}

	function goToArchive() {
		goto('/archive');
	}
</script>

<svelte:head>
    <title>Todo App</title> 
</svelte:head>

<div class="mx-auto flex min-h-screen w-full max-w-3xl flex-col items-center px-4 py-8">
	<h1 class="mb-6 text-3xl font-bold">Todo List</h1>

	<div class="w-full">
		<form onsubmit={addTodo} class="mb-6 flex gap-2">
			<input
				type="text"
				bind:value={newTodo}
				placeholder="Add a new todo"
				class="flex-grow rounded border p-2 focus:outline-none focus:ring-2 focus:ring-orange-300"
			/>
			<button
				type="submit"
				class="flex items-center gap-2 rounded bg-orange-500 px-4 py-2 font-medium text-white hover:bg-orange-600"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					fill="currentColor"
					class="size-5"
				>
					<path
						fill-rule="evenodd"
						d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z"
						clip-rule="evenodd"
					/>
				</svg>

				Add
			</button>
		</form>

		{#if todos.length > 0}
			<ul class="mb-6 w-full divide-y rounded border">
				{#each todos as todo, i}
					<li
						class="flex items-center gap-3 p-3 first-of-type:rounded-t last-of-type:rounded-b hover:bg-gray-100"
					>
						<input
							type="checkbox"
							checked={todo.completed}
							onchange={() => toggleComplete(i)}
							class="h-5 w-5 text-orange-500 focus:ring-orange-300"
						/>
						<span class={todo.completed ? 'flex-grow text-gray-500 line-through' : 'flex-grow'}>
							{todo.text}
						</span>
						<button onclick={() => deleteTodo(i)} class="text-red-500 hover:text-red-700">
							Delete
						</button>
					</li>
				{/each}
			</ul>

			<div class="flex justify-between">
				<button
					onclick={archiveCompleted}
					class="flex items-center gap-2 rounded border border-gray-500 px-4 py-2 font-medium text-gray-500 hover:border-gray-600 hover:bg-gray-100 hover:text-gray-600"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="size-5"
					>
						<path
							d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z"
						/>
						<path
							fill-rule="evenodd"
							d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087ZM12 10.5a.75.75 0 0 1 .75.75v4.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72v-4.94a.75.75 0 0 1 .75-.75Z"
							clip-rule="evenodd"
						/>
					</svg>
					Archive Completed Items
				</button>

				<button
					onclick={goToArchive}
					class="flex items-center gap-2 rounded bg-gray-500 px-4 py-2 font-medium text-white hover:bg-gray-600"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="size-5"
					>
						<path
							d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z"
						/>
						<path
							fill-rule="evenodd"
							d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.163 3.75A.75.75 0 0 1 10 12h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z"
							clip-rule="evenodd"
						/>
					</svg>
					View Archive
				</button>
			</div>
		{:else}
			<p class="my-8 text-center text-gray-500">No todos yet. Add one above!</p>
			<div class="flex justify-end">
				<button
					onclick={goToArchive}
					class="flex items-center gap-2 rounded bg-gray-500 px-4 py-2 font-medium text-white hover:bg-gray-600"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						fill="currentColor"
						class="size-5"
					>
						<path
							d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z"
						/>
						<path
							fill-rule="evenodd"
							d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.163 3.75A.75.75 0 0 1 10 12h4a.75.75 0 0 1 0 1.5h-4a.75.75 0 0 1-.75-.75Z"
							clip-rule="evenodd"
						/>
					</svg>
					View Archive
				</button>
			</div>
		{/if}
	</div>
</div>
