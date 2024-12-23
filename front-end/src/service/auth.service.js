import axios from "axios";

const UserLogin = async (credentials) => {
  const route = process.env.NEXT_PUBLIC_BASE_ROUTE;
  try {
    const response = await axios.post(`${route}/auth`, credentials);

    if (response.status === 200) {
      return {
        success: true,
        message: "Login realizado com sucesso",
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: "Erro no login",
      };
    }
  } catch (error) {
    if (error.response.status === 400) {
      return {
        success: false,
        message: "Credenciais inválidas",
      };
    } else {
      return {
        success: false,
        message: "Erro de rede ou outros problemas",
      };
    }
  }
};

const CreateUser = async (userData) => {
  const route = process.env.NEXT_PUBLIC_BASE_ROUTE;
  try {
    const response = await axios.post(`${route}/auth/register`, userData);

    if (response.status === 201) {
      return {
        success: true,
        message: "Usuário criado com sucesso",
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: "Erro ao criar usuário",
      };
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) {
        return {
          success: false,
          message: "Conflito: O usuário já existe",
        };
      } else if (error.response.status === 400) {
        return {
          success: false,
          message: "Dados inválidos. Verifique os campos.",
        };
      }
    } else {
      return {
        success: false,
        message: "Erro de rede ou outros problemas",
      };
    }
  }
};

export { UserLogin, CreateUser };
