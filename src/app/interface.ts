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
    imageUrl:string,
    description:string
}