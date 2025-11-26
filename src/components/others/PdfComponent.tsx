import React, { PropsWithChildren } from 'react';
import { StyleSheet } from 'react-native';
import Pdf from 'react-native-pdf';

export const PdfComponent: React.FC<PropsWithChildren<{ url: string }>> = ({
  url,
}) => {
  const source = {
    uri: url,
    cache: true,
  };

  return (
    <Pdf
      trustAllCerts={false}
      source={source}
      style={styles.pdf}
    />
  );
};

const styles = StyleSheet.create({
  pdf: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});
