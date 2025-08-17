import {toast} from "react-toastify"

export const handleSuccess=(msg)=>{
  toast.success(msg, {
    position: "top-right",
    duration: 3000,
    style: {
      background: "#4CAF50",
      color: "#fff",
    },
  });
}

export const handleError=(msg)=>{
  toast.error(msg, {
    position: "top-right",
    duration: 3000,
    style: {
      background: "#f44336",
      color: "#fff",
    },
  });
}