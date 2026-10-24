import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { queryClient } from "@/lib/queryClient";
import "./styles/globals.css";
import App from "./App";
import { AuthProvider } from "@/features/auth/AuthContext";
import { AppErrorBoundary } from "@/components/AppErrorBoundary";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <AuthProvider><App /></AuthProvider>
      <Toaster richColors position="top-right" />
    </QueryClientProvider>
    </AppErrorBoundary>
  </StrictMode>,
);
