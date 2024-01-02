import client from "@./apolloClient";
import { ApolloProvider } from "@apollo/client";

function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default Providers;
