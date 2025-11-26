import { useQuery } from '@tanstack/react-query';
import { getEvent, getEventById, getEventsName } from '../../api/events';
import {
  ESUMMIT_EVENTS,
  ESUMMIT_EVENT_NAME,
  ESUMMIT_VENUE_COORDINATES,
} from '../../contants/query-keys';
import {
  IEventByIdResponse,
  IEventNameResponse,
  IEventResponse,
  IGetCoordinatesResponse,
} from '../../types/api/events.types';

export const useEvent = () =>
  useQuery<IEventResponse, Error, IEventResponse>({
    queryKey: [ESUMMIT_EVENTS],
    queryFn: () => getEvent(),
    refetchInterval: 1000 * 60 * 2,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  });

export const useEventById = (id: string) =>
  useQuery<IEventByIdResponse, Error, IEventByIdResponse>({
    queryKey: [ESUMMIT_EVENTS, id],
    queryFn: () => getEventById(id),
  });

export const useEventByName = () =>
  useQuery<IEventNameResponse, Error, IEventNameResponse>({
    queryKey: [ESUMMIT_EVENT_NAME],
    queryFn: () => getEventsName(),
  });
