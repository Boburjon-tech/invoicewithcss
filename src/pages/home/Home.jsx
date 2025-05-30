import { useState } from "react";
import DropDown from "../../components/dropdown/DropDown";
import plusIcon from "../../images/plus.png";
import "./home.css";
import { useInvoice } from "../../context/invoiceContext";
import not_fount_image from "../../images/thereNothing.png";
import { Link } from "react-router-dom";
import arrow_right from "../../images/arrow-right.svg";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import NewInvoice from "../newInvoice/newInvoice";

function Home() {
  const isMobile = useMediaQuery("(max-width: 578px)");
  const { invoices: data, loading, error } = useInvoice();
  const [filters, setFilters] = useState([]);
  const [newinvoice, setNewInvoice] = useState(false);

  const filteredData = filters.length === 0
    ? data
    : data.filter((inv) => filters.includes(inv.status));

  return (
    <div className="home_main_div">
      <div className="home_proms">
        <div className="home_titles_wrapper">
          <h1 className="home_title">Invoice</h1>
          <p className="home_pretitle">
            There are {filteredData.length} total invoices
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <DropDown onChange={setFilters} />
          <button onClick={() => setNewInvoice(true)} className="add_btn">
            <img className="plus_icon" src={plusIcon} alt="" />
            {isMobile ? "New" : "New Invoice"}
          </button>
        </div>
      </div>

      <div className="invoices_wrapper">
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!loading && !error && filteredData.length === 0 && (
          <div className="nothing_page_container">
            <img src={not_fount_image} alt="" width="242px" height="341px" />
          </div>
        )}
        {filteredData && filteredData.map((inv) => (
          !isMobile ? (
            <Link to={`/invoice/${inv.id}`} className="abb_user_div" key={inv.id}>
              <h3 className="client_id">
                # {inv.clientAddress?.postCode
                    ? inv.clientAddress.postCode.replace(/\s+/g, "")
                    : "No ID"}
              </h3>
              <p className="client_date">{inv.createdAt}</p>
              <p className="client_name">{inv.clientName}</p>
              <h3 className="client_price">£ {inv.total}</h3>
              <div style={{ display: "flex", gap: "20px" }}>
                <button className={`client_trafic ${inv.status}`}>
                  <span className={`${inv.status}or`}></span> {inv.status}
                </button>
                <img src={arrow_right} alt="" />
              </div>
            </Link>
          ) : (
            <Link to={`/invoice/${inv.id}`} className="abb_user_div_mob" key={inv.id}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3 className="client_id">
                  # {inv.clientAddress?.postCode
                      ? inv.clientAddress.postCode.replace(/\s+/g, "")
                      : "No ID"}
                </h3>
                <p className="client_name">{inv.clientName}</p>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
                  <p className="client_date">{inv.createdAt}</p>
                  <h3 className="client_price">£ {inv.total}</h3>
                </div>

                <button className={`client_trafic ${inv.status}`}>
                  <span className={`${inv.status}or`}></span> {inv.status}
                </button>
              </div>
            </Link>
          )
        ))}
      </div>

      {newinvoice && (
        <>
          <div className="modal-overlay" onClick={() => setNewInvoice(false)}></div>
          <div className="new_invoice_modal">
            <NewInvoice onClose={() => setNewInvoice(false)} />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
