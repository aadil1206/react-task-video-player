import { useNavigate } from "react-router-dom";


const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-5 error-page">
      <h1>Page Not Found</h1>
      <p>We can’t find the page that you’re looking for...</p>
      <button onClick={() => navigate("/")} className="error-page-btn">
        Back to Dashboard
      </button>
    </div>
  );
};

export default ErrorPage;
