export interface IEventResponse {
    success: boolean;
    data: {
      highlights: IEventData[];
      other: IEventData[];
    };
  }
  export interface IEventNameResponse {
    success: boolean;
    data: any;
  }
  export interface IGetCoordinatesResponse {
    success: boolean;
    data: { latitude: string, longitude:string };
  }
  
  export interface IGiveHospitalityKitResponse {
    success: boolean;
  }
  
  export interface IEventByIdResponse {
    success: boolean;
    data: IEventData;
    // isdeleted: boolean;
  }
  
  export interface IEventData {
    id: string;
    name: string;
    day: string;
    category: string;
    startTime: Date | string;
    endTime: Date | string;
    image: string;
    description: string;
    venue: IVenueData;
    speakers: string;
  }

  export interface IVenueData {
    id: string;
    name: string;
    image: string;
    latitude: string;
    longitude: string;
    priority: number;
  }
  