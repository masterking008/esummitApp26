import { useQuery } from '@tanstack/react-query';
import {
  getContact,
  getFaq,
  getInterests,
  getSchedule,
  getSponsors,
  getVenues,
} from '../../api/other';
import {
  ESUMMIT_CONTACT,
  ESUMMIT_FAQ,
  ESUMMIT_INTERESTS,
  ESUMMIT_SCHEDULE,
  ESUMMIT_SPONSORS,
  ESUMMIT_VENUES,
} from '../../contants/query-keys';
import {
  IContactResponse,
  IFaqResponse,
  IInterestsData,
  IScheduleResponse,
  ISponsorsData,
  IVenuesData,
} from '../../types/api/others.types';

export const useContact = () =>
  useQuery<IContactResponse, Error, IContactResponse>({
    queryKey: [ESUMMIT_CONTACT],
    queryFn: () => getContact(),
  });

export const useFaq = () =>
  useQuery<IFaqResponse, Error, IFaqResponse>({
    queryKey: [ESUMMIT_FAQ],
    queryFn: () => getFaq(),
  });

export const useSchedule = () =>
  useQuery<IScheduleResponse, Error, IScheduleResponse>({
    queryKey: [ESUMMIT_SCHEDULE],
    queryFn: () => getSchedule(),
  });

export const useSponsors = () =>
  useQuery<ISponsorsData[], Error, ISponsorsData[]>({
    queryKey: [ESUMMIT_SPONSORS],
    queryFn: () => getSponsors(),
  });

export const useVenues = () =>
  useQuery<IVenuesData, Error, IVenuesData>({
    queryKey: [ESUMMIT_VENUES],
    queryFn: () => getVenues(),
  });

export const useInterests = () =>
  useQuery<IInterestsData, Error, IInterestsData>({
    queryKey: [ESUMMIT_INTERESTS],
    queryFn: () => getInterests(),
  });
