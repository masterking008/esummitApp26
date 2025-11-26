import { useQuery } from '@tanstack/react-query';
import {
  checkAccomodation,
  getTagsAndReminders,
  getTimetable,
  markAttendance,
  tagOfEvent,
  getConnects,
  getProfilebyId,
  yourConnections,
  getProfile
} from '../../api/user';
import {
  ESUMMIT_ACCOMODATION,
  ESUMMIT_GET_TAGS_AND_REMINDERS,
  ESUMMIT_MARK_ATTENDANCE,
  ESUMMIT_TAG_OF_EVENT,
  ESUMMIT_TIMETABLE,
  ESUMMIT_GET_CONNECTS,
  ESUMMIT_GET_PROFILE,
  ESUMMIT_YOUR_CONNECTION
} from '../../contants/query-keys';
import {
  ICheckAccomodationResponse,
  IGetTagsAndReminder,
  IMarkAttendanceResponse,
  ITagOfEventResponse,
  ITimetableResponse,
  IGetConnectResponse,
  IGetProfileResponse,
  IYourConnectResponse
} from '../../types/api/action.types';

export const useGetTagsAndReminder = (email: string, id: string) =>
  useQuery<IGetTagsAndReminder, Error, IGetTagsAndReminder>({
    queryKey: [ESUMMIT_GET_TAGS_AND_REMINDERS, id],
    queryFn: () => getTagsAndReminders(email, id),
  });

export const useMarkAttendaceQuery = (email: string, admin_email: string) => {
  return useQuery<IMarkAttendanceResponse, Error, IMarkAttendanceResponse>({
    queryKey: [ESUMMIT_MARK_ATTENDANCE, email, admin_email],
    queryFn: async () => markAttendance(email, admin_email),
  });
};

export const useGetConnectQuery = (email: string) => {
  return useQuery<IGetConnectResponse, Error, IGetConnectResponse>({
    queryKey: [ESUMMIT_GET_CONNECTS, email],
    queryFn: async () => getConnects(email),
  });
};

export const useGetYourConnectQuery = (email: string) => {
  return useQuery<IYourConnectResponse, Error, IYourConnectResponse>({
    queryKey: [ESUMMIT_YOUR_CONNECTION, email],
    queryFn: async () => yourConnections(email),
  });
};

export const useGetProfileQuery = (id: string, email: string) => {
  return useQuery<IGetProfileResponse, Error, IGetProfileResponse>({
    queryKey: [ESUMMIT_GET_PROFILE, id],
    queryFn: async () => getProfilebyId(id, email),
  });
};

export const useGetPersonalProfileQuery = (email: string) => {
  return useQuery<IGetProfileResponse, Error, IGetProfileResponse>({
    queryKey: [ESUMMIT_GET_PROFILE],
    queryFn: async () => getProfile(email),
  });
};

export const useTagOfEventQuery = (email: string, event: string) => {
  return useQuery<ITagOfEventResponse, Error, ITagOfEventResponse>({
    queryKey: [ESUMMIT_TAG_OF_EVENT, event, email],
    queryFn: async () => tagOfEvent(email, event),
  });
};

export const useGetTimetableQuery = (email: string) => {
  return useQuery<ITimetableResponse, Error, ITimetableResponse>({
    queryKey: [ESUMMIT_TIMETABLE, email],
    queryFn: async () => getTimetable(email),
  });
};

export const usecheckAccomodationQuery = (email: string) => {
  return useQuery<
    ICheckAccomodationResponse,
    Error,
    ICheckAccomodationResponse
  >({
    queryKey: [ESUMMIT_ACCOMODATION, email],
    queryFn: async () => checkAccomodation(email),
  });
};
