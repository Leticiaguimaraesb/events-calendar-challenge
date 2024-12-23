"use client";

import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components";
import "react-datepicker/dist/react-datepicker.css";
import "./eventModal.scss";

import DatePicker from "react-datepicker";
import { CreateEvent, EditEvent, UpdateEvent } from "@/service/event.service";

const validateEventData = ({ startDate, endDate, startTime, endTime }) => {
  if (new Date(endDate) < new Date(startDate)) {
    alert("A data de término não pode ser antes da data de início.");
    return false;
  }

  const startTimeInMinutes =
    parseInt(startTime.split(":")[0]) * 60 + parseInt(startTime.split(":")[1]);
  const endTimeInMinutes =
    parseInt(endTime.split(":")[0]) * 60 + parseInt(endTime.split(":")[1]);

  if (
    new Date(startDate).getTime() === new Date(endDate).getTime() &&
    endTimeInMinutes <= startTimeInMinutes
  ) {
    alert("O horário de término deve ser após o horário de início.");
    return false;
  }

  return true;
};

const EventModal = ({ onClose, initialData }) => {
  const {
    handleSubmit,
    control,
    register,
    setValue,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      startDate: initialData?.startDate || null,
      endDate: initialData?.endDate || null,
      startTime: initialData?.startTime || "",
      endTime: initialData?.endTime || "",
      title: initialData?.title || "",
      description: initialData?.description || "",
    },
    focusOnError: false,
  });

  const mergeDateTime = (date, time) => {
    let dateString = date.toISOString();
    return new Date(
      `${dateString.split("T")[0]}T${time}:00.000Z`
    ).toISOString();
  };

  const onSubmit = async (data) => {
    const { startDate, endDate, startTime, endTime, ...eventData } = data;

    if (!(startDate instanceof Date) || isNaN(startDate.getTime())) {
      alert("A data de início não é válida.");
      return;
    }
    if (!(endDate instanceof Date) || isNaN(endDate.getTime())) {
      alert("A data de término não é válida.");
      return;
    }

    if (!validateEventData(data)) return;

    try {
      const start = mergeDateTime(startDate, startTime);
      const end = mergeDateTime(endDate, endTime);

      const payload = { start, end, ...eventData };

      let response;
      if (initialData) {
        response = await EditEvent(initialData.id, payload);
      } else {
        response = await CreateEvent(payload);
      }

      if (response?.success === true) {
        alert(response?.message);
        window.location.reload();
      } else {
        throw new Error(response?.message);
      }
    } catch (error) {
      alert(error.message || "Erro ao processar o evento.");
    }
  };

  const handleEndDateBlur = () => {
    const startDate = getValues("startDate");
    const endDate = getValues("endDate");
    if (!endDate) {
      setValue("endDate", startDate);
    }
  };

  return (
    <div className="event-modal-container">
      <h2>{initialData ? "Editar Evento" : "Novo Evento"}</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("title", { required: "O título é obrigatório." })}
          type="text"
          placeholder="Adicionar título"
          className="event-title"
          aria-label="Título do evento"
        />
        {errors.title && <p className="error">{errors.title.message}</p>}

        <textarea
          {...register("description", {
            required: "A descrição é obrigatória.",
          })}
          placeholder="Descrição"
          aria-label="Descrição do evento"
        />
        {errors.description && (
          <p className="error">{errors.description.message}</p>
        )}

        <div className="event-date-container">
          <div>
            <label htmlFor="startDate">Data de Início</label>
            <Controller
              name="startDate"
              control={control}
              rules={{ required: "A data de início é obrigatória." }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  selectsStart
                  startDate={getValues("startDate")}
                  endDate={getValues("endDate")}
                  dateFormat="dd/MM/yyyy"
                  autoComplete="off"
                />
              )}
            />
            {errors.startDate && (
              <p className="error">{errors.startDate.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="endDate">Data de Término</label>
            <Controller
              name="endDate"
              control={control}
              rules={{ required: "A data de término é obrigatória." }}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  onBlur={handleEndDateBlur}
                  selectsEnd
                  startDate={getValues("startDate")}
                  endDate={getValues("endDate")}
                  minDate={getValues("startDate")}
                  dateFormat="dd/MM/yyyy"
                  autoComplete="off"
                />
              )}
            />
            {errors.endDate && (
              <p className="error">{errors.endDate.message}</p>
            )}
          </div>
        </div>

        <div className="event-time-container">
          <div>
            <label htmlFor="startTime">Horário de Início</label>
            <input
              {...register("startTime", {
                required: "O horário de início é obrigatório.",
              })}
              type="time"
              aria-label="Horário de início do evento"
            />
            {errors.startTime && (
              <p className="error">{errors.startTime.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="endTime">Horário de Término</label>
            <input
              {...register("endTime", {
                required: "O horário de término é obrigatório.",
              })}
              type="time"
              aria-label="Horário de término do evento"
            />
            {errors.endTime && (
              <p className="error">{errors.endTime.message}</p>
            )}
          </div>
        </div>

        <div className="event-modal-buttons">
          <Button onClick={onClose} label="Cancelar" />
          <Button label="Salvar" className="primary-button" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default EventModal;
