import React, { useState } from 'react';

import {
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ButtonBox as Button } from './Button';
import MultiSelect from 'react-native-multiple-select';

interface IMultiSelectProps {
  selectText?: string;
  items?: any;
  selectedItems: any;
  onSelectedItemsChange?: any;
  onSubmit?: any;
}

export const MultiSelectBox = (props: IMultiSelectProps) => {
  const [isValid, setIsValid] = useState(true);

//   const handleTextChange = (text: string) => {
//     props.validator && setIsValid(props.validator.test(text));
//     props.onChangeText(text);
//   };
  return (
    <View style={styles.container}>
      {/* <Text style={styles.label}>{props.label}</Text> */}
      <MultiSelect
        items={props.items}
        uniqueKey="id"
        onSelectedItemsChange={props.onSelectedItemsChange}
        selectedItems={props.selectedItems}
        selectText={props.selectText}
        searchInputPlaceholderText="Search Items..."
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"
        displayKey="name"
        searchInputStyle={{ color: '#CCC' }}
        submitButtonColor="#CCC"
        submitButtonText="Submit"
      />
      <Button
        title="Submit"
        // isDisabled={!isValid || !props.value}
        onPress={props.onSubmit}
      />
      {/* <Text
        style={{
          color: '#FFFFFF',
          textAlign: 'center',
          fontSize: 15,
          padding: 20,
        }}>
        OR
      </Text> */}
      {/* <TouchableOpacity
        onPress={() => Linking.openURL('https://ecell.in/esummit/reg/')}>
        <Text
          style={{
            color: '#FFE100',
            textAlign: 'center',
            fontSize: 15,
            fontWeight: 'bold',
          }}>
          Register
        </Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161616',
    marginTop: 20,
  },
  label: {
    // fontFamily: 'Poppins',
    fontSize: 14,
    lineHeight: 17,
    color: '#A2A2A2',
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: '#161616',
    // fontFamily: 'Poppins',
    color: '#FFFFFF',
    borderBottomColor: '#FFE100',
    borderBottomWidth: 2,
    fontSize: 14,
    lineHeight: 17,
    marginTop: 2,
    padding: 0,
  },
});
