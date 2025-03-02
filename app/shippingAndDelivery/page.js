import React from 'react'
import Navbar from '../components/Navbar'

const page = () => {
    return (
        <>
            <Navbar />
            <div>
                <h1 className='text-3xl mb-2'>
                    Shipping and Delivery
                </h1>

                <p className='mb-2 text-gray-500 italic'>
                    Last updated on Mar 2 2025
                </p>

                For International buyers, orders are shipped and delivered through registered international courier companies and/or International speed post only. For domestic buyers, orders are shipped through registered domestic courier companies and /or speed post only. Orders are shipped within 8-14 days or as per the delivery date agreed at the time of order confirmation and delivering of the shipment subject to Courier Company / post office norms. MOHSIN AYOUB MIR is not liable for any delay in delivery by the courier company / postal authorities and only guarantees to hand over the consignment to the courier company or postal authorities within 8-14 days rom the date of the order and payment or as per the delivery date agreed at the time of order confirmation. Delivery of all orders will be to the address provided by the buyer. Delivery of our services will be confirmed on your mail ID as specified during registration. For any issues in utilizing our services you may contact our helpdesk on 9622699190 or mirmohsin0001@gmail.com
            </div>
        </>
    )
}

export default page