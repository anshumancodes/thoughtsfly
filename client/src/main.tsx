import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { RecoilRoot } from "recoil";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
   
    <RecoilRoot>
    <Auth0Provider
       domain="dev-2jw4zujxnfrfeb4x.us.auth0.com"
       clientId="SYfKxCk7NXwGtSSMOWJKzZnh3mIvASfy"
       authorizationParams={{
         redirect_uri: window.location.origin
       }}
      >
    <BrowserRouter>

      
      <App />
      
    </BrowserRouter>
    </Auth0Provider>
    </RecoilRoot>
  </StrictMode>
);
