import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPal = (prop) => {
  const [paid, setPaid] = useState(false);
  const [totalPrice, setTotalPrice] = useState(prop.amount.toFixed(2))
  const handlePaymentSuccess = (details) => {
    console.log(details)
    setPaid(true);
  };
 
  useEffect(() => {
    const amount = prop.amount.toFixed(2)
    console.log(prop.amount)
    setTotalPrice(amount);
  
  }, [prop.amount]);

  useEffect(() => {
    setTotalPrice(totalPrice)
  
  }, [totalPrice]);
  

  
  return (
    <PayPalScriptProvider options={{ "client-id": "ATGMGQgBgZLOYEh-gw1c_l1-OpMqUVITIFm-rW4HA8jGpAQbfQ1LkmK2e5YDcNvcK6PVdnrbdl_9-eRE" }}>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount:{
                  value: {totalPrice}
                },
                
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then((details) => {
            const name = details.payer.name.given_name;
            handlePaymentSuccess(details)
          });
        }}
      />
    </PayPalScriptProvider>
  );
};

export default PayPal;
