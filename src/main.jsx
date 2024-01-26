import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { AnecdoteContextProvider } from "./context/NotifycationContext";

import App from "./App";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <AnecdoteContextProvider>
      <App />
    </AnecdoteContextProvider>
  </QueryClientProvider>
);
