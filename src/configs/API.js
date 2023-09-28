import axios from "axios";
import cookie from "react-cookies"

export const endpoints = {
    'categories': '/categories/',
    'products': '/products/',
    'product-detail': (productId) => `/products/${productId}`,
    'login':'/o/token/',
    'current-user':'/users/current-user',
    'current-business': '/business/current-business/',
    'colors': '/colors/',
    'sizes': '/sizes/',
    'add-to-cart': (productId) => `/products/${productId}/add-to-cart/`,
    'cart-detail': '/cart/cart-detail/',
    'update-cart-detail' : (cartId) => `/cart-detail/${cartId}/`,
    'delete-cart' : (cartId) => `/cart-detail/${cartId}/`,
    'order': '/order/',
    'get-order': (orderId) => `/order/${orderId}/`,
    'order-detail-all': (orderId) => `/order/${orderId}/order-detail`,
    'user-order': '/order/get-user-order/',
    'order-detail': '/order-detail/',
    'get-product-review': (productId) => `/products/${productId}/list-review/`,
    'post-product-review': (productId) => `/products/${productId}/review/`,
    'like-product' : (productId) => `/products/${productId}/like/`,
    'get-like' : (productId) => `/products/${productId}/get-like/`,
    'register-user': '/users/',
    'register-business' : '/business/',
    'shop' : '/shop/',
    'get-business-shop': (businessId) => `/business/${businessId}/get-shop/`, 
    'get-products-shop': (shopId) => `/shop/${shopId}/get-products/`,
    'update-product': (productId) => `/products/${productId}/`,
    'stats-count' : '/stats/stats-count/',
    'stats-order-by-month': '/stats/order-by-month/'
}

export const authAPI = () => axios.create({
    baseURL: "http://127.0.0.1:8000/",
    headers: {
        "Authorization": `Bearer ${cookie.load('access_token')}`
    }
})

export default axios.create({
    baseURL: "http://127.0.0.1:8000/"
})