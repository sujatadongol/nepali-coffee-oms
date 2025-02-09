import React, { useMemo } from "react";
import { PrivateRouteList } from "./PrivateRouteList";
import { useRoutes } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
export default function MainRoutingComponent() {
  const RoutesList = () => {
    return useRoutes(PrivateRouteList);
  };
  return useMemo(() => {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <RoutesList />
        </QueryClientProvider>
      </>
    );
  }, []);
}
