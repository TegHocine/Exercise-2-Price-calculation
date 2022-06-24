import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  milkOffer: 0,
  butterOffer: 0,
  cartTotalAmount: 0
}

export const cartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // here we check if the product exist or no with findIndex method
      // if the item exist its retruns a number equal or greater than 0
      // else its return a -1
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      )
      // check if the item exist if it does increment the quantity
      // else add it to the cart with a default quantity of 1
      productIndex >= 0
        ? (state.cartItems[productIndex].productQty += 1)
        : (state.cartItems = [
            ...state.cartItems,
            { ...action.payload, productQty: 1 }
          ])

      if (
        productIndex >= 0 &&
        state.cartItems[productIndex]?.product_id === 2 &&
        state.cartItems[productIndex]?.productQty % 4 === 0
      ) {
        state.milkOffer += state.cartItems[productIndex].price
      }
      if (
        productIndex >= 0 &&
        state.cartItems[productIndex]?.product_id === 3 &&
        state.cartItems[productIndex]?.productQty % 2 === 0
      ) {
        state.butterOffer += 1
      }
    },
    incrementQty: (state, action) => {
      // same as above
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      )
      // check if the product exist if it does increment the quantity
      productIndex >= 0 && (state.cartItems[productIndex].productQty += 1)

      // Added this here bcs this is simplest way i found to implement this offer
      // So for the milk offer buy 3 get the 4th for free
      // when incrementing, i simple check the product_id of milk wich is 2
      // and if the quantity mod 4 is equaly to 0 if its true
      // then we increment the milkOffer by the price of the milk
      // and letter we use the milkOffer variable to calculate the discount and total price
      if (
        productIndex >= 0 &&
        state.cartItems[productIndex]?.product_id === 2 &&
        state.cartItems[productIndex]?.productQty % 4 === 0
      ) {
        state.milkOffer += state.cartItems[productIndex].price
      }
      // same logic for milkOffer but instead
      // we just increment one and calculate the 50% later with this formula
      // (bread.price/2) * butterOffer
      if (
        productIndex >= 0 &&
        state.cartItems[productIndex]?.product_id === 3 &&
        state.cartItems[productIndex]?.productQty % 2 === 0
      ) {
        state.butterOffer += 1
      }
    },
    decrementQty: (state, action) => {
      const productIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      )

      // check if the product exist and its greater than 1 then decrement the quantity
      // else delete the product from the cart
      if (productIndex >= 0 && state.cartItems[productIndex].productQty > 1) {
        state.cartItems[productIndex].productQty -= 1
      } else {
        const newCard = state.cartItems.filter(
          (cardItem) => cardItem.id !== action.payload
        )
        state.cartItems = newCard
      }

      // here the same as the prev check for milkOffer
      // we minor differences wich is
      // we check for product quantity +1 mod 4 if it equal to 0
      // we decrement the milkOffer variable by the price of the milk
      if (
        state.cartItems[productIndex]?.product_id === 2 &&
        (state.cartItems[productIndex]?.productQty + 1) % 4 === 0
      ) {
        state.milkOffer -= state.cartItems[productIndex].price
      }
      if (
        state.cartItems[productIndex]?.product_id === 3 &&
        (state.cartItems[productIndex]?.productQty + 1) % 2 === 0
      ) {
        state.butterOffer -= 1
      }
    },
    getTotal: (state) => {
      // here we simply calculate the total price of the cart product
      // with reduce function
      const { subtotal } = state.cartItems.reduce(
        (cartTotal, cardItem) => {
          const { price, productQty } = cardItem

          const itemTotalPrice = price * productQty
          cartTotal.subtotal += itemTotalPrice

          return cartTotal
        },
        { subtotal: 0 }
      )
      state.cartTotalAmount = subtotal
    }
  }
})

export const { addToCart, incrementQty, decrementQty, getTotal } =
  cartSlice.actions

export default cartSlice.reducer
