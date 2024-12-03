import { useNavigate } from "react-router-dom";

// import errorArt from '../../assets/images/error/error-art.webp'

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5 error-page">
      {/* <img src={errorArt} alt="error" className="object-contain w-80 2xl:w-96" /> */}
      <h1>Page Not Found</h1>
      <p>We can’t find the page that you’re looking for...</p>
      <button onClick={() => navigate("/")} className="error-page-btn">
        Back to Dashboard
      </button>
    </div>
  );
};

export default ErrorPage;
