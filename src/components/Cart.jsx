import React from 'react'
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { addFilteredCart } from '../app/productSlice'
import TotalAmount from './TotalAmount'
import MIssingCart from './MIssingCart'

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((store) => store.products.cart)
  const user = useSelector((store) => store.user)
  if(!cart) return
  // console.log(cart);

  const result = cart.reduce((acc, card) => {
    const existingCard = acc.find(item => item.id === card?.id);
    if (existingCard) {
      existingCard.count++;
    } else {
      acc.push({ id: card?.id, count: 1, data: card });
    }
    return acc;
  }, []);
    dispatch((addFilteredCart(result)))

  // console.log(result);

  if( cart.length<= 0){
    return <MIssingCart/>
  }

  


  return (
    <div className=' flex flex-col  md:grid md:grid-cols-4 p-5 md:w-[1600px]   md:space-x-4 bg-[#f0f0f0]  pt-10'>
    <div className='  md:col-span-2 md:ml-8 '>
    {cart && result.map((item) => <CartItem key={item.id} item={item}  />)}

    </div>

    <div className='  md:col-span-1'>
      <TotalAmount user={user} cartResult={result} cart={cart} />
    </div>
    
    </div>
  )
}

export default Cart