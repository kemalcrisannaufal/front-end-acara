import { ITicket } from "@/src/types/Ticket";
import instance from "../libs/axios/instance";
import { IEvent } from "../types/Event";
import endpoint from "./endpoint.constant";

const eventServices = {
  getEventById: (id: string) => instance.get(`${endpoint.EVENT}/${id}`),
  getEventBySlug: (slug: string) =>
    instance.get(`${endpoint.EVENT}/${slug}/slug`),
  getEvents: (params: string) => instance.get(`${endpoint.EVENT}?${params}`),
  addEvent: (payload: IEvent) => instance.post(`${endpoint.EVENT}`, payload),
  updateEvent: (id: string, payload: IEvent) =>
    instance.put(`${endpoint.EVENT}/${id}`, payload),
  deleteEvent: (id: string) => instance.delete(`${endpoint.EVENT}/${id}`),

  searchLocationByRegency: (name: string) =>
    instance.get(`${endpoint.REGION}-search?name=${name}`),
  getRegencyById: (id: string) =>
    instance.get(`${endpoint.REGION}/${id}/regency`),

  createTicket: (payload: ITicket) =>
    instance.post(`${endpoint.TICKET}`, payload),
  getTickets: (params: string) => instance.get(`${endpoint.TICKET}?${params}`),
  getTicketsById: (id: string) => instance.get(`${endpoint.TICKET}/${id}`),
  getTicketsByEventId: (eventId: string) =>
    instance.get(`${endpoint.TICKET}/${eventId}/event`),
  updateTicket: (id: string, payload: ITicket) =>
    instance.put(`${endpoint.TICKET}/${id}`, payload),
  deleteTicket: (id: string) => instance.delete(`${endpoint.TICKET}/${id}`),
};

export default eventServices;
