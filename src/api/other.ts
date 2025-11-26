import { PRODUCTION_BASE_URL } from './base';

export const getContact = async () => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/contact/`, {
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

export const getFaq = async () => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/faq/`, {
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

export const getSchedule = async () => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/getother/`, {
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

export const getSponsors = async () => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/sponsors/`, {
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

export const getVenues = async () => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/venues/`, {
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

export const getInterests = async () => {
  try {
    const response = await fetch(`${PRODUCTION_BASE_URL}/getInterests/`, {
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