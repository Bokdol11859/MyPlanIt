import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "store/axios";
import LoadingScreen from "../globalcomponents/Loading.components";

function GoogleSocial() {
  const navigate = useNavigate();
  useEffect(() => {
    const code = window.location.href.split("=")[1].slice(0, -6);
    console.log(code);
    axios
      .get(`/auth/google?code=${code}`)
      .then((response) => {
        const data = response.data;
        const status = response.status;
        sessionStorage.setItem("access", data.django_token.access);
        localStorage.setItem("refresh", data.django_token.refresh);
        navigate("/todo");
      })
      .catch((error) => {
        console.log(error.message);
      });
  });

  return <LoadingScreen />;
}

export default GoogleSocial;
