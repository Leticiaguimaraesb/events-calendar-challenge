"use client";

import React from "react";
import { useForm } from "react-hook-form";
import "./page.scss";
import { CreateUser } from "@/service/auth.service";

export default function CreateUserPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", password: "", passwordConfirmation: "" },
  });

  const onSubmit = async (data) => {
    const { password, passwordConfirmation } = data;

    if (password !== passwordConfirmation) {
      alert("As senhas não coincidem. Por favor, verifique.");
      return;
    }

    try {
      const request = await CreateUser(data);

      if (request.success === true) {
        window.location.href = "/login";
      } else {
        alert(request.message);
      }
    } catch (error) {
      alert(
        "Não foi possível criar o usuário, verifique suas informações e tente novamente."
      );
    }
  };

  return (
    <div className="signup-modal">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Criar Usuário</h2>
        <div className="form-group">
          <label htmlFor="name">Nome</label>
          <input
            id="name"
            type="text"
            {...register("name", {
              required: "O nome de usuário é obrigatório.",
            })}
            aria-invalid={errors.name ? "true" : "false"}
          />
          {errors.name && <p className="error">{errors.name.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register("email", {
              required: "O nome de usuário é obrigatório.",
            })}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && <p className="error">{errors.email.message}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "A senha é obrigatória." })}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="passwordConfirmation">Confirme a Senha</label>
          <input
            id="passwordConfirmation"
            type="password"
            {...register("passwordConfirmation", {
              required: "A confirmação de senha é obrigatória.",
              validate: (value) =>
                value === watch("password") || "As senhas não coincidem.",
            })}
            aria-invalid={errors.passwordConfirmation ? "true" : "false"}
          />
          {errors.passwordConfirmation && (
            <p className="error">{errors.passwordConfirmation.message}</p>
          )}
        </div>
        <button type="submit">Criar Conta</button>
      </form>
    </div>
  );
}
