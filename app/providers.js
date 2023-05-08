// app/providers.tsx
"use client";
import { QueryClient, QueryClientProvider } from "react-query";

import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient();
export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider>
        <ChakraProvider>{children}</ChakraProvider>
      </CacheProvider>
    </QueryClientProvider>
  );
}
