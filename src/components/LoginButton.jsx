import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button className="bg-stone-100 py-2 px-4 mx-4 hover:bg-stone-500 hover:text-stone-50 rounded-xl  text-stone-950 font-bold" onClick={() => loginWithRedirect()}>
      Log In
    </button>
  );
};

export default LoginButton;
