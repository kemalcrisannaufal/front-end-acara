import instance from "../libs/axios/instance";
import { IEvent } from "../types/Event";
import endpoint from "./endpoint.constant";

const eventServices = {
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

  getTickets: (params: string) => instance.get(`${endpoint.TICKET}?${params}`),
  getTicketsByEventId: (eventId: string) =>
    instance.get(`${endpoint.TICKET}/${eventId}/event`),
};

export default eventServices;
