import React, { useEffect } from 'react'

import Title from '../../components/title/Title'
import ProductCard from '../../components/productCard/ProductCard'
import Price from '../../components/price/Price'

import cart from '../../assets/cart/cart.png'

import { useSelector, useDispatch } from 'react-redux'
import { getTotal } from '../../features/cart/cartSlice'
import './Cart.css'

const Cart = () => {
  const addedProducts = useSelector((state) => state.cart)
  const { cartItems, cartTotalAmount, milkOffer, butterOffer } = addedProducts

  // get the bread price and qte to calculate the discount when added
  const getbread = cartItems?.filter((item) => item.id === 1).shift()
  const breadPrice = getbread ? getbread.price : 0
  // here i simple check if bread quantity equal's butterOffer
  // else i do bread qty mode butterOffer
  // ex: butterOffer:2 , breadqty: 2 => discount is 2*(breadprice/2)
  // ex: butterOffer:2 , breadqty: 1 => discount is 1*(breadprice/2) bcs: 1 mod 2 = 1
  const nbrBreadToDiscount =
    getbread && getbread.productQty < butterOffer
      ? getbread.productQty % butterOffer
      : butterOffer
  const breadDiscount = (breadPrice / 2) * nbrBreadToDiscount

  console.log({ butterOffer, breadDiscount, breadPrice, nbrBreadToDiscount })
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTotal())
    // eslint-disable-next-line
  }, [cartItems])
  return (
    <div className='Cart'>
      <Title title={'Cart'} icon={cart} />
      {cartItems?.length > 0 ? (
        <>
          {cartItems?.map((cartItem, i) => (
            <ProductCard
              key={i}
              product={cartItem}
              milkOffer={milkOffer}
              butterOffer={breadDiscount}
              cardType='cart'
            />
          ))}

          <Price title='SubTotal' price={cartTotalAmount} />
          <Price title='Discount' price={milkOffer + breadDiscount} />
          <Price
            title='Total'
            price={cartTotalAmount - milkOffer - breadDiscount}
          />
        </>
      ) : (
        <div className='emptyCart'> Your cart is empty</div>
      )}
    </div>
  )
}

export default Cart
