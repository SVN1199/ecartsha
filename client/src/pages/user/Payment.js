import React, { useState, Fragment } from "react";
import { CardCvcElement, CardExpiryElement, CardNumberElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { newOrder } from "../../actions/orderActions";
import { orderCompleted } from "../../slices/cartSlice";
import MetaData from "../../components/layouts/MetaData";

export default function Payment() {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("card");
  const { user } = useSelector((state) => state.authState);
  const { shippingInfo = {} } = useSelector((state) => state.cartState);
  const { products = [], priceDetails } = useSelector((state) => state.productsState);

  const paymentData = {
    amount: priceDetails?.length > 0 ? Math.round(priceDetails[4]?.value) : 0,
    shipping: {
      name: user.name,
      address: {
        city: shippingInfo.city,
        postal_code: shippingInfo.postalCode,
        country: shippingInfo.country,
        state: shippingInfo.state,
        line1: shippingInfo.address,
      },
      phone: shippingInfo.phoneNo,
    },
  };

  const orderItems = products.map((product) => ({
    name: product.name,
    quantity: product.qty,
    size: product.size,
    image: product.image,
    price: product.finalPrice,
    product: product.productId,
  }));

  const order = {
    orderItems,
    shippingInfo,
    shippingPrice: priceDetails?.length > 0 ? Math.round(priceDetails[3]?.value) : 0,
    totalPrice: priceDetails?.length > 0 ? Math.round(priceDetails[4]?.value * 100) : 0,
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const payBtn = document.querySelector("#pay_btn");
    payBtn.disabled = true;

    try {
      if (paymentMethod === "card") {
        const { data } = await axios.post("/api/v1/payment/processpayment", paymentData);
        const clientSecret = data.client_secret;

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardNumberElement),
            billing_details: {
              name: user.name,
              email: user.email,
            },
          },
        });

        if (result.error) {
          toast.error(result.error.message, { position: "bottom-center" });
        } else if (result.paymentIntent.status === "succeeded") {
          toast.success("Payment Successful!", { position: "bottom-center" });
          order.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
          };
          dispatch(orderCompleted());
          dispatch(newOrder(order));
          navigate("/order/success");
        }
      } else if (paymentMethod === "upi") {
        const upiData = { upiId: "user@upi", ...paymentData };
        const { data } = await axios.post("/api/v1/payment/upi", upiData);
        if (data.success) {
          toast.success("UPI Payment Successful!", { position: "bottom-center" });
          dispatch(orderCompleted());
          dispatch(newOrder(order));
          navigate("/order/success");
        } else {
          toast.error("UPI Payment Failed!", { position: "bottom-center" });
        }
      }
    } catch (error) {
      toast.error("Payment failed. Try again.", { position: "bottom-center" });
    } finally {
      payBtn.disabled = false;
    }
  };

  return (
    <Fragment>
      <MetaData title='Payment' />
      <div className="min-h-screen w-full flex justify-center py-5 bg-gray-100">
        <div className="w-96 h-auto flex bg-white mt-5 shadow-lg rounded-xl">
          <form onSubmit={submitHandler} className="w-full p-6">
            <h1 className="mb-6 text-center text-2xl font-semibold text-gray-800">Payment</h1>

            <div className="mb-6">
              <label htmlFor="paymentMethod" className="block text-gray-700 font-medium">
                Select Payment Method
              </label>
              <select
                id="paymentMethod"
                className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="card">Card</option>
                <option value="upi">UPI</option>
              </select>
            </div>

            {paymentMethod === "card" && (
              <>
                <div className="mb-6">
                  <label htmlFor="card_num_field" className="block text-gray-700 font-medium">
                    Card Number
                  </label>
                  <CardNumberElement
                    id="card_num_field"
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="card_exp_field" className="block text-gray-700 font-medium">
                    Expiry Date
                  </label>
                  <CardExpiryElement
                    id="card_exp_field"
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="card_cvc_field" className="block text-gray-700 font-medium">
                    CVC
                  </label>
                  <CardCvcElement
                    id="card_cvc_field"
                    className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  />
                </div>
              </>
            )}

            {paymentMethod === "upi" && (
              <div className="mb-6">
                <label htmlFor="upi_id" className="block text-gray-700 font-medium">
                  UPI ID
                </label>
                <input
                  type="text"
                  id="upi_id"
                  className="w-full p-3 mt-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., yourname@upi"
                  required
                />
              </div>
            )}

            <button
              id="pay_btn"
              type="submit"
              className="w-full bg-green-500 text-white py-3 rounded-lg shadow hover:bg-green-600 transition"
            >
              Pay - ${priceDetails?.[4]?.value || "0.00"}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
