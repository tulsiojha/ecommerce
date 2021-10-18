export default function ShippingDetail(props) {
    return (
        <div className="w-11/12 m-auto grid grid-cols-3 gap-3">
            <div className="col-span-2">
                <h3 className="text-2xl font-bold uppercase font-sans mb-6">Shipping Address</h3>
                <div className="flex flex-row gap-3">
                    <div class="form-control flex-1">
                        <label class="label">
                            <span class="label-text">First name</span>
                        </label>
                        <input type="text" placeholder="First name" class="input input-bordered rounded-none" />
                    </div>
                    <div class="form-control flex-1">
                        <label class="label">
                            <span class="label-text">Last name</span>
                        </label>
                        <input type="text" placeholder="Last name" class="input input-bordered rounded-none" />
                    </div>
                </div>
                <div class="form-control mb-6 mt-4">
                    <label class="label">
                        <span class="label-text">Find delivery address</span>
                    </label>
                    <input type="text" placeholder="Find delivery address" class="input input-bordered rounded-none" />
                </div>
                <h3 className="text-2xl font-bold uppercase font-sans mb-6">Delivery options</h3>
                <div className="mb-6">
                    <div className="border border-1 border-black p-4 mb-4">
                        <div className="flex flex-row justify-between mb-2">
                            <h4 className="font-bold text-md uppercase">Standard Delivery</h4>
                            <span>FREE</span>
                        </div>
                        <span>4-8 Days Delivery</span>
                    </div>
                    <div className="border border-1 border-black border-opacity-30 p-4">
                        <div className="flex flex-row justify-between mb-2">
                            <h4 className="font-bold text-md uppercase">Express Delivery</h4>
                            <span>Rs. 100</span>
                        </div>
                        <span>1 Day Delivery</span>
                    </div>
                </div>
                <h3 className="text-2xl font-bold uppercase font-sans mb-6">Contact Details</h3>
                <p className="mb-4">We'll use these details to keep you informed on your delivery.</p>
                <div class="form-control">
                    <label class="label">
                        <span class="label-text">Phone Number</span>
                    </label>
                    <input type="text" placeholder="Phone Number" class="input input-bordered rounded-none" />
                </div>
                <div class="form-control mt-4 mb-6">
                    <label class="label">
                        <span class="label-text">Email Address</span>
                    </label>
                    <input type="text" placeholder="Email Address" class="input input-bordered rounded-none" />
                </div>
            </div>
            <div>
                <div className="border border-1 border-black border-opacity-30 p-4 h-fit mb-6">
                    <h3 className="text-xl font-bold uppercase font-sans">order summary</h3>
                    <div className="flex flex-row justify-between my-4">
                        <span><span>1 </span><span>ITEM</span></span><span>Rs. 999</span>
                    </div>
                    <div className="flex flex-row justify-between my-4">
                        <span>DELEVIRY</span><span>FREE</span>
                    </div>
                    <div className="flex flex-row justify-between my-4 font-bold">
                        <span>TOTAL</span><span>Rs. 999</span>
                    </div>
                    <button className="btn btn-block">Proceed to Checkout</button>
                </div>
                <div className="p-4 h-fit border-t-2 border-opacity-30 border-black">
                    <h3 className="text-xl font-bold uppercase font-sans mb-4">order Details</h3>
                    <div className="flex flex-row">
                        <img className="w-24 h-24" src="https://assets.adidas.com/images/w_280,h_280,f_auto,q_auto:sensitive/081cac5ee8424b2d8bb4ad16017134a1_9366/GV7723_610_GV7723_01_standard.jpg.jpg?sh=364&strip=false&sw=364" />
                        <div className="text-sm flex flex-col justify-between px-2 py-1">
                            <p>Skechers Women&#39;s Plush-Peace and Love Flat</p>
                            <p className="">Quantity: 1</p>
                            <div>
                                <span className="font-semibold mr-2">Rs. 999</span>
                                <span className="font-semibold line-through opacity-70 ml-2 ">Rs. 1000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}