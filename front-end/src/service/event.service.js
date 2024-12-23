import { getAuthHeader } from "@/utils/authHelper";
import axios from "axios";

const GetEvents = async () => {
  const route = process.env.NEXT_PUBLIC_BASE_ROUTE;
  try {
    const response = await axios.get(`${route}/event`, {
      headers: getAuthHeader(),
    });

    if (response.status === 200) {
      return {
        success: true,
        message: "Eventos buscados com sucesso.",
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: `Erro ao buscar eventos. Status: ${response.status}`,
      };
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        return {
          success: false,
          message: "Não autorizado. Verifique seu token.",
        };
      } else if (error.response.status === 404) {
        return {
          success: false,
          message: "Eventos não encontrados.",
        };
      } else if (error.response.status === 500) {
        return {
          success: false,
          message: "Erro interno no servidor. Tente novamente mais tarde.",
        };
      } else {
        return {
          success: false,
          message: `Erro desconhecido: ${error.response.status}`,
        };
      }
    } else {
      return {
        success: false,
        message: `Erro ao realizar a requisição: ${error.message}`,
      };
    }
  }
};

const CreateEvent = async (data) => {
  const route = process.env.NEXT_PUBLIC_BASE_ROUTE;
  try {
    const response = await axios.post(`${route}/event`, data, {
      headers: getAuthHeader(),
    });

    if (response.status === 201) {
      return {
        success: true,
        message: "Evento criado com sucesso",
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: "Erro ao criar Evento",
      };
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 409) {
        return {
          success: false,
          message: "Conflito: Já existe um evento para esta data",
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

const DeleteEvent = async (eventId) => {
  const route = process.env.NEXT_PUBLIC_BASE_ROUTE;
  try {
    const response = await axios.delete(`${route}/event/${eventId}`, {
      headers: getAuthHeader(),
    });

    if (response.status === 201) {
      return {
        success: true,
        message: "Evento deletado com sucesso",
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: "Erro ao deletar Evento",
      };
    }
  } catch (error) {
    return {
      success: false,
      message: "Erro de rede ou outros problemas",
    };
  }
};

const EditEvent = async (eventId, data) => {
  try {
    const response = await axios.put(
      `http://localhost:3002/event/${eventId}`,
      data,
      {
        headers: getAuthHeader(),
      }
    );

    console.log(response);
    if (response.status === 200) {
      return {
        success: true,
        message: "Evento alterado com sucesso",
        data: response.data,
      };
    } else {
      return {
        success: false,
        message: "Erro ao alterar Evento",
      };
    }
  } catch (error) {
    if (error.response) {
      if (error.response.status === 400) {
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

export { GetEvents, CreateEvent, DeleteEvent, EditEvent };
