import { useMutation, UseMutationResult } from '@tanstack/react-query';
import {
  createOtp,
  distributeKit,
  giveHospitalityKit,
  markEventAttendance,
  setReminder,
  setTag,
  userDetail,
  verifyOtp,
  saveInterest,
  sendRequest,
  disconnect,
  buildstudent,
  buildstartup,
  buildmentor,
  buildinvestor,
  buildprofessional,
  accept,
  editprofile,
  storeExpoToken
} from '../../api/user';
import { getCoordinates } from '../../api/events';
import {
  ESUMMIT_CREATE_OTP,
  ESUMMIT_DISTRIBUTE_KIT,
  ESUMMIT_EVENT_MARK_ATTENDANCE,
  ESUMMIT_HOSPI_KIT,
  ESUMMIT_SET_REMINDER,
  ESUMMIT_SET_TAG,
  ESUMMIT_USER_DETAIL,
  ESUMMIT_VENUE_COORDINATES,
  ESUMMIT_VERIFY_OTP,
  ESUMMIT_ADD_INTEREST,
  ESUMMIT_SEND_REQUEST,
  ESUMMIT_DISCONNECT,
  ESUMMIT_BUILD_STUDENT,
  ESUMMIT_BUILD_STARTUP,
  ESUMMIT_BUILD_MENTOR,
  ESUMMIT_BUILD_INVESTOR,
  ESUMMIT_BUILD_PROFESSIONAL,
  ESUMMIT_ACCEPT,
  ESUMMIT_EDIT_PROFILE
} from '../../contants/query-keys';
import {
  ErrorResponse,
  ICreateOtpResponse,
  IKitResponse,
  ISetReminderResponse,
  ISetTagResponse,
  IVerifyOtpResponse,
  IAddInterestResponse,
  ISendRequestResponse,
  IDisconnectResponse
} from '../../types/api/action.types';
import {
  IGetCoordinatesResponse,
  IGiveHospitalityKitResponse,
} from '../../types/api/events.types';

export const useSetReminderMutation = (): UseMutationResult<
  ISetReminderResponse,
  ErrorResponse,
  { id: string; email: string }
> => {
  return useMutation<
    ISetReminderResponse,
    ErrorResponse,
    { id: string; email: string }
  >({
    mutationKey: [ESUMMIT_SET_REMINDER],
    mutationFn: async ({ id, email }) => setReminder(id, email),
  });
};

export const useSetTagMutation = (): UseMutationResult<
  ISetTagResponse,
  ErrorResponse,
  { id: string; email: string; tag: string }
> => {
  return useMutation<
    ISetTagResponse,
    ErrorResponse,
    { id: string; email: string; tag: string }
  >({
    mutationKey: [ESUMMIT_SET_TAG],
    mutationFn: async ({ id, email, tag }) =>
      setTag(id, email, tag.toLowerCase()),
  });
};

export const useCreateOtpMutation = (): UseMutationResult<
  ICreateOtpResponse,
  ErrorResponse,
  { email: string }
> => {
  return useMutation<ICreateOtpResponse, ErrorResponse, { email: string }>({
    mutationKey: [ESUMMIT_CREATE_OTP],
    mutationFn: async ({ email }) => createOtp(email),
  });
};

export const useaddInterestMutation = (): UseMutationResult<
  IAddInterestResponse,
  ErrorResponse,
  { email: string, interest: any, persontype: string, meet: string }
> => {
  return useMutation<IAddInterestResponse, ErrorResponse, { email: string, interest: any, persontype: string, meet: string }>({
    mutationKey: [ESUMMIT_ADD_INTEREST],
    mutationFn: async ({ email, interest, persontype, meet }) => saveInterest(email, interest, persontype, meet),
  });
};

export const usebuildStudent = (): UseMutationResult<
  IAddInterestResponse,
  ErrorResponse,
  { email: string, school: string, achievements: string, skills: string }
