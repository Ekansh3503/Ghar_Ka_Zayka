import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { auth, db } from '../../config/firebase';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { doc, deleteDoc } from 'firebase/firestore';
import { CommonActions } from '@react-navigation/native';

export default function DeleteAccountScreen({ navigation }) {
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async () => {
    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Error', 'No user is currently logged in.');
      return;
    }

    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete your account? This action is permanent and cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              const uid = user.uid;
              const userDocRef = doc(db, 'users', uid);
              await deleteDoc(userDocRef);

              await user.delete();

              await AsyncStorage.removeItem('user');
              await AsyncStorage.removeItem('userName');
              await AsyncStorage.removeItem('email');
              await AsyncStorage.removeItem('location');

              Alert.alert('Account Deleted', 'Your account has been successfully deleted.', [
                {
                  text: 'OK',
                  onPress: () => {
                      CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'StartScreen' }],
                      })
                  },
                },
              ]);
            } catch (error) {
              Alert.alert('Deletion Error', `An error occurred: ${error.message}`);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Delete Account</Text>
        <Text style={styles.subtitle}>Permanently delete your account and all associated data.</Text>

        <TouchableOpacity style={styles.button} onPress={handleDeleteAccount} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Delete Account</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.description}>
          Deleting your account is a permanent action and cannot be undone. Once you delete your account:
          {'\n\n'}
          {'\u2022'} All your personal information, including your profile details, settings, and preferences, will be permanently removed from our system.
          {'\n\n'}
          {'\u2022'} Any content you have created, such as posts, comments, and uploaded files, will be erased and cannot be recovered.
          {'\n\n'}
          {'\u2022'} You will lose access to any services or features associated with your account.
          {'\n\n'}
          {'\u2022'} If you have a subscription or any outstanding payments, these will not be refunded or adjusted upon deletion.
          {'\n\n'}
          {'\u2022'} You will need to create a new account if you wish to use our services in the future. Please consider whether you really want to delete your account and ensure you have backed up any important data before proceeding.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryWhite,
  },
  innerContainer: {
    width: '100%',
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: wp('8%'),
    color: Colors.primary,
    marginVertical: hp('2%'),
  },
  subtitle: {
    fontSize: wp('4%'),
    color: 'gray',
    marginBottom: hp('3%'),
    textAlign: 'center',
  },
  button: {
    height: hp('6%'),
    backgroundColor: Colors.primary,
    borderRadius: wp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('3%'),
    width: '100%',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: wp('4%'),
    fontWeight: 'bold',
  },
  description: {
    fontSize: wp('4%'),
    color: 'gray',
    textAlign: 'center',
    marginTop: hp('2%'),
    lineHeight: wp('5%'),
  },
});
