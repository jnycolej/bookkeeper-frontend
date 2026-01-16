import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className="bg-slate-200 p-2 rounded text-zinc-600 font-bold" onClick={() => loginWithRedirect()}>
      Log In
    </button>
  );
};

export default LoginButton;
