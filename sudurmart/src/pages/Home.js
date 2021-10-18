import { useEffect, useState } from "react"
import { fetchMiddle } from "../fetchMiddle"
import { useNavigate } from 'react-router-dom';

export default function Home(props) {
    const [products, setProducts] = useState([])

    const navigate = useNavigate();

    const getProducts = async () => {
        const result = await fetchMiddle("http://127.0.0.1:8000/list");
        if (result != null) {
            setProducts(result)
        }
    }
    useEffect(() => {
        getProducts()
        return () => {
        }
    }, [])
    return (
        <div>
            <h4 className="font-bold text-2xl mb-6">New Arrivals</h4>
            <div className="grid grid-cols-4 gap-3 bordered">
                {products.map((item, index) =>
                    <div class="card shadow rounded hover:shadow-2xl cursor-pointer" onClick={() => navigate("product/" + item.id)}>
                        <figure>
                            <img src={item.cover} className="h-44 object-contain p-4 transform hover:scale-105" />
                        </figure>
                        <div class="p-2 flex flex-col">
                            <h2 class="font-semibold text-sm mb-4">{item.name}
                            </h2>
                            <div class="flex flex-row justify-between items-center">
                                <div>
                                    <p className="opacity-60 text-sm ">Price</p>
                                    <p className="font-semibold text-md">Rs. 999</p>
                                </div>
                                <button class="btn btn-outline btn-xs rounded">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>)}
            </div>
            <h4 className="font-bold text-2xl mb-6 mt-12">Just For You</h4>
            <div className="grid grid-cols-4 gap-3 bordered">
                {products.map((item, index) =>
                    <div class="card shadow rounded hover:shadow-2xl cursor-pointer">
                        <figure>
                            <img src={item.cover} className="h-44 object-contain p-4" />
                        </figure>
                        <div class="p-2 flex flex-col">
                            <h2 class="font-semibold text-sm mb-4">{item.name}
                            </h2>
                            <div class="flex flex-row justify-between items-center">
                                <div>
                                    <p className="opacity-60 text-sm ">Price</p>
                                    <p className="font-semibold text-md">Rs. 999</p>
                                </div>
                                <button class="btn btn-outline btn-xs rounded">
                                    Add to cart
                                </button>
                            </div>
                        </div>
                    </div>)}
            </div>
        </div>)
}