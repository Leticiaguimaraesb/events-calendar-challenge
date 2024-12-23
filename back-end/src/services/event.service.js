import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createEvent = async (data) => {
  try {
    const { force, ...eventData } = data;
    const conflicts = await checkForConflict(eventData.start, eventData.end);
    if (conflicts && !force) {
      throw new Error("Event conflicts with existing events, use force mode.", {
        cause: "conflict",
      });
    }
    const response = await prisma.event.create({
      data: eventData,
      include: {
        userEvents: true,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const findManyEvents = async () => {
  try {
    const response = await prisma.event.findMany({
      where: { deletedAt: null },
      include: {
        userEvents: true,
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const findEventById = async (id) => {
  try {
    const response = await prisma.event.findUniqueOrThrow({
      where: { id, deletedAt: null },
      include: {
        userEvents: true,
      },
    });
    return response;
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("Event not found.", { cause: "not_found" });
    } else throw error;
  }
};

const updateEvent = async (id, data) => {
  const { force, ...eventData } = data;
  try {
    const existingEvent = await prisma.event.findUniqueOrThrow({
      where: { id, deletedAt: null },
    });
    if (eventData.start || eventData.end) {
      const start = eventData.start || existingEvent.start;
      const end = eventData.end || existingEvent.end;
      const hasConflicts = await checkForConflict(start, end, id);
      if (hasConflicts && !force) {
        throw new Error(
          "Event conflicts with existing events, use force mode.",
          {
            cause: "conflict",
          }
        );
      }
    }
    const response = await prisma.event.update({
      where: { id, deletedAt: null },
      data: eventData,
      include: {
        userEvents: true,
      },
    });
    return response;
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("Event not found", { cause: "not_found" });
    } else throw error;
  }
};

const deleteEvent = async (id) => {
  try {
    await prisma.event.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() },
    });
  } catch (error) {
    if (error.code === "P2025") {
      throw new Error("Event not found.", { cause: "not_found" });
    } else throw error;
  }
};

const checkForConflict = async (start, end, eventId = null) => {
  const conflicts = await prisma.event.findMany({
    where: {
      AND: [
        { deletedAt: null },
        {
          OR: [
            {
              start: {
                lt: end,
              },
              end: {
                gt: start,
              },
            },
            {
              start: {
                equals: start,
              },
              end: {
                equals: end,
              },
            },
          ],
        },
        eventId ? { id: { not: eventId } } : {},
      ],
    },
  });
  return conflicts.length > 0;
};

export { createEvent, findManyEvents, findEventById, updateEvent, deleteEvent };
