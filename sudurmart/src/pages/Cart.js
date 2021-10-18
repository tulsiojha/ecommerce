import { useEffect, useState } from "react"
import { fetchMiddle } from "../fetchMiddle"
import { useNavigate } from 'react-router-dom';
import {getUser} from "../Auth/User"

export default function Cart(props) {
    const [update, setUpdate] = useState(false);
    const [cart, setCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    // const navigate = useNavigate();

    const getCart = async () => {
        const result = await fetchMiddle("http://127.0.0.1:8000/get_cart",{
            headers:{
                'Authorization': `Token ${getUser()}`,
              }
        });
        if (result != null) {
            setCart(result)
            setUpdate(true)
        }
    }

    const getTotalPrice = ()=>{
        let price = 0;
        cart.map((item)=>{
            price += item.product.sellingPrice *item.quantity;
        })
        setTotalPrice(price)
    }
    useEffect(() => {
        getCart()
        if (update) {
            getTotalPrice()
        }
        return () => {
        }
    }, [update])


    const generateQuantity = (item, stocks)=>{
        console.log(item);
        var q = []
        for (let i = 1; i <= (stocks>5?5:stocks); i++) {
            q.push(<option>{i}</option>)
        }
        return q;
    }
    return (
        <div className="w-10/12 m-auto">
            <h2 className="text-4xl font-bold uppercase font-sans mb-6">Your Bag</h2>
            <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                    {cart.map((item, index)=>                    
                    <div className=" border border-1 border-black flex flex-row justify-between h-56 mb-4">
                        <img className="w-56 object-contain" src={item.product.cover} />
                        <div className="p-4 flex flex-row">
                            <div className="flex flex-col justify-between">
                                <div>
                                    <p>{item.product.name}</p>
                                    <span className="font-semibold mr-2">Rs. {item.product.sellingPrice}</span>
                                    <span className="font-semibold line-through opacity-70 ml-2 ">Rs. {item.product.marketPrice}</span>
                                </div>
                                <select class="select select-bordered w-full max-w-xs select-sm rounded-sm">
                                {generateQuantity(item, item.product.stocks)}
                                </select>
                            </div>
                            <div className="flex flex-col">
                                <button class="btn btn-ghost btn-sm hover:bg-transparent hover:opacity-80">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                                <button class="btn btn-ghost btn-sm hover:bg-transparent hover:opacity-80">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>)}
                </div>
                <div className="border border-1 border-black border-opacity-30 p-4 h-fit">
                    <h3 className="text-xl font-bold uppercase font-sans">order summary</h3>
                    <div className="flex flex-row justify-between my-4">
                        <span><span>1 </span><span>ITEM</span></span><span>Rs. 999</span>
                    </div>
                    <div className="flex flex-row justify-between my-4">
                        <span>DELEVIRY</span><span>FREE</span>
                    </div>
                    <div className="flex flex-row justify-between my-4 font-bold">
                        <span>TOTAL</span><span>Rs. {totalPrice}</span>
                    </div>
                    <button className="btn btn-block">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    )
}