import { Link } from "react-router-dom";

import { initializeApp } from 'firebase/app';
import { useState, useEffect } from "react";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import Alert from "../components/Alert";
import { setUser } from "../Auth/User";
// import { getAnalytics } from "firebase/analytics";

export default function Register(props) {

    const [phoneNumber, setPhoneNumber] = useState()
    const [verifyNumber, setVerifyNumber] = useState()
    const [isSendingOTP, setIsSendingOTP] = useState(false)
    const [isVerifying, setIsVerifying] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const [openAlert, setOpenAlert] = useState(false)
    const [invalidPhoneError, setInvalidPhoneError] = useState(false)
    const [invalidOTPError, setInvalidOTPError] = useState(false)
    const [otpButtonEnabled, setEnableOTPButton] = useState(false)
    const [resendSeconds, setResendSeconds] = useState(1000*60)
    const [showTimer, setShowTimer] = useState(false)
    const [alertMessage, setAlertMessage] = useState("")

    const firebaseConfig = {
        apiKey: "AIzaSyB3yIBn1xRke0CmxVoRAxSLOvZ5p3FZMgA",
        authDomain: "mart-5dd72.firebaseapp.com",
        projectId: "mart-5dd72",
        storageBucket: "mart-5dd72.appspot.com",
        messagingSenderId: "337891776150",
        appId: "1:337891776150:web:90c64c85b92afae05954b7",
        measurementId: "G-SF5TQR84D1"
    };


    const app = initializeApp(firebaseConfig);
    // if (!app.length) {
    //     initializeApp(firebaseConfig);
    // }
    const auth = getAuth(app);
    useEffect(() => {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'invisible',
        }, auth);
    }, []);



    const handlePhoneNumberChanged = (e)=>{
        if (e.target.value.length >6) {
            setEnableOTPButton(true) 
        }else{
            setEnableOTPButton(false) 
        }
        setPhoneNumber(e.target.value);
    }
    const loginSubmit = (e) => {
        e.preventDefault();
        setIsSendingOTP(true)
        signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
            .then((confirmationResult) => {
                // SMS sent. Prompt user to type the code from the message, then sign the
                // user in with confirmationResult.confirm(code).
                console.log("otp sent");
                // setViewOtpForm(true);
                window.confirmationResult = confirmationResult;
                // ...
                setIsSendingOTP(false)
                setOtpSent(true)
                setInvalidPhoneError(false)
                setOpenAlert(false);
                setShowTimer(true)
            })
            .catch((error) => {
                // Error; SMS not sent
                // ...
                setIsSendingOTP(false)
                setOtpSent(false)
                setInvalidPhoneError(true)
                setAlertMessage(["Error! SMS not Sent"])
                setOpenAlert(true);
                // console.log(error.message);
            });


    };

    const otpSubmit = (e) => {
        e.preventDefault();
        setIsVerifying(true)
        let opt_number = verifyNumber;

        window.confirmationResult
            .confirm(opt_number)
            .then((confirmationResult) => {
                setUser(confirmationResult.user.accessToken)
                // console.log("success");
                // window.open("/", "_self");
                setIsVerifying(false)
                setInvalidOTPError(false)
            })
            .catch((error) => {
                // User couldn't sign in (bad verification code?)
                setAlertMessage(["Invalid OTP! Please Enter Correct OTP"])
                setOpenAlert(true)
                setIsVerifying(false)
                setInvalidOTPError(true)
            });
    };

    //   const signOut = () => {
    //     firebase
    //       .auth()
    //       .signOut()
    //       .then(() => {
    //         window.open("/signin", "_self");
    //       })
    //       .catch((error) => {
    //         // An error happened.
    //         console.log(error);
    //       });
    //   };

    var timer;
    
    const onAlertClose = ()=>{

    }

    useEffect(()=>{
        if (showTimer) {
            
            const timer = setTimeout(()=>{
                setResendSeconds(resendSeconds-1000)
            },1000)

            if (resendSeconds <= 0) {
                clearTimeout(timer)
            }
            // console.log(resendSeconds/1000);
        }
        return()=>{
            
        }
    })
    return (
        <>
        <Alert open={openAlert} onClose={onAlertClose} type="error" children={alertMessage}/>
            <div id="recaptcha-container"></div>
            <h2 className="font-bold text-2xl uppercase text-center mb-6">Welcome to Our mart!</h2>
            <div class="card bordered w-4/12 m-auto shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Login</h2>
                    <div class="form-control mt-2">
                        <label class="label">
                            <span class="label-text">Phone</span>
                        </label>
                        <input className="input input-bordered rounded-sm" placeholder="Please enter phone number" value={phoneNumber} onChange={handlePhoneNumberChanged} />
                        {invalidPhoneError && <label class="label">
                            <span class="label-text-alt text-red-600">Error! SMS not Sent</span>
                        </label>}
                    </div>
                    {otpSent && <div class="form-control mt-2">
                        <label class="label">
                            <span class="label-text">Verification Code</span>
                        </label>
                        <input className="input input-bordered rounded-sm" placeholder="Please enter verification code" value={verifyNumber} onChange={(e) => setVerifyNumber(e.target.value)} />
                        {invalidOTPError && <label class="label">
                            <span class="label-text-alt text-red-600">Invalid otp</span>
                        </label>}
                    </div>}

                    <div class="mt-4">
                        <button class={"btn btn-block btn-primary mb-2 " + `${isSendingOTP && 'loading'}`} disabled={isSendingOTP || !otpButtonEnabled || (otpSent && resendSeconds/1000>0)} onClick={loginSubmit}>{otpSent ? resendSeconds/1000>0?"Resend OTP ("+resendSeconds/1000+")":"Resend OTP": "Send OTP"}</button>
                        {otpSent && <button class={"btn btn-block btn-secondary mb-2 " + `${isVerifying && 'loading'}`} disabled={isVerifying} onClick={otpSubmit}>Verify</button>}
                        {/* <p>Already member? <Link to="/" className="text-blue-800 font-bold">Login</Link> here.</p> */}
                    </div>
                </div>
            </div>
        </>
    )
}