import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./pages/Home";
import SearchResults from "./pages/SearchResults";

const queryClient = new QueryClient();

// Fallback simple 404 page
function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-display font-bold text-white">404</h1>
        <p className="text-xl text-white/60">Page not found</p>
        <a href="/" className="inline-block mt-8 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
          Return Home
        </a>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/search" component={SearchResults} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
