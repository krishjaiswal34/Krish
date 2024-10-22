import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/Routes.jsx";
import { ProductContextProvider } from "./contexts/ProductContext.jsx";
import { FirebaseAuthContextProvider } from "./contexts/FirebaseAuthContext.jsx";
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'

const stripePromise=loadStripe('pk_test_51QCX5pAhOLdjZChb1s9Zc1EXlQ3Va8PaFeM4jZbbnuNK1tUoqafXrrWzsAxEsDURz22SrYtOaza4ejwgmghMSMLz00EeEZraud');

createRoot(document.getElementById("root")).render(
  <ProductContextProvider>
    <FirebaseAuthContextProvider>
<Elements stripe={stripePromise}>
<RouterProvider router={routes} />
</Elements>
     

    </FirebaseAuthContextProvider>
  </ProductContextProvider>
);
