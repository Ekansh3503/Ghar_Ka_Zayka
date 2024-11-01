import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { Colors } from '../../constants/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import axios from 'axios';
import qs from 'qs';

const ContactUs = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSend = async () => {
    if (!name || !email || !message) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
  
    try {
      const response = await axios.post('https://api.web3forms.com/submit', qs.stringify({
        name,
        email,
        message,
        access_key: '8bbdb682-a961-4a40-8585-7f4444478be2'
      }), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      if (response.data.success) {
        Alert.alert('Success', 'Your message has been sent. We will get back to you shortly.');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        Alert.alert('Success', 'Your message has been sent. We will get back to you shortly.');
        setName('');
        setEmail('');
        setMessage('');
      }
    } catch (error) {
      Alert.alert('An error occurred while sending the message.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contact Us</Text>
      <Text style={styles.subtitle}>We'd love to hear from you! Please fill out the form below to get in touch.</Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={text => setName(text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Your Email"
        keyboardType="email-address"
        value={email}
        onChangeText={text => setEmail(text)}
        autoCapitalize="none"
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Describe your issue or ask a question"
        value={message}
        onChangeText={text => setMessage(text)}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp('5%'),
    flexGrow: 1,
  },
  title: {
    fontSize: RFPercentage(3.5),
    fontWeight: 'bold',
    marginBottom: hp('2%'),
  },
  subtitle: {
    fontSize: RFPercentage(2.2),
    marginBottom: hp('3%'),
  },
  input: {
    height: hp('6%'),
    fontSize: RFPercentage(2),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: wp('2%'),
    paddingHorizontal: wp('3%'),
    marginBottom: hp('2.5%'),
    width: '100%',
  },
  textArea: {
    height: hp('15%'),
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: Colors.primary,
    borderRadius: wp('5%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    marginBottom: hp('2%'),
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: RFPercentage(2.2),
    fontWeight: 'bold',
  },
  result: {
    fontSize: RFPercentage(2.2),
    marginTop: hp('2%'),
    textAlign: 'center',
    color: 'gray',
  },
});

export default ContactUs;
