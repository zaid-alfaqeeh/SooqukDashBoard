"use client";

import { Provider } from "react-redux";
import { store } from "./store";

/**
 * Redux Provider wrapper for client components
 */
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
