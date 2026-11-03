import { createContext, useContext } from "react";

export const DraftContext = createContext({ owner: "public", tab: "", ready: false });
export const useDraftOwner = () => useContext(DraftContext);
