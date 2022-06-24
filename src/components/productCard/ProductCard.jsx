import React from 'react'
import Buttons from '../buttons/Buttons'
import Image from '../image/Image'
import Title from '../title/Title'
import Price from '../price/Price'
import Rating from '../rating/Rating'

import { useDispatch } from 'react-redux'
import {
  addToCart,
  incrementQty,
  decrementQty
} from '../../features/cart/cartSlice'

import './ProductCard.css'

const ProductCard = ({ product, cardType, milkOffer, butterOffer }) => {
  const dispatch = useDispatch()
  const priceCalc =
    product.product_id === 2
      ? product.price * product.productQty - milkOffer
      : product.price * product.productQty

  const productToAdd = {
    id: product.id,
    product_id: product.product_id,
    title: product.title,
    img: product.img,
    price: product.price
  }

  return cardType === 'product' ? (
    <div className='ProductCard product'>
      <div className='product_container'>
        <Image img={product.img} />
        <div className='title_desc'>
          <Title title={product.title} size={1} />
          <p> {product.desc}</p>
        </div>
        <div className='price_rating'>
          <Rating />
          <Price price={product.price} />
        </div>
      </div>
      <Buttons
        type={'product'}
        onClick={() => dispatch(addToCart(productToAdd))}
      />
    </div>
  ) : (
    <div className='ProductCard cart'>
      <div className='product_container'>
        <Image img={product.img} rounded={true} />
        <div className='title_qty'>
          <Title title={product.title} size={1} />
          <div className='qty_container'>
            <span>quantity</span>
            <div className='qty'>
              <Buttons
                type='decrement'
                onClick={() => dispatch(decrementQty(product.id))}
              />
              <span>{product.productQty}</span>
              <Buttons
                type='increment'
                onClick={() => dispatch(incrementQty(product.id))}
              />
            </div>
          </div>
        </div>
        <div className='price'>
          {product.product_id === 1 && butterOffer !== 0 ? (
            <>
              <Price price={priceCalc} oldPrice={true} />
              <Price price={priceCalc - butterOffer} />
            </>
          ) : (
            <Price price={priceCalc} />
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductCard
