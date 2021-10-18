import { Link } from "react-router-dom";

export default function Login(props) {
    
    return (
        <>
            <h2 className="font-bold text-2xl uppercase text-center mb-6">Welcome to Our mart!</h2>
            <div class="card bordered w-4/12 m-auto shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Login</h2>
                    <div class="form-control mt-4">
                        <label class="label">
                            <span class="label-text">Phone number or Email</span>
                        </label>
                        <input className="input input-bordered rounded-sm" placeholder="Please enter your email or phone number" />
                    </div>
                    <div class="form-control mt-4">
                        <label class="label">
                            <span class="label-text">Password</span>
                        </label>
                        <input className="input input-bordered rounded-sm" placeholder="Please enter your password" />
                    </div>
                    <div class="justify-end card-actions">
                        <button class="btn btn-block btn-primary mb-6">Login</button>
                        <p>New member? <Link to="/" className="text-blue-800 font-bold">Register</Link> here.</p>
                        <Link to="/" className="text-blue-800 font-bold ">Forgot Password</Link>
                    </div>
                </div>
            </div>
        </>
    )
}