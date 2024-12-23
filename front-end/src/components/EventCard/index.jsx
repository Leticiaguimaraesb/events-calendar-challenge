import React from "react";
import Delete from "../../../public/delete.svg";
import Edit from "../../../public/edit.svg";
import "./eventCard.scss";
import { Button } from "..";

const EventCard = ({ event, onEdit, onDelete }) => {
  const { start, end, title, description } = event;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
    });

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const formattedStartDate = formatDate(start);
  const formattedEndDate = formatDate(end);
  const formattedStartTime = formatTime(start);
  const formattedEndTime = formatTime(end);

  const areDatesEqual = formattedStartDate === formattedEndDate;

  return (
    <div className="event-card">
      <div className="event-card-date">
        <p className="event-card-date-day">
          {areDatesEqual
            ? formattedStartDate
            : `${formattedStartDate} - ${formattedEndDate}`}
        </p>
        <p className="event-card-date-time">
          {formattedStartTime} - {formattedEndTime}
        </p>
      </div>
      <div className="event-card-content">
        <div className="event-card-details">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="event-card-actions">
          <Button icon={Edit} onClick={onEdit} className="icon-button" />
          <Button icon={Delete} onClick={onDelete} className="icon-button" />
        </div>
      </div>
    </div>
  );
};

export default EventCard;
