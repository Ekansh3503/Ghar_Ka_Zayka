import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Colors } from '../constants/Colors';

export default function UserInfo() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('userName');
        if (storedUserName) {
          setUserName(storedUserName);
        }
      } catch (error) {
        console.error('Error fetching user name:', error);
      }
    };

    fetchUserName();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.helloText}>Hello {userName}</Text>
        <View>
          <Text style={styles.titleText}>What would you like</Text>
          <Text style={styles.subtitleText}>to cook today?</Text>
        </View>
      </View>
      <Image
        style={styles.image}
        source={{
          uri: "https://previews.123rf.com/images/tanyastock/tanyastock1803/tanyastock180300242/97334667-user-icon-human-person-symbol-avatar-login-sign-circle-button-with-soft-color-gradient-background.jpg",
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: wp(5), 
      paddingVertical: hp(2),
      marginTop: hp(1), 
    },
    textContainer: {
      flex: 1,
      justifyContent: 'center', 
    },
    helloText: {
      fontSize: RFPercentage(4), 
      color: "#fb8500",
      fontWeight: 'bold', 
      marginBottom: hp(1), 
    },
    titleText: {
      fontSize: RFPercentage(3.5), 
      color: Colors.primary,
      fontWeight: '600', 
      marginBottom: hp(0.5), 
    },
    subtitleText: {
      fontSize: RFPercentage(3), 
      color: Colors.primary,
      fontWeight: '600', 
    },
    image: {
      width: wp(20), 
      height: hp(10), 
      borderRadius: wp(10),
      alignItems: 'center',
      justifyContent: 'center',
    },
  });