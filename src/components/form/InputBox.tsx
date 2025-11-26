import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ButtonBox as Button } from './Button';
import { useNavigation } from '@react-navigation/native';

interface IInputBoxProps {
  label?: string;
  value?: string;
  onChangeText: any;
  validator?: RegExp;
  onSubmit?: any;
}

export const InputBox = (props: IInputBoxProps) => {
  const navigation = useNavigation();
  const [isValid, setIsValid] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [timer, setTimer] = useState(0);

  const handleTextChange = (text: string) => {
    props.validator && setIsValid(props.validator.test(text));
    props.onChangeText(text);
  };

  const handlePress = () => {
    if (props.onSubmit) {
      props.onSubmit();
    }

    setIsButtonDisabled(true);
    setTimer(10);

    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(countdown);
          setIsButtonDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={[
          styles.input,
          { borderBottomColor: isValid ? '#FED606' : '#D10000' },
        ]}
        value={props.value}
        onChangeText={handleTextChange}
      />
      <Button
        title={isButtonDisabled ? `Wait ${timer}s` : 'Continue'}
        isDisabled={!isValid || !props.value || isButtonDisabled}
        onPress={handlePress}
      />
      <Text
        style={{
          color: '#FFFFFF',
          textAlign: 'center',
          fontSize: 23,
          paddingHorizontal: 20,
          paddingTop: 20,
          paddingBottom: 15,
          fontFamily: 'Proxima',
        }}>
        OR
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text
          style={{
            fontFamily: 'Proxima',
            color: '#FFE300',
            textAlign: 'center',
            fontSize: 16,
            fontWeight: 'bold',
          }}>
          REGISTER
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161616',
    marginTop: 20,
  },
  label: {
    fontFamily: 'Proxima',
    fontSize: 14,
    lineHeight: 17,
    color: '#A2A2A2',
    textTransform: 'uppercase',
  },
  button: {
    backgroundColor: '#FED606',
    color: '#1e1e1e',
  },
  input: {
    backgroundColor: '#161616',
    fontFamily: 'Proxima',
    color: '#FFFFFF',
    borderBottomColor: '#ffffff',
    borderBottomWidth: 2,
    fontSize: 18,
    lineHeight: 25,
    marginTop: 2,
    padding: 0,
  },
});
