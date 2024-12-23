import { jwtDecode } from "jwt-decode";

export const getToken = () => {
  return localStorage.getItem("token");
};

export const decodeToken = () => {
  const token = getToken();
  if (!token) {
    throw new Error("Token não encontrado no localStorage.");
  }

  try {
    return jwtDecode(token);
  } catch (error) {
    throw new Error("Falha ao decodificar o token.");
  }
};

export const isTokenExpired = () => {
  const token = getToken();
  if (!token) {
    return true;
  }

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp < currentTime;
};
