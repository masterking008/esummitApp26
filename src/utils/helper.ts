import { Platform } from 'react-native';

export const getTime = (time: Date | undefined | string) => {
  if (!time) return '';
  return new Date(time).toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  });
};

export const filterData = (
  data: any,
  filterCategory: string,
  filterDay: string[],
  filterVenue: string,
) => {
  return data
    .filter(item => {
      if (filterCategory === '') {
        return item;
      } else if (item.category.toLowerCase().includes(filterCategory.toLowerCase())) {
        return item;
      }
    })
    .filter(item => {
      if (filterDay.length === 0) {
        return item;
      } else {
        if (filterDay.includes(item.day)) {
          return item;
        }
      }
    })
    .filter(item => {
      if (filterVenue === '') {
        return item;
      } else if (item.venue.name === filterVenue) {
        return item;
      }
    });
};

export const filterConnect = (
  data: any,
  searchText: string,
) => {
  return data
    .filter(item => {
      if (searchText === '') {
        return item;
      } else if (item.name === null || item.persontype === null || item.company_name === null) {
        return item;
      }
       else if (item.name.toLowerCase().includes(searchText.toLowerCase()) || item.persontype.toLowerCase().includes(searchText.toLowerCase()) || item.company_name.toLowerCase().includes(searchText.toLowerCase())) {
        return item;
      }
    })
};

export const mapUrl = (latitude: string | undefined, longitude: string | undefined) => {
  const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
  const latLng = `${latitude},${longitude}`;
  const label = 'Esummit';
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });
  return url;
};
