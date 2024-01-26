import { useMutation, useQuery, useQueryClient } from "react-query";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

import { getAnecdotes, updateAnecdote } from "./services/anecdotesServices";
import { useNotifyDispatch } from "./context/NotifycationContext";

const App = () => {
  const notifyDispatch = useNotifyDispatch();
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 });
    notifyDispatch({ type: "ANECDOTE_VOTED", payload: anecdote.content });
    setTimeout(() => {
      notifyDispatch({ type: "CLEAR" });
    }, 5000);
  };

  const queryClient = useQueryClient();

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anedotes");
    },
  });

  const result = useQuery("anedotes", getAnecdotes, {
    retry: false,
    refetchOnWindowFocus: false,
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
