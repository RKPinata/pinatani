import { ApolloProvider } from "@apollo/client";
import client from "@root/apolloClient";

function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default Providers;
