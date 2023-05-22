"use client";
import React, { useEffect, useState } from "react";
import CartContext from "./cartContext";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import { redirect } from "next/navigation";

const CartState = (props) => {
  const [cart, setcart] = useState(
    localStorage.getItem("cart") ? localStorage.getItem("cart") : {}
  );
  const [subtotal, setsubTotal] = useState(0);
  const [user, setUser] = useState({ value: null });

  const currentPath = usePathname();
  const router = useRouter();

  useEffect(() => {
    try {
      if (localStorage.getItem("cart")) {
        setcart(JSON.parse(localStorage.getItem("cart")));
        saveCart(JSON.parse(localStorage.getItem("cart")));
      }
    } catch (error) {
      localStorage.clear();
      console.error(error);
    }

    const token = localStorage.getItem("token"); // fetching token
    if (token) {
      setUser({ value: token }); // if token is present then setUser(Token is set in Login Page on User Successfull login)
    } else {
      setUser({ value: null }); // if token is not present then setUser null
    }
  }, [currentPath]); // useEffect runs on every path changes

  // saves cart in local storage
  const saveCart = (cart) => {
    localStorage.setItem("cart", JSON.stringify(cart)); // setting cart in local storage
    let subt = 0;
    let keys = Object.keys(cart);
    for (let i = 0; i < keys.length; i++) {
      subt += cart[keys[i]]["price"] * cart[keys[i]].qty; // setting subtotal of cart items
    }
    setsubTotal(subt);
    // document.cookie = `cart=${JSON.stringify(cart)};path=/`;
  };

  // Logout Function
  const logout = () => {
    document.cookie = `token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`; // Deleting Token Cookie
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    router.push(`${process.env.NEXT_PUBLIC_HOST}/login`);
  };

  // adds the item to cart
  const addToCart = (itemCode, qty, price, name, size, variant, img) => {
    let newCart = cart;
    if (cart && itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty + qty; // if item present in cart then add quantity to its quantity
    } else {
      newCart[itemCode] = { qty: 1, price, name, size, variant, img }; // if not add in cart with parameters
    }
    setcart(newCart); // setting cart
    saveCart(newCart); // saving cart
    toast.success("Added To Cart Successfully!");
  };

  // removes the item from cart
  const removeFromCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart;
    if (itemCode in cart) {
      delete newCart[itemCode];
    }
    setcart(newCart);
    saveCart(newCart);
  };

  // AddQuantity function adds the qty when user + the product
  const addQuantity = (itemCode) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty + 1;
    }
    setcart(newCart);
    saveCart(newCart);
  };

  // subtractQuantity function subtract the qty when user - the product
  const subtractQuantity = (itemCode) => {
    let newCart = cart;
    if (itemCode in cart) {
      newCart[itemCode].qty = newCart[itemCode].qty - 1;
    }
    if (newCart[itemCode].qty <= 0) {
      delete newCart[itemCode];
    }
    setcart(newCart);
    saveCart(newCart);
  };

  // buyNow removes all the products from cart and add the buy now product and proceed to checkoutwhich is given in buynow button onClick func
  const buyNow = (price, name, size, variant, img) => {
    let newCart = { item: { qty: 1, price, name, size, variant, img } };
    setcart(newCart);
    saveCart(newCart);
  };

  // clearCart clears all the items from the cart
  const clearCart = () => {
    setcart({});
    saveCart({});
  };

  return (
    <CartContext.Provider
      value={{
        user,
        logout,
        cart,
        subtotal,
        addToCart,
        removeFromCart,
        clearCart,
        addQuantity,
        subtractQuantity,
        buyNow,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export default CartState;
