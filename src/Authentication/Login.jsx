import { Link , useNavigate } from "react-router-dom";
import InputPassword from "../components/inputFields/InputPassword";
// import LoginArt from "../../assets/images/login/login-v3.webp";
// import DJFYText from "../../assets/images/logo/djfy-text.webp";
import validate from "validate.js";
import { requiredSchema } from "../Schema/Schema";
import { useState, useEffect } from "react";
import InputField from "../components/inputFields/InputField";
// import {loginAdmin} from "./api/index";
import {toast} from 'react-toastify';
const Login = () => {
  const navigate = useNavigate();
  const initialState = {
    isValid: false,
    touched: {},
    errors: {},
    values: {
        email: localStorage.getItem('email') ? localStorage.getItem('email') : null,
        password: localStorage.getItem('password') ? localStorage.getItem('password'): null,
    }
  };
  const [formState, setFormState] = useState({...initialState});
  const [rememberMe, setRememberMe] = useState(localStorage.getItem('rememberMe') ? true : false);
  const schema = {
    email: {
      presence: { allowEmpty: false, message: "or UserName is required" },
    },
    password: requiredSchema
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
  const handleChangeEmail = event => {
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
  const handleChangePassword = event => {
    event.persist();
    setFormState(formState => ({
        ...formState,
        values: {
            ...formState.values,
            password: event.target.value,
        },
        touched: {
          ...formState.touched,
          password: true,
        },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // loginAdmin(formState.values).then(response => {
    //   if(response.data.code === "200"){
    //     toast(response.data?.message, {
    //       position: "top-right",
    //       autoClose: 2000,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       className: "djfy-toast border-gradient",
    //     });
    //     localStorage.setItem('token', response?.data?.data.token);
    //       navigate('/dashboard');
    //   }else{
    //     toast(response.data?.message, {
    //       position: "top-right",
    //       autoClose: 2000,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       className: "djfy-toast border-gradient",
    //     });
    //     navigate('/');
    //   }
    //   if(rememberMe){
    //     localStorage.setItem('email', formState.values.email)
    //     localStorage.setItem('password', formState.values.password)
    //     localStorage.setItem('rememberMe', true)
    //   }else{
    //     localStorage.removeItem('email')
    //     localStorage.removeItem('password')
    //     localStorage.removeItem('rememberMe')
    //   }
    // })
  };

  const handleRemeberMe = (event) =>{
    setRememberMe(event.target.checked);
  }

  return (
    <div className='login-container container mx-auto'>
      <div className='grid grid-cols-1 grid-rows-1 lg:grid-cols-3 gap-4 login-wrapper w-full'>
        <div className='col-span-3 lg:col-span-2 hidden lg:flex justify-center items-center w-full lg:p-16'>
          {/* <img src={LoginArt} alt='Login Cover' /> */}
        </div>

        <div className='col-span-3 lg:col-span-1 flex flex-col justify-center items-center gap-3 p-8 lg:p-16 lg:bg-[#d9d9d940]'>
          <div className='flex flex-col gap-1 w-full mb-8'>
            <Link
              className='brand-logo mb-5'
              to='/'
              onClick={(e) => e.preventDefault()}
            >
              {/* <img src={DJFYText} alt='logo' /> */}
            </Link>
            <div className='font-bold text-2xl'>DJFY Admin Panel! 👋</div>
            <div className='text-sm lg:text-sm'>
              Please sign-in to your account and start monitoring
            </div>
          </div>

          <form
            className='flex flex-col gap-5 w-full mb-8'
            // onSubmit={handleSubmit}
          >
            <InputField
              placeholder={"Enter your Email or Username"}
              label={"Email or Username"}
              error={hasError('email')}
              errorMsg={displayErrorMessage(formState.errors.email)}
              value={formState.values.email}
              onChange={handleChangeEmail}
            />

            <InputPassword
              label={"Password"}
              placeholder={"Enter your Password"}
              error={hasError('password')}
              errorMsg={displayErrorMessage(formState.errors.password)}
              forgotPassword={true}
              visible={false}
              value={formState.values.password}
              onChange={handleChangePassword}
            />

            <div className='flex justify-start items-center gap-3'>
              <input
                type='checkbox'
                id='remember-me'
                className='form-check-input'
                checked={rememberMe}
                onChange={(e)=>handleRemeberMe(e)}
              />
              <label className='form-check-label' htmlFor='remember-me'>
                Remember Me
              </label>
            </div>

            <button
              type='submit'
              className={` ${!formState.isValid ? 'disabled' : ""} text-center py-2 rounded-lg`}
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
