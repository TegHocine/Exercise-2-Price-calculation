import React from 'react'

import Title from '../../components/title/Title'
import ProductCard from '../../components/productCard/ProductCard'

import { products } from '../../constants/products'

import './Products.css'
const Products = () => {
  return (
    <div className='Product'>
      <Title title={'Products'} />
      {products?.map((product, i) => (
        <ProductCard key={i} product={product} cardType='product' />
      ))}
    </div>
  )
}

export default Products
