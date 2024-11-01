import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet, Image, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import { auth, signInWithEmailAndPassword, db, sendPasswordResetEmail } from '../config/firebase';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Input from '../components/Input';
import Button from '../components/Button';
import { doc, getDoc } from 'firebase/firestore';
import { CommonActions } from '@react-navigation/native';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const loginUser = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter all fields');
      return;
    }
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        Alert.alert('Verification Required', 'Please verify your email before logging in.');
        await auth.signOut();
        setLoading(false);
        return;
      }

      const uid = user.uid;
      const userDocRef = doc(db, 'users', uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        await AsyncStorage.setItem('user', JSON.stringify(userCredential.user));
        await AsyncStorage.setItem('userName', userData.fullName);
        await AsyncStorage.setItem('email', user.email);
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'MainApp' }],
        });
      } else {
        Alert.alert('Error', 'No user data found');
      }
    } catch (error) {
      Alert.alert('Login Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const forgotPassword = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email to reset the password');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert('Password Reset', 'A password reset link has been sent to your email.');
    } catch (error) {
      Alert.alert('Reset Error', error.message);
    }
  };

  const onSignUpPress = () => {
    navigation.navigate('SignupScreen');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../assets/images/Login.jpeg')} />
      <Text style={styles.headingText}>Login</Text>
      <View style={styles.formContainer}>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
        />
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry={true}
        />
        <Pressable onPress={forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot password?</Text>
        </Pressable>
        <Button onPress={loginUser} title={loading ? <ActivityIndicator color="#fff" /> : 'LOGIN'} />
      </View>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <Pressable onPress={onSignUpPress}>
          <Text style={styles.signupLink}>Sign Up</Text>
        </Pressable>
      </View>
      {/* <Text style={styles.lineText}>─────── Log in with ───────</Text>
      <TouchableOpacity style={styles.googleButton}>
        <View style={styles.googleButtonContainer}>
          <Image style={styles.logoImg} source={require('../assets/images/search.png')} />
          <Text style={styles.googleButtonText}>Login with Google</Text>
        </View>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: wp('5%'),
    backgroundColor: Colors.primaryWhite,
  },
  img: {
    width: wp('60%'),
    height: hp('20%'),
    resizeMode: 'contain',
    marginBottom: hp('2%'),
  },
  headingText: {
    fontSize: wp('8%'),
    color: Colors.primary,
    marginVertical: hp('1%'),
  },
  formContainer: {
    width: wp('80%'),
    alignItems: 'center',
  },
  forgotPasswordText: {
    alignSelf: 'flex-end',
    marginVertical: hp('0.5%'),
    color: Colors.primary,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: hp('1%'),
  },
  signupText: {
    color: Colors.primaryBlack,
    fontSize: wp('4%'),
  },
  signupLink: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: wp('4%'),
  },
  lineText: {
    color: Colors.primaryBlack,
    fontSize: wp('4%'),
    marginVertical: hp('1%'),
  },
  googleButton: {
    backgroundColor: Colors.primary,
    borderRadius: 25,
    paddingVertical: hp('1.5%'),
    alignItems: 'center',
    width: wp('80%'),
    marginVertical: hp('1%'),
  },
  googleButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleButtonText: {
    color: Colors.primaryWhite,
    fontWeight: 'bold',
    fontSize: wp('4%'),
    marginHorizontal: wp('2%'),
  },
  logoImg: {
    width: wp('6%'),
    height: wp('6%'),
    resizeMode: 'contain',
  },
});