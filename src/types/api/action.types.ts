import { IEventData } from './events.types';

export interface ISetReminderResponse {
  success: boolean;
  data: {
    email: string;
    event: IEventData;
  };
}

export interface ISetTagResponse {
  success: boolean;
  data: {
    email: string;
    event: IEventData;
    tag: string;
  };
  isdeleted: boolean;
}

export interface ITagOfEventResponse {
  success: boolean;
  data: {
    email: string;
    event: IEventData;
    tag: string;
  };
}
export interface ITimetableResponse {
  success: boolean;
  data: {
    email: string;
    event: IEventData;
    tag: string;
  }[];
}

export interface ICheckAccomodationResponse {
  success: boolean;
  data: {
    room: string;
    isHospitalityKitCollected: boolean;
    isAccomodationBooked: boolean;
  };
}

export interface IGetTagsAndReminder {
  success: boolean;
  data: {
    reminders: boolean;
    tag: string;
  };
}

export interface ISendRequestResponse {
  success: boolean
}

export interface IDisconnectResponse {
  success: boolean
}

export interface ICreateOtpResponse {
  success: boolean;
  data: {
    otp: string;
  };
}

export interface IAddInterestResponse {
  success: boolean;
}

export interface IGetConnectResponse {
  success: boolean;
  connects: IConnectData[];
}

export interface IYourConnectResponse {
  success: boolean;
  accepted: IConnectData[];
  waiting: IConnectData[];
  received: IConnectData[];
}

export interface IGetProfileResponse {
  success: boolean;
  profile: IProfileData;
  isconnected: boolean;
  isreceived: boolean;
  status: boolean;
}

export interface IConnectData {
  id: string;
  email: string;
  interests: any;
  name: string;
  company_name: string;
  contact: string;
  isbuild: boolean;
  skills: string;
  achievements: string;
  sector: string;
  stage: string;
  designation: string;
  portfolio: string;
  description: string;
  persontype: string;
}

export interface IProfileData{
  id: string;
  email: string;
  interests: any;
  name: string;
  company_name: string;
  contact: string;
  isbuild: boolean;
  skills: string;
  achievements: string;
  sector: string;
  stage: string;
  designation: string;
  portfolio: string;
  description: string;
  persontype: string;
}

export interface IVerifyOtpResponse {
  success: boolean;
  profileBuilt: boolean;
  data: {
    user: {
      firstName: string;
      lastName: string;
      email: string;
      summit_pass: string;
      isadmin: boolean;
    };
    isGuest: boolean;
    error: string;
  };
}

export interface IMarkAttendanceResponse {
  success: boolean;
  data: {
    id: string;
    isKitCollected: boolean;
    email: string;
    isRegistered: boolean;
    pass_name: string;
  };
}

export interface IKitResponse {
  success: boolean;
  data: {
    email: string;
    isKitCollected: boolean;
  };
}

export interface ErrorResponse {
  success: boolean;
  error: any;
}
