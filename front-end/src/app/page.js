"use client";

import "./globals.scss";
import React, { useState, useEffect } from "react";
import { Button, EventCard, EventModal, Header } from "@/components";
import { decodeToken, isTokenExpired } from "@/utils/tokenHelper";
import { DeleteEvent, GetEvents } from "@/service/event.service";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [user, setUser] = useState();

  useEffect(() => {
    const HandleUserToken = async () => {
      if (isTokenExpired()) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      } else {
        try {
          const user = decodeToken();
          setUser(user);
        } catch (error) {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
    };
    const handleEvents = async () => {
      const getEvents = await GetEvents();
      setEvents(getEvents.data);
    };
    HandleUserToken();
    handleEvents();
  }, []);

  const HandleDeleteCard = async (data) => {
    const userConfirmed = confirm(
      "Tem certeza de que deseja excluir esta entrada? Esta ação não poderá ser desfeita."
    );

    if (userConfirmed) {
      await DeleteEvent(data.id);
      window.location.reload();
    } else {
      console.log("Ação de exclusão cancelada.");
    }
  };

  const HandleEditCard = (data) => {
    setModalData(data);
    setModalOpen(true);
  };

  const HandleCreateEvent = () => {
    setModalData(null);
    setModalOpen(true);
  };

  return (
    <div className="main-home-container">
      <Header userName={user?.name} />

      {isModalOpen && (
        <EventModal
          onClose={() => setModalOpen(false)}
          initialData={modalData}
        />
      )}

      <div>
        <div className="events-header">
          <h1>Eventos</h1>
          <Button
            onClick={HandleCreateEvent}
            label={"Criar evento"}
            className="primary-button"
          />
        </div>
        <div className="events-cards-container">
          {events?.length > 0 ? (
            events.map((event, index) => (
              <EventCard
                key={index}
                event={event}
                onDelete={() => HandleDeleteCard(event)}
                onEdit={() => HandleEditCard(event)}
              />
            ))
          ) : (
            <p>Sem eventos criados</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
