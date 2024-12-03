import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import InputField from "../components/inputFields/InputField";
import validate from "validate.js";
import { IoIosArrowBack } from "react-icons/io";
import { emailSchema } from "../Schema/Schema";

// import {forgotPassword} from "./api/index";
import {toast} from 'react-toastify';


const ForgotPassword = () => {
  const intialState = {
    isValid: false,
    touched: {},
    errors: {},
    values: {email:null}
  }
  const [formState, setFormState] = useState({...intialState});
  const schema = {
    email: emailSchema
  };
  useEffect(() => {
    const errors = validate(formState.values, schema);
    setFormState((prevFormState) => ({
      ...prevFormState,
      isValid: !errors,
      errors: errors || {},
    }));
  }, [formState.values, formState.isValid]);

  const hasError = (field) =>
    !!(formState.touched[field] && formState.errors[field]);

    const displayErrorMessage = function (msg) {
      if (msg) {
          if (typeof msg === 'object') {
              if (msg.length == 1) {
                  return msg[0];
              }
              return msg[0].substring(0, msg[0].indexOf('.'));
          }
      }
      return msg;
    };
  const handleChange = event => {
    event.persist();
    setFormState(formState => ({
        ...formState,
        values: {
            ...formState.values,
            email: event.target.value,
        },
        touched: {
          ...formState.touched,
          email: true,
        },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // forgotPassword(formState.values).then(response => {
    //   if(response.data.code === "200"){
    //     toast(response.data?.message, {
    //       position: "top-right",
    //       autoClose: 2000,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       className: "djfy-toast border-gradient",
    //     });
    //   }else{
    //     toast(response.data?.message, {
    //       position: "top-right",
    //       autoClose: 2000,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       className: "djfy-toast border-gradient",
    //     });
    //   }
    // })
  }
  return (
    <>
      <div className='login-container container mx-auto'>
        <div className='grid grid-cols-1 grid-rows-1 lg:grid-cols-3 gap-4 login-wrapper w-full'>
          <div className='col-span-3 lg:col-span-2 hidden lg:flex justify-center items-center w-full lg:p-16'>
            {/* <img src={} alt='Login Cover' /> */}
          </div>

          <div className='col-span-3 lg:col-span-1 flex flex-col justify-center items-center gap-3 p-8 lg:p-16 lg:bg-[#d9d9d940]'>
            <div className='flex flex-col gap-1 w-full mb-5'>
              <Link
                className='brand-logo mb-5'
                to='/'
                onClick={(e) => e.preventDefault()}
              >
                {/* <img src={DJFYText} alt='logo' /> */}
              </Link>
              <div className='font-bold text-2xl'>Forgot Password? 🔒</div>
              <div className='text-sm lg:text-sm'>
              Enter your email and we&apos;ll send you instructions to reset your password
              </div>
            </div>

            <form
              className='flex flex-col gap-5 w-full mb-8'
              // onSubmit={() => handleSubmit()}
            >
              <InputField
                placeholder={"you@example.com"}
                label={"Email"}
                error={hasError('email')}
                errorMsg={displayErrorMessage(formState.errors.email)}
                value={formState.values.email}
                onChange={handleChange}
              />

              <button
                // to={"#"}
                // type='submit'
                onClick={handleSubmit}
                className={`djfy-btn  ${!formState.isValid ? 'disabled' : ""} text-center py-2 rounded-lg`}
                // disabled={!formState.isValid}
              >
                Send Reset Link
              </button>
            </form>
            <Link
                to={"/"}
                type='submit'
                className='text-center py-2 flex gap-2 justify-center items-center'
              >
                <IoIosArrowBack size={20}/>
                Back to login
              </Link>
          </div>
        </div>
      </div>
    </>
  );
  };

export default ForgotPassword;
