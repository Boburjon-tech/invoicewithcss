import { useState } from "react";
import { addInvoice } from "../../requests/index";
import { useNavigate } from "react-router-dom";
import "./newInvoice.css";
import trashNonActive from "../../images/trashNonActive.png";

function NewInvoice({ onClose }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    senderAddress: {
      street: "",
      city: "",
      postCode: "",
      country: "",
    },
    items: [{ name: "", quantity: 1, price: 0 }],
    createdAt: new Date().toISOString().split("T")[0],
    paymentDue: "",
    status: "pending",
    description: "",
    paymentTerms: "30",
  });

  const handleChange = (e, section, field, index = null) => {
    const value = e.target.value;

    if (section === "clientAddress" || section === "senderAddress") {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    } else if (section === "items" && index !== null) {
      const updatedItems = [...formData.items];
      updatedItems[index][field] = field === "name" ? value : Number(value);
      setFormData((prev) => ({ ...prev, items: updatedItems }));
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleDraftSave = async (e) => {
    e.preventDefault();
    try {
      const draftInvoice = {
        ...formData,
        status: "draft",
        total: formData.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      };
      await addInvoice(draftInvoice);
      navigate("/");
    } catch (err) {
      alert("Xatolik: " + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newInvoice = {
        ...formData,
        total: formData.items.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      };
      await addInvoice(newInvoice);
      navigate("/");
    } catch (err) {
      alert("Xatolik: " + err.message);
    }
  };

  const addNewItem = (e) => {
    e.preventDefault();
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { name: "", quantity: 1, price: 0 }],
    }));
  };

  const removeItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="create_page_main_div">
      <h2 className="create_page_title">New Invoice</h2>
      <form className="create_page_form" onSubmit={handleSubmit}>

        <div className="bill_from_main_div">
          <p className="bills_title">Bill From</p>
          <label>
            Street Address
            <input
              type="text"
              value={formData.senderAddress.street}
              onChange={(e) => handleChange(e, "senderAddress", "street")}
            />
          </label>
          <div className="cpc_wrapper_div">
            <label>
              City
              <input
                type="text"
                value={formData.senderAddress.city}
                onChange={(e) => handleChange(e, "senderAddress", "city")}
              />
            </label>
            <label>
              Post Code
              <input
                type="text"
                value={formData.senderAddress.postCode}
                onChange={(e) => handleChange(e, "senderAddress", "postCode")}
              />
            </label>
            <label>
              Country
              <input
                type="text"
                value={formData.senderAddress.country}
                onChange={(e) => handleChange(e, "senderAddress", "country")}
              />
            </label>
          </div>
        </div>

        <div className="bill_to_main_div">
          <p className="bills_title">Bill To</p>
          <label>
            Client's Name
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => handleChange(e, null, "clientName")}
            />
          </label>
          <label>
            Client Email
            <input
              type="email"
              value={formData.clientEmail}
              onChange={(e) => handleChange(e, null, "clientEmail")}
            />
          </label>
          <label>
            Street Address
            <input
              type="text"
              value={formData.clientAddress.street}
              onChange={(e) => handleChange(e, "clientAddress", "street")}
            />
          </label>
          <div className="cpc_wrapper_div">
            <label>
              City
              <input
                type="text"
                value={formData.clientAddress.city}
                onChange={(e) => handleChange(e, "clientAddress", "city")}
              />
            </label>
            <label>
              Post Code
              <input
                type="text"
                value={formData.clientAddress.postCode}
                onChange={(e) => handleChange(e, "clientAddress", "postCode")}
              />
            </label>
            <label>
              Country
              <input
                type="text"
                value={formData.clientAddress.country}
                onChange={(e) => handleChange(e, "clientAddress", "country")}
              />
            </label>
          </div>
        </div>

        <div className="ipp_wrapper_main_div">
          <div className="ip_wrapper_div">
            <label className="new_invoice_date">
              Invoice Date
              <input
                type="date"
                value={formData.paymentDue}
                onChange={(e) => handleChange(e, null, "paymentDue")}
              />
            </label>

            <label className="payment_terms">
              Payment Terms
              <select
                className="payment_terms_select"
                value={formData.paymentTerms}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, paymentTerms: e.target.value }))
                }
              >
                <option value="1">Net 1 day</option>
                <option value="7">Net 7 days</option>
                <option value="14">Net 14 days</option>
                <option value="30">Net 30 days</option>
              </select>
            </label>
          </div>
          <label>
            Project Description
            <input
              type="text"
              value={formData.description}
              onChange={(e) => handleChange(e, null, "description")}
            />
          </label>
        </div>

        {/* Item List */}
        <div className="item_list_main_div">
          <h3 className="item_list_title">Item List</h3>
          <div className="item_list_categs">
            <p>Item Name</p>
            <p>Qty.</p>
            <p>Price</p>
            <p>Total</p>
          </div>
          {formData.items.map((item, index) => (
            <div className="item_wrapper_main_div" key={index}>
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleChange(e, "items", "name", index)}
              />
              <input
                type="number"
                value={item.quantity}
                onChange={(e) => handleChange(e, "items", "quantity", index)}
                style={{ width: "100%", maxWidth: "6.6rem" }}
              />
              <input
                className="item_price_input"
                type="number"
                value={item.price}
                onChange={(e) => handleChange(e, "items", "price", index)}
              />
              <h4 className="total__price">
                £{(Number(item.quantity) * Number(item.price) || 0).toFixed(2)}
              </h4>
              <button
                type="button"
                className="remove_item_btn"
                onClick={() => removeItem(index)}
              >
                <img src={trashNonActive} alt="Remove" />
              </button>
            </div>
          ))}
          <button type="button" className="add_item_btn" onClick={addNewItem}>
            Add New Item
          </button>
        </div>

  
        <div className="footer_buttons">
          <button  type="button" onClick={onClose} className="discard_btn">
            Discard
          </button>
          <button type="button" onClick={handleDraftSave} className="draft_btn">
            Save as Draft
          </button>
          <button type="submit" className="send_btn">
            Save & Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewInvoice;