> => {
  return useMutation<IAddInterestResponse, ErrorResponse, { email: string, school: string, achievements: string, skills: string }>({
    mutationKey: [ESUMMIT_BUILD_STUDENT],
    mutationFn: async ({ email, school, achievements, skills }) => buildstudent(email, school, achievements, skills),
  });
};

export const usebuildStartup = (): UseMutationResult<
  IAddInterestResponse,
  ErrorResponse,
  { email: string, startup_name: string, sector: string, stage: string, description: string, achievements: string }
> => {
  return useMutation<IAddInterestResponse, ErrorResponse, { email: string, startup_name: string, sector: string, stage: string, description: string, achievements: string }>({
    mutationKey: [ESUMMIT_BUILD_STARTUP],
    mutationFn: async ({ email, startup_name, sector, stage, description, achievements}) => buildstartup(email, startup_name, sector, description, stage, achievements),
  });
};

export const usebuildMentor = (): UseMutationResult<
  IAddInterestResponse,
  ErrorResponse,
  { email: string, company_name: string, sector: string, designation: string, achievements: string }
> => {
  return useMutation<IAddInterestResponse, ErrorResponse, { email: string, company_name: string, sector: string, designation: string, achievements: string }>({
    mutationKey: [ESUMMIT_BUILD_MENTOR],
    mutationFn: async ({ email, company_name, sector, designation, achievements}) => buildmentor(email, company_name, sector, designation, achievements),
  });
};

export const usebuildInvestor = (): UseMutationResult<
  IAddInterestResponse,
  ErrorResponse,
  { email: string, firm_name: string, portfolio: string, designation: string, description: string, sector: string }
> => {
  return useMutation<IAddInterestResponse, ErrorResponse, { email: string, firm_name: string, portfolio: string, designation: string, description: string, sector: string }>({
    mutationKey: [ESUMMIT_BUILD_INVESTOR],
    mutationFn: async ({ email, firm_name, portfolio, designation, description, sector}) => buildinvestor(email, firm_name, portfolio, description, designation, sector),
  });
};

export const usebuildProfessional = (): UseMutationResult<
  IAddInterestResponse,
  ErrorResponse,
  { email: string, company_name: string, designation: string, skills: string, achievements: string }
> => {
  return useMutation<IAddInterestResponse, ErrorResponse, { email: string, company_name: string, designation: string, skills: string, achievements: string }>({
    mutationKey: [ESUMMIT_BUILD_PROFESSIONAL],
    mutationFn: async ({ email, company_name, designation, skills, achievements}) => buildprofessional(email, company_name, designation, skills, achievements),
  });
};

export const useeditprofile = (): UseMutationResult<
  IAddInterestResponse,
  ErrorResponse,
  { email: string, company_name: string | undefined, designation: string | undefined, skills: string | undefined, achievements: string | undefined, portfolio: string | undefined, sector: string | undefined, stage: string | undefined, description: string | undefined }
> => {
  return useMutation<IAddInterestResponse, ErrorResponse, { email: string, company_name: string | undefined, designation: string | undefined, skills: string | undefined, achievements: string | undefined, portfolio: string | undefined, sector: string | undefined, stage: string | undefined, description: string | undefined }>({
    mutationKey: [ESUMMIT_EDIT_PROFILE],
    mutationFn: async ({ email, company_name, designation, skills, achievements, portfolio, stage, sector, description}) => editprofile(email, company_name, designation, description, portfolio, sector, stage, skills, achievements, ),
  });
};

export const useVerifyOtpMutation = (): UseMutationResult<
  IVerifyOtpResponse,
  ErrorResponse,
  { email: string; value: string }
> => {
  return useMutation<
    IVerifyOtpResponse,
    ErrorResponse,
    { email: string; value: string }
  >({
    mutationKey: [ESUMMIT_VERIFY_OTP],
    mutationFn: async ({ email, value }) => verifyOtp(email, value),
  });
};

