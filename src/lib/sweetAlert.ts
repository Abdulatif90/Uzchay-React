/** SweetAlertHandling **/
import Swal from "sweetalert2";
import { Messages } from "./config";

export const sweetErrorHandling = async (err: any) => {
  const error = err.response?.data ?? err;
  const message = error?.message ?? Messages.error1;
  await Swal.fire({
    icon: "error",
    text: message,
    showConfirmButton: false,
  });
};

export const sweetTopSuccessAlert = async (
  msg: string,
  duration: number = 2500
) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
    width: "350px",
    padding: "16px 20px",
    background: "linear-gradient(135deg, #4caf50 0%, #45a049 100%)",
    color: "#ffffff",
    iconColor: "#ffffff",
    customClass: {
      popup: "beautiful-toast-success",
      title: "toast-title-success",
      timerProgressBar: "toast-timer-success"
    }
  });

  Toast.fire({
    icon: "success",
    title: msg,
  }).then();
};

export const sweetTopSmallSuccessAlert = async (
  msg: string,
  duration: number = 2500
) => {
  // Use the same beautiful style as sweetTopSuccessAlert
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: duration,
    timerProgressBar: true,
    width: "350px",
    padding: "16px 20px",
    background: "linear-gradient(135deg, #4caf50 0%, #45a049 100%)",
    color: "#ffffff",
    iconColor: "#ffffff",
    customClass: {
      popup: "beautiful-toast-success",
      title: "toast-title-success",
      timerProgressBar: "toast-timer-success"
    }
  });

  Toast.fire({
    icon: "success",
    title: msg,
  }).then();
};

export const sweetFailureProvider = (
  msg: string,
  show_button: boolean = false,
  forward_url: string = ""
) => {
  Swal.fire({
    icon: "error",
    title: msg,
    showConfirmButton: show_button,
    confirmButtonText: "OK",
  }).then(() => {
    if (forward_url !== "") {
      window.location.replace(forward_url);
    }
  });
};