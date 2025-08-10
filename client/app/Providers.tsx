"use client"; // this file must be a Client Component

import { Provider } from "react-redux";
import { ReactNode } from "react";
import { peristor, store } from "@/redux/store";
import { PersistGate } from "redux-persist/integration/react";

interface Props {
  children: ReactNode;
}

export function Providers({ children }: Props) {
  return (
    <Provider store={store}>
      <PersistGate persistor={peristor}>{children}</PersistGate>
    </Provider>
  );
}
