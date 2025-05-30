import { createContext, useContext, useState, useEffect } from "react";
import { getInvoices } from "../requests";

const InvoiceContext = createContext();

export function InvoiceProvider({ children }) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getInvoices("/invoices")
      .then((res) => {
        setInvoices(res); 
      })
      .catch((err) => {
        setError(err.message || "Error");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <InvoiceContext.Provider value={{ invoices, loading, error }}>
      {children}
    </InvoiceContext.Provider>
  );
}


export function useInvoice() {
  return useContext(InvoiceContext);
}
