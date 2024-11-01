import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../constants/Colors';
import { RFPercentage } from 'react-native-responsive-fontsize'; 

const Input = ({ value, onChangeText, placeholder, secureTextEntry = false, autoCapitalize = 'none', keyboardType = 'default' }) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={Colors.primaryBlack}
      secureTextEntry={secureTextEntry}
      autoCapitalize={autoCapitalize}
      keyboardType={secureTextEntry ? 'number-pad' : keyboardType}
      style={[styles.input, { fontSize: RFPercentage(2.5) }]} 
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: wp('80%'),
    height: hp('6%'),
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: wp('2%'),
    paddingHorizontal: wp('3%'),
    marginVertical: hp('1%'),
    color: Colors.primaryBlack,
    fontSize: RFPercentage(2.5), 
  },
});

export default Input;
