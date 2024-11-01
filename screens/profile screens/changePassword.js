import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { auth } from '../../config/firebase'; 
import { sendPasswordResetEmail } from 'firebase/auth'; 

const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [emailVisible, setEmailVisible] = useState(false);

  const handlePasswordReset = async () => {
    if (email === '') {
      Alert.alert('Error', 'Email field is required.');
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email); 
      Alert.alert('Success', 'Password reset email sent to your email address.');
      setEmail('');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change Password</Text>
      <Text style={styles.subtitle}>Enter your email to receive a password reset link.</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TouchableOpacity
          style={styles.visibilityButton}
          onPress={() => setEmailVisible(!emailVisible)}
        >
          <MaterialIcons
            name={emailVisible ? 'visibility-off' : 'visibility'}
            size={RFPercentage(3)}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
        <Text style={styles.buttonText}>Send Reset Email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp('5%'),
    width: '100%',
    maxWidth: wp('98%'),
    alignSelf: 'center',
  },
  title: {
    fontSize: RFPercentage(3.5),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  subtitle: {
    fontSize: RFPercentage(2.5),
    marginBottom: hp('3%'),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('2%'),
    position: 'relative',
  },
  input: {
    height: hp('5.5%'),
    fontSize: RFPercentage(2),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: wp('2%'),
    paddingLeft: wp('3%'),
    marginBottom: hp('2%'),
    flex: 1,
  },
  visibilityButton: {
    position: 'absolute',
    right: wp('3%'),
    top: '50%',
    transform: [{ translateY: -hp('2.75%') }],
  },
  button: {
    height: hp('6%'),
    backgroundColor: Colors.primary,
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
  },
});

export default ChangePassword;
