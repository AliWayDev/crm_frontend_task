import { ToastContainer } from "react-toastify";
import { IndexRoutes } from "./routes";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <IndexRoutes />
      <div className="absolute">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
