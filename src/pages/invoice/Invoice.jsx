  import "./invoice.css"
  import { useInvoice } from "../../context/invoiceContext"
  import { useParams } from "react-router-dom";
  import arrow_right from "../../images/arrow-right.svg";
  import { useMediaQuery } from "../../hooks/useMediaQuery";
  import ViewFooter from "../../components/view_footbar/viewFooter";
import { useState } from "react";
import { deleteById, updateById } from "../../requests";
import { useNavigate } from "react-router-dom";

  function Invoice() {
    const {id} = useParams();
    const isMobile = useMediaQuery("(max-width: 578px)");
    const [isDelete,setIsDelete] = useState(false)
    const {invoices:data,loading,error} = useInvoice();
    const invoice = data.find((inv)=> inv.id.toString() === id);
    const [status, setStatus] = useState("");
    
    
   const markPaid = async (e) => {
  e.preventDefault();
  try {
    const updatedInvoice = {
      ...invoice,
      status: "paid"
    };

    await updateById(id, updatedInvoice);
    alert("Invoice muvaffaqiyatli to'langan deb belgilandi. Sahifa yangilanmoqda.");
    window.location.reload(); 

  } catch (error) {
    alert("Status yangilanmadi: " + error.message);
  }
};

    
    const navigate = useNavigate()
    
    console.log(invoice);
    
    if (!invoice) {
      return <p style={{ color: "red" }}>Invoice topilmadi!</p>;
    }

      const totalAmount = invoice?.items?.reduce(
          (acc, item) => acc + item.quantity * item.price,
            0
      )||0;

      async function handleDelete() {
      try {
        await deleteById(id);
        window.location.reload();
        navigate("/");
      } catch (error) {
        alert("Failed to delete invoice: " + error.message);
      }
    }

    
       

    return (
      <div className="invoice_main_div">
        <div className="invoice_header_div">
          <a className="invoice_to_home_btn" href="/"><img src={arrow_right} alt="arrow_left" /> Go back</a>
          <div className="invoice_functional_semd">
            <div className="invoice_status_wrapper">
                <p className="invoice_status_word">Status</p>
                <button  className={`client_trafic ${invoice.status}`}>
                  <span className={`${invoice.status}or`}></span> {invoice.status}
                </button>
            </div>
            <div className="emd_wrappers">
              <button className="edit_btn">Edit</button>
              <button onClick={handleDelete} className="delete_btn">Delete</button>
              <button className="change_status_btn" onClick={markPaid}>Mark as Paid</button>
            </div>
          </div>
        </div>


        <div className="inform_main_div">
          <div className="location_w_ucerid">
            <div className="userid_job_wrapper">
              <h2 className="userid">
                # {invoice.clientAddress?.postCode
                  ? invoice.clientAddress.postCode.replace(/\s+/g, "")
                  : "No ID"}
              </h2>

              <p className="user_job">{invoice.description}</p>
            </div>
            <div className="sender_locations_wrapper">
              <p className="street_name">{invoice.senderAddress.street}</p>
              <p className="city_name">{invoice.senderAddress.city}</p>
              <p className="sender_post_code">{invoice.senderAddress.postCode}</p>
              <p className="country_name">{invoice.senderAddress.country}</p>
            </div>
          </div>



          <div className="client_abouts">
           
            <div className="dates">
             <div className="invoice_date">
              <p className="date_title">Invoice Date</p>
              <h3 className="the_this_date">{invoice.createdAt}</h3>
            </div>
            <div className="payment_due">
              <p className="date_title">Payment Due</p>
              <h3 className="the_this_date">{invoice.paymentDue}</h3>
            </div>
           </div>
           <div className="the_bill">
            <p className="bill_word">Bill To</p>
            <h3 className="client_namee">{invoice.clientName}</h3>
            <div className="client_locations_wrapper">
              <p className="client_street">{invoice.clientAddress.street}</p>
              <p className="client_city">{invoice.clientAddress.city}</p>
              <p className="client_postcode">{invoice.clientAddress.postCode}</p>
              <p className="client_country">{invoice.clientAddress.country}</p>
            </div>
           </div>
          
           <div className="sent_email">
            <p className="sent_word">Sent to</p>
            <p className="client_mail">{invoice.clientEmail}</p>
           </div>
          </div>

          <div className="items_main_div">
            <div className="categories_div">
              <p className="item_name_word">Item Name</p>
              <div className="categs">
                <p className="item_quantity_word">QTY.</p>
                <p className="item_price_word">Price</p>
                <p className="item_total_word">Total</p>
              </div>
            </div>
            <div className="items_over_wrapper">
              {invoice && invoice?.items?.map((i,index)=> {
              return !isMobile ? (
                
                <div  key={index} className="item_wrapper">
                <h4 className="item_title">{i.name}</h4>
                  <p className="item_quantity">{i.quantity}</p>
                  <p className="item_price">£{i.price}</p>
                  <p className="item_total">£{i.quantity*i.price}</p>
                </div>
                
              ) : (
                 <div  key={index} className="item_wrapper">
                  <div className="item_title_qty_wrap">
                    <h4 className="item_title">{i.name}</h4>
                    <p className="item_quantity">{i.quantity} x £{i.price}</p>
                  </div>
                  <p className="item_total">£{i.quantity*i.price}</p>
                </div>
                
              )
            })}
            </div>
          </div>
          <div className="total_amountation_wrap">
            <p className="amount_due_word">Amount Due</p>
            <h3 className="the_amount_total">£{totalAmount}.00</h3>
          </div>

        </div>
          {isMobile && <ViewFooter/>}
      </div>
    )
  }

  export default Invoice
