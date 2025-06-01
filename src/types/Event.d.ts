import { ITicket } from "@/src/types/Event";
interface IEvent {
  _id?: string;
  name?: string;
  slug?: string;
  banner?: string | FileList;
  category?: string;
  isFeatured?: boolean;
  isPublish?: boolean;
  isOnline?: boolean;
  description?: string;
  startDate?: string;
  endDate?: string;
  location?: {
    region: string;
    coordinates: number[];
    address: string;
  };
  createdBy?: string;
}

interface IEventForm extends IEvent {
  region?: string;
  latitude?: string;
  longitude?: string;
  address?: string;
  isFeatured?: string;
  isOnline?: string;
  isPublish?: string;
  startDate?: DateValue;
  endDate?: DateValue;
}

interface IRegency {
  id: string;
  name: string;
}

interface ITicket {
  _id?: string;
  name: string;
  event?: string;
  description: string;
  price: number;
  quantity: number;
}

interface ITicketForm extends ITicket {
  price: string;
  quantity: string;
}

export type { IEvent, IEventForm, IRegency, ITicket, ITicketForm };
