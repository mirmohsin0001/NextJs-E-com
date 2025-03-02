import React from 'react'
import Navbar from '../components/Navbar'

const page = () => {
    return (
        <>
            <Navbar />
            <div>
                <h1 className='text-3xl mb-2'>
                    Cancellation and Refund
                </h1>
                <p className='mb-2 text-gray-500 italic'>
                    Last updated on Mar 2 2025
                </p>

                MOHSIN AYOUB MIR believes in helping its customers as far as possible, and has therefore a liberal cancellation policy. Under this policy:

                Cancellations will be considered only if the request is made within 7 days of placing the order. However, the cancellation request may not be entertained if the orders have been communicated to the vendors/merchants and they have initiated the process of shipping them.

                MOHSIN AYOUB MIR does not accept cancellation requests for perishable items like flowers, eatables etc. However, refund/replacement can be made if the customer establishes that the quality of product delivered is not good.

                In case of receipt of damaged or defective items please report the same to our Customer Service team. The request will, however, be entertained once the merchant has checked and determined the same at his own end. This should be reported within 7 days of receipt of the products.

                In case you feel that the product received is not as shown on the site or as per your expectations, you must bring it to the notice of our customer service within 7 days of receiving the product. The Customer Service Team after looking into your complaint will take an appropriate decision.

                In case of complaints regarding products that come with a warranty from manufacturers, please refer the issue to them.

                In case of any Refunds approved by the MOHSIN AYOUB MIR, it’ll take 3-4 days for the refund to be processed to the end customer.
            </div>
        </>
    )
}

export default page