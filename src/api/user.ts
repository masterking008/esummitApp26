import { PRODUCTION_BASE_URL } from './base';

export const setReminder = async (id: string, email: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/setReminder/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        email: email,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const setTag = async (id: string, email: string, tag: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/setTag/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        email: email,
        tag: tag,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const getTagsAndReminders = async (email: string, id: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/getTagAndReminder/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        id: id,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const createOtp = async (email: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/createOtp/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    // console.log(response)
    const data = await response.json();
    // console.log(data)
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const verifyOtp = async (email: string, otp: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/verify/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        otp: otp,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const userDetail = async (email: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/userDetail/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const markAttendance = async (email: string, admin_email: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/markAttendance/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        admin_email: admin_email
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const getConnects = async (email: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/getconnects/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const sendRequest = async (email: string, id: string | undefined) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/sendRequest/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        id: id
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const storeExpoToken = async (expotoken: string, email: string) => {
  try {
    console.log('Storing expo token:', expotoken);
    const response = await fetch(`${PRODUCTION_BASE_URL}/storetoken/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pushtoken: expotoken,
        email: email
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error storing expo token:', err);
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
};

export const yourConnections = async (email: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/yourconnections/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const disconnect = async (id: string | undefined) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/disconnect/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const accept = async (id: string | undefined, email: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/acceptRequest/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        email: email
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const getProfilebyId = async (id: string, email: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/getprofile/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
        email: email
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const getProfile = async (email: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/getprofilepersonal/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const distributeKit = async (attendanceId: string | undefined) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/kit/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        attendanceId: attendanceId,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const tagOfEvent = async (email: string, event: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/tagOfEvent/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        event: event,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const markEventAttendance = async (email: string, event: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/eventAttendance/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        event: event,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const saveInterest = async (email: string, interest: any, persontype: string, meet: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/saveInterest/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        interests: interest,
        persontype: persontype,
        meet: meet
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const buildstudent = async (email: string, school: string, achievements: string, skills: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/buildstudent/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        school: school,
        achievements: achievements,
        skills: skills
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const buildstartup = async (email: string, startup_name: string, sector: string, description: string, stage: string, achievements: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/buildstartup/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        startup_name: startup_name,
        sector: sector,
        stage: stage,
        description: description,
        achievements: achievements 
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const buildmentor = async (email: string, company_name: string, sector: string, designation: string, achievements: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/buildmentor/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        company_name: company_name,
        sector: sector,
        designation: designation,
        achievements: achievements 
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const buildinvestor = async (email: string, firm_name: string, portfolio: string, description: string, designation: string, sector: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/buildinvestor/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        firm_name: firm_name,
        description: description,
        designation: designation,
        sector: sector,
        portfolio: portfolio
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const buildprofessional = async (email: string, company_name: string, designation: string, skills: string, achievements: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/buildprofessional/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        company_name: company_name,
        designation: designation,
        skills: skills,
        achievements: achievements 
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const editprofile = async (email: string, company_name: string | undefined, designation: string | undefined, description: string | undefined, portfolio: string | undefined, sector: string | undefined, stage: string | undefined, skills: string | undefined, achievements: string | undefined) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/editprofile/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        company_name: company_name,
        designation: designation,
        skills: skills,
        achievements: achievements,
        description: description,
        stage: stage,
        sector: sector,
        portfolio: portfolio 
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const getTimetable = async (email: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/timetable/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const checkAccomodation = async (email: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/checkAccomodation/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};

export const giveHospitalityKit = async (email: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/giveHospitalityKit/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
      }),
    });
    const data = await response.json();
    return data;
  } catch (err) {
    return {
      success: false,
      error: err,
    };
  }
};
