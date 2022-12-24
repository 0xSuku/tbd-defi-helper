import React from "react";
import { ProtocolContext } from "./protocols";

const useProtocol = () => React.useContext(ProtocolContext);

export default useProtocol;
