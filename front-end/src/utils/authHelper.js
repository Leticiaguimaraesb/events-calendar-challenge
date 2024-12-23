export const getToken = () => {
  return localStorage.getItem("token");
};

export const getAuthHeader = () => {
  const token = getToken();
  if (!token) {
    throw new Error("Token não encontrado. O usuário não está autenticado.");
  }

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const logOutUser = async () => {
  const userConfirmed = confirm("Tem certeza de que deseja sair?");

  if (userConfirmed) {
    localStorage.clear();
    window.location.href = "/login";
  }
};
