import React, { useEffect, useState } from 'react';
import logo from './logo.jpg';
import axios from 'axios';
import './App.css';
import Products from "./components/Products"
const Razorpay = require("razorpay");

const baseUrl = "https://ecommerce-online-education.herokuapp.com";




function App() {
const [products, setProducts] = useState([])
const [payment, setPayment] = useState(false)
const [orderId, setOrderId] = useState('')
const [paymentId, setPaymentId] = useState('')
const [signature, setSignature] = useState('')
  useEffect(() => {
    getProducts();
  }, []);


  const buyNow  = async (productId)=>{
    const res = await axios.get(`${baseUrl}/order/${productId}`)
    console.log(res);
    
    if (res.status !==200){
      return;
    }
      const options = {
        "key_id": "rzp_test_0UrgJJ8O5WVe6e", // Enter the Key ID generated from the Dashboard
        "amount": res.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": res.data.currency ,
        "name": "webLearn",
        "description": res.data.notes.desc,
        "image": {logo},
        "order_id": res.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler": function (response){
            // alert(response.razorpay_payment_id);
            // alert(response.razorpay_order_id);
            // alert(response.razorpay_signature)
            setOrderId(response.razorpay_order_id);
            setPaymentId(response.razorpay_order_id);
            setSignature(response.razorpay_signature);
            setPayment(true);
        },
        "prefill": {
            "name": "Monika",
            "email": "monika.kumar@example.com",
            "contact": "9999999999"
        },
        // "notes": {
        //     "address": "Razorpay Corporate Office"
        // },
        // "theme": {
        //     "color": "#3399cc"
        // }
    };
    const rzp = new Razorpay(options);
    rzp.open();
    rzp.on('payment.failed', function (response){
            alert(response.error.code);
            alert(response.error.description);
            alert(response.error.source);
            alert(response.error.step);
            alert(response.error.reason);
            alert(response.error.metadata.order_id);
            alert(response.error.metadata.payment_id);
    });
      alert(productId)
    };
    

  const getProducts = async ()=> {
    const res = await axios.get(`${baseUrl}/products`)
  console.log(res);
  if(res.status === 200){
    setProducts(res.data);
    console.log(res.data);
  }
};
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" /> 
        <p>
          Welcome to Online training center
        </p>
     <h5>WebLearn.info</h5>
         
        
        <div>
          {
             payment && (
               <div>
                 <p>{paymentId}</p>
                 <p>{orderId}</p>
                 <p>Razorpay Signature: {signature}</p>
                 </div>
             )
          }
        </div>
        <Products products={products} buyNow={buyNow}/>
      </header>
     
    </div>
  );
}

export default App;
