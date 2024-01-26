import { useMutation, useQueryClient } from "react-query";
import { createAnecdote } from "../services/anecdotesServices";
import { v4 as uuidv4 } from "uuid";
import { useNotifyDispatch } from "../context/NotifycationContext";

const AnecdoteForm = () => {
  const notifyDispatch = useNotifyDispatch();

  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: (newAnecdote) => {
      const anedotes = queryClient.getQueryData("anedotes");
      queryClient.setQueryData("anedotes", anedotes.concat(newAnecdote));
    },
  });

  const handleNotification = (type, content = null) => {
    notifyDispatch({ type, payload: content });
    setTimeout(() => {
      notifyDispatch({ type: "CLEAR" });
    }, 5000);
  };

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content.length < 5)
      return handleNotification("ANECDOTE_ADDED_ERROR");
    event.target.anecdote.value = "";
    newAnecdoteMutation.mutate({ id: uuidv4(), content, votes: 0 });
    handleNotification("ANECDOTE_ADDED", content);
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
