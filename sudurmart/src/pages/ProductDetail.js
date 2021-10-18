import { useEffect, useState } from "react"
import { fetchMiddle } from "../fetchMiddle"
import { useNavigate, useParams } from 'react-router-dom';
import { getUser } from "../Auth/User";
import Stepper from "../components/Stepper";

export default function ProductDetail(props) {
    const [item, setItem] = useState({})
    const [quantity, setQuantity] = useState(1)

    const navigate = useNavigate();
    const params = useParams();

    const getItem = async () => {
        const result = await fetchMiddle("http://127.0.0.1:8000/get_product/" + params.id + "/",{
            
            headers:{
                'Authorization': `Token ${getUser()}`,
              }
        });
        if (result != null) {
            setItem(result)
        }
    }

    const getItem = async () => {
        const result = await fetchMiddle("http://127.0.0.1:8000/get_product/" + params.id + "/",{
            
            headers:{
                'Authorization': `Token ${getUser()}`,
              }
        });
        if (result != null) {
            setItem(result)
        }
    }


    const addToCart = async () => {
        const result = await fetchMiddle("http://127.0.0.1:8000/add_to_cart",{
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Token ${getUser()}`
            },
              body:JSON.stringify(prepareItem()) 
        });
        navigate("/cart")
    }

    const handleOnQuantityChange = (e) =>{
        // setQuantity()
        if (quantity < item.quantity) {
            setQuantity(e.target.value)
        }
    }

    const prepareItem = ()=>{
        var data = {}
        data.quantity = quantity;
        data.product = params.id;
        return data;
    }

    useEffect(() => {
        getItem()
        // console.log(location);
        return () => {
        }
    }, [])

    const generateQuantity = ()=>{
        console.log(item);
        var q = []
        for (let i = 1; i <= (item.stocks>5?5:item.stocks); i++) {
            q.push(<option>{i}</option>)
        }
        return q;
    }
    return (
        <div className="w-9/12 m-auto border-solid border-2 p-4">
            <div className="grid grid-cols-3">
                <div className="col-span-2 flex flex-col justify-between">
                    <img src={item.cover} className="self-center flex-1 object-contain w-96 h-96" />
                    <div className="flex flex-row gap-4 justify-between mr-10">
                        <div className="w-20 h-20"><img className="w-full h-full object-contain" src="https://m.media-amazon.com/images/I/81XiBODC84L._AC_UX395_.jpg" /></div>
                        <div className="w-20 h-20"><img className="w-full h-full object-contain" src="https://m.media-amazon.com/images/I/81XiBODC84L._AC_UX395_.jpg" /></div>
                        <div className="w-20 h-20"><img className="w-full h-full object-contain" src="https://m.media-amazon.com/images/I/81XiBODC84L._AC_UX395_.jpg" /></div>
                        <div className="w-20 h-20"><img className="w-full h-full object-contain" src="https://m.media-amazon.com/images/I/81XiBODC84L._AC_UX395_.jpg" /></div>
                        <div className="w-20 h-20"><img className="w-full h-full object-contain" src="https://m.media-amazon.com/images/I/81XiBODC84L._AC_UX395_.jpg" /></div>
                    </div>
                </div>
                <div className="">
                    <h2 className="font-bold text-xl uppercase mb-3">{item.name}</h2>
                    <span className="font-bold mr-4 text-lg  mb-3 inline-block">{item.sellingPrice}</span>
                    <span className="line-through font-semibold text-lg opacity-80  mb-3 inline-block">Rs. 999</span>
                    <p className=" mb-3">{item.description}</p>
                    <span className="font-bold mb-3 text-xs inline-block">Select Size</span>
                    <select class="select select-bordered w-full max-w-xs select-sm rounded-sm">
                        <option disabled="disabled" selected="selected">47</option>
                        <option>36</option>
                        <option>32</option>
                        <option>25</option>
                    </select>
                    <span className="font-bold mb-3 text-xs inline-block">Choose Quantity</span>
                    <select class="select select-bordered w-full max-w-xs select-sm rounded-sm" onChange={handleOnQuantityChange}>
                    {generateQuantity()}
                    </select>
                    <div className="flex flex-row mt-4">
                        <button className="btn mr-1 btn-sm w-full flex-1 rounded-sm bg-black" onClick={addToCart}>Add to cart</button>
                        <button className="btn ml-1 btn-sm rounded-sm bg-black">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}