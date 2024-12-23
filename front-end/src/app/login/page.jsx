"use client";

import React from "react";
import { useForm } from "react-hook-form";
import "./page.scss";
import { Button } from "@/components";
import { UserLogin } from "@/service/auth.service";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data) => {
    try {
      const request = await UserLogin(data);
      if (request.success === true) {
        localStorage.setItem("token", request.data.access_token);
        window.location.href = "/";
      } else {
        throw new Error(request.message);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="login-modal">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Usuário</label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "O usuário é obrigatório." })}
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
        <Button label={"Entrar"} className="primary-button" type={"submit"} />
        <Button
          label={"Cadastrar-se"}
          onClick={() => (window.location.href = "/signup")}
          type={"button"}
        />
      </form>
    </div>
  );
}
