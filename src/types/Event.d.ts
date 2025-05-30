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
  };
  createdBy?: string;
}

interface IEventForm extends IEvent {
  region?: string;
  latitude?: string;
  longitude?: string;
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

export type { IEvent, IEventForm, IRegency };
