import { useMutation, useQueryClient } from "react-query"
import { createAnecdote } from "../services/anecdotesServices"
import { v4 as uuidv4 } from 'uuid';

const AnecdoteForm = () => {

  const queryClient =  useQueryClient() 

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anedotes = queryClient.getQueryData('anedotes')
      queryClient.setQueryData('anedotes', anedotes.concat(newAnecdote))
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if(content.length < 5) return alert('The content or the anecdote must be greater that 5 characters')
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ id: uuidv4(), content, votes: 0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
