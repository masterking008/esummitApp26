import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

interface ISegmentButtonProps {
  buttons: string[];
  value: string;
  onValueChange: any;
}

export const SegmentButton = (props: ISegmentButtonProps) => {
  const handlePress = (value: string) => {
    props.onValueChange(value);
  };

  return (
    <View
      style={[styles.container, { flexDirection: 'row', alignSelf: 'center' }]}>
      {props.buttons.map((button, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              props.value === button && (props.value === 'seat reserved' ? styles.reservedButton : styles.selectedButton),
              index === 0 && {
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
              },
              index === props.buttons.length - 1 && {
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
              },
            ]}
            onPress={() => handlePress(button)}>
            <Text
              style={[
                styles.buttonText,
                {
                  fontFamily: 'ProximaBold',
                  textTransform: 'uppercase',
                  color: props.value === button ? (props.value === 'seat reserved' ? '#FFFFFF' : '#1e1e1e') : '#FFFFFF',
                },
              ]}>
              {button}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = {
  container: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    backgroundColor: '#2A2A2A',
    borderColor: '#FFE100',
    borderWidth: 2,
    minWidth: 140,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#FFE100',
    borderColor: '#FFE100',
  },
  reservedButton: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
};
