import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/home/Home";
import { InvoiceProvider } from "../context/invoiceContext";
import Invoice from "../pages/invoice/Invoice";
import NewInvoice from "../pages/newInvoice/newInvoice";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path:"invoice/:id", element:<Invoice />},
      { path:"newinvoice", element:<NewInvoice />}
    ],
  },
]);

function App() {
  return (
    <InvoiceProvider>
      <RouterProvider router={routes} />
    </InvoiceProvider>
  );
}

export default App;
