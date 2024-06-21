import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastSuccess = (message) => {
  toast.success(message, {
    // position: "top-right",
    // autoClose: 5000,
    // hideProgressBar: false,
    // closeOnClick: true,
    // pauseOnHover: true,
    // draggable: true,
    // progress: undefined,
    // theme: "colored",
  });
};

export const ToastError =(message)=>{
  toast.error(message);
}
export const ToastWarning =(message)=>{
  toast.warning(message);
}

function ToastSetting() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        theme="colored"
      />
    </div>
  );
}

export default ToastSetting;
