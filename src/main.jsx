import { createRoot } from "react-dom/client";
import App from "./containers/App/App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProviderWrapper } from "./ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Create a client and we cans use query client where we want inside the application
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // this prevents refeching on window focus
    },
  },
});
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProviderWrapper>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </ThemeProviderWrapper>
  </BrowserRouter>
);
