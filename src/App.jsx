import {  useQuery } from "react-query";
import {  getAnecdotes } from "./services/anecdotesServices";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
  const handleVote = (anecdote) => {
    console.log("vote");
  };

  // const queryClient =  useQueryClient() 

  // const newAnecdoteMutation = useMutation(createAnecdote, {
  //   onSuccess: (newAnecdote) => {
  //     const anedotes = queryClient.getQueryData('anedotes')
  //     queryClient.setQueryData('anedotes', anedotes.concat(newAnecdote))
  //   }
  // })

  // const addAnecdote = async (event) => {
  //   event.preventDefault()
  //   const content = event.target.anecdote.value
  //   event.target.anecdote.value = ''
  //   newAnecdoteMutation.mutate({ id: uuidv4(), content, votes: 0 })
  // }

  const result = useQuery("anedotes", getAnecdotes, {
    retry: false,
    refetchOnWindowFocus: false
  });

  if (result.isLoading) {
    return <div>loading data...</div>;
  }

  if (result.isError) {
    return <div>Anecdote service not available due problems in the server</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
