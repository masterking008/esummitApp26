import { PRODUCTION_BASE_URL } from './base';

export const getEvent = async () => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/getEvents/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

export const getEventById = async (id: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/event/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
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

export const getEventsName = async () => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/getEventsName/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

export const getCoordinates = async (venue: string) => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/getCoordinates/${venue}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