export const useUserDetailMutation = (): UseMutationResult<
  IVerifyOtpResponse,
  ErrorResponse,
  { email: string }
> => {
  return useMutation<IVerifyOtpResponse, ErrorResponse, { email: string }>({
    mutationKey: [ESUMMIT_USER_DETAIL],
    mutationFn: async ({ email }) => userDetail(email),
  });
};

export const useDistributeKitMutation = (): UseMutationResult<
  IKitResponse,
  ErrorResponse,
  { attendanceId: string | undefined }
> => {
  return useMutation<
    IKitResponse,
    ErrorResponse,
    { attendanceId: string | undefined }
  >({
    mutationKey: [ESUMMIT_DISTRIBUTE_KIT],
    mutationFn: async ({ attendanceId }) => distributeKit(attendanceId),
  });
};

export const useMarkEventAttendanceMutation = (): UseMutationResult<
  IKitResponse,
  ErrorResponse,
  { event: string; email: string }
> => {
  return useMutation<
    IKitResponse,
    ErrorResponse,
    { event: string; email: string }
  >({
    mutationKey: [ESUMMIT_EVENT_MARK_ATTENDANCE],
    mutationFn: async ({ email, event }) => markEventAttendance(email, event),
  });
};

export const useGetCoordinatesMutation = (): UseMutationResult<
  IGetCoordinatesResponse,
  ErrorResponse,
  { venue: string }
> => {
  return useMutation<IGetCoordinatesResponse, ErrorResponse, { venue: string }>(
    {
      mutationKey: [ESUMMIT_VENUE_COORDINATES],
      mutationFn: async ({ venue }) => getCoordinates(venue),
    },
  );
};

export const useGiveHospitalityKitMutation = (): UseMutationResult<
  IGiveHospitalityKitResponse,
  ErrorResponse,
  { email: string }
> => {
  return useMutation<
    IGiveHospitalityKitResponse,
    ErrorResponse,
    { email: string }
  >({
    mutationKey: [ESUMMIT_HOSPI_KIT],
    mutationFn: async ({ email }) => giveHospitalityKit(email),
  });
};

export const usesendRequest = (): UseMutationResult<
  ISendRequestResponse,
  ErrorResponse,
  {email: string, id: string | undefined}
  > => {
  return useMutation<
    ISendRequestResponse,
    ErrorResponse,
    { email: string, id: string | undefined }
  >({
    mutationKey: [ESUMMIT_SEND_REQUEST],
    mutationFn: async ({ email, id }) => sendRequest(email, id),
  });
};

export const useStoreToken = (): UseMutationResult<
  ISendRequestResponse,
  ErrorResponse,
  {expotoken: string, email: string}
  > => {
  return useMutation<
    ISendRequestResponse,
    ErrorResponse,
    { expotoken: string, email: string }
  >({
    mutationKey: ['ESUMMIT_STORE_TOKEN'],
    mutationFn: async ({ expotoken, email }) => storeExpoToken(expotoken, email),
  });
};

export const usedisconnect = (): UseMutationResult<
  IDisconnectResponse,
  ErrorResponse,
  {id: string | undefined}
  > => {
  return useMutation<
    IDisconnectResponse,
    ErrorResponse,
    { id: string | undefined }
  >({
    mutationKey: [ESUMMIT_DISCONNECT],
    mutationFn: async ({ id }) => disconnect(id),
  });
  };

  export const useaccept = (): UseMutationResult<
  IDisconnectResponse,
  ErrorResponse,
  {id: string | undefined, email: string}
  > => {
  return useMutation<
    IDisconnectResponse,
    ErrorResponse,
    { id: string | undefined, email: string }
  >({
    mutationKey: [ESUMMIT_ACCEPT],
    mutationFn: async ({ id, email }) => accept(id, email),
  });
  };