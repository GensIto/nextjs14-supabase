"use client";
import { useFormState } from "react-dom";
import { State, createTodo } from "./actions";

export default function Form() {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createTodo, initialState);
  console.log(state);
  return (
    <form action={dispatch}>
      <div>
        <label htmlFor='title' className='mb-2 block text-sm font-medium'>
          Title
        </label>
        <input
          id='title'
          name='title'
          type='text'
          placeholder='title'
          defaultValue={state?.values?.title || ""}
          className='peer block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500'
          aria-describedby='title-error'
        />
      </div>
      {state.errors?.title && (
        <div
          id='title-error'
          aria-live='polite'
          className='mt-2 text-sm text-red-500'
        >
          {state.errors.title.map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
      <div>
        <label htmlFor='content' className='mb-2 block text-sm font-medium'>
          Content
        </label>
        <textarea
          id='content'
          name='content'
          rows={5}
          placeholder='content'
          defaultValue={state?.values?.content || ""}
          className='peer block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500'
          aria-describedby='content-error'
        />
      </div>
      {state.errors?.content && (
        <div
          id='content-error'
          aria-live='polite'
          className='mt-2 text-sm text-red-500'
        >
          {state.errors.content.map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
      <div>
        <label htmlFor='due_date' className='mb-2 block text-sm font-medium'>
          Due Data
        </label>
        <input
          id='due_date'
          name='due_date'
          type='date'
          defaultValue={state?.values?.due_date || ""}
          placeholder='deu date'
          className='peer block w-full rounded-md border border-gray-200 p-2 text-sm outline-2 placeholder:text-gray-500'
          aria-describedby='dueDate-error'
        />
      </div>
      {state.errors?.due_date && (
        <div
          id='dueDate-error'
          aria-live='polite'
          className='mt-2 text-sm text-red-500'
        >
          {state.errors.due_date.map((error: string) => (
            <p key={error}>{error}</p>
          ))}
        </div>
      )}
      <button type='submit'>Create Todo</button>
    </form>
  );
}
