export interface Login{
    email:string
    password:string,
    
}
export interface SignUp{
    username:string,
    email:string,
    password:string
}
export interface Product{
    name:string,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string,
    id:string,
    quantity:undefined|number,
    productId:undefined|number
   
}
export interface Cart{
    name:string,
    price:number,
    category:string,
    color:string,
    image:string,
    description:string,
    id:string|undefined
    userId:string|undefined,
    quantity:undefined|number,
    productId:string
   
}
export interface CartSummary{
    price:number,
    discount:number,
    tax:number,
    delivery:number,
    total:number
}
export interface Checkout{
    firstName:string,
    lastName:string,
    email:string,
    address:string,
    address2:string,
    contact:string
}
export interface order{
    
    userId:string,
    email:string,
    address:string,
    totalPrice:number,
    contact:string
}