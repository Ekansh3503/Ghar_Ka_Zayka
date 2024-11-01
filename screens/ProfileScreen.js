import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { Colors } from '../constants/Colors';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { auth, signOut } from '../config/firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation , CommonActions } from '@react-navigation/native';


export default function ProfileScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');

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

  useEffect(() => {
    const fetchUserEmail = async () => {
      try {
        const storedEmail = await AsyncStorage.getItem('email');
        if (storedEmail) {
          setEmail(storedEmail);
        }
      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };
    fetchUserEmail();
    }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('userName');
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'StartScreen' }],
      });
    } catch (error) {
      Alert.alert('Logout Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={styles.profile}>
        <TouchableOpacity>
          <View style={styles.profileAvatarWrapper}>
            <Image
              alt=""
              source={{
                uri: "https://previews.123rf.com/images/tanyastock/tanyastock1803/tanyastock180300242/97334667-user-icon-human-person-symbol-avatar-login-sign-circle-button-with-soft-color-gradient-background.jpg",
              }}
              style={styles.profileAvatar}
            />
          </View>
        </TouchableOpacity>

        <View>
          <Text style={styles.profileName}>{userName}!</Text>
          <Text style={styles.profileAddress}>{email}</Text>
        </View>
      </View>

      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>

          <TouchableOpacity onPress={() => navigation.navigate('editprofile')}
            style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#eeeeef' }]}>
              <Image
                source={require('../assets/images/account.png')}
                style={styles.image}
              />
            </View>
            <Text style={styles.rowLabel}>Edit Profile</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon
              color="#C6C6C6"
              name="chevron-right"
              size={wp('5%')}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.row} onPress={() => navigation.navigate('MyRecipes')}>
            <View style={[styles.rowIcon, { backgroundColor: '#eeeeef' }]}>
              <Image
                source={require('../assets/images/recipe-book.png')}
                style={styles.image}
              />
            </View>
            <Text style={styles.rowLabel}>My Recipes</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon
              color="#C6C6C6"
              name="chevron-right"
              size={wp('5%')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={styles.row}
          >
            <View style={[styles.rowIcon, { backgroundColor: Colors.primary }]}>
              <FeatherIcon
                color="#fff"
                name="settings"
                size={wp('5%')}
              />
            </View>
            <Text style={styles.rowLabel}>Settings</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon
              color="#C6C6C6"
              name="chevron-right"
              size={wp('5%')}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('HelpAndSupport')}
            style={styles.row}
          >
            <View style={[styles.rowIcon, { backgroundColor: '#eeeeef' }]}>
              <Image
                source={require('../assets/images/help.png')}
                style={styles.image}
              />
            </View>
            <Text style={styles.rowLabel}>Help And Support</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon
              color="#C6C6C6"
              name="chevron-right"
              size={wp('5%')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('SecurityAndPrivacy')}
            style={styles.row}
          >
            <View style={[styles.rowIcon, { backgroundColor: '#8e8d91' }]}>
              <FeatherIcon
                color="#fff"
                name="flag"
                size={wp('5%')}
              />
            </View>
            <Text style={styles.rowLabel}>Security And Privacy</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon
              color="#C6C6C6"
              name="chevron-right"
              size={wp('5%')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ContactUs')}
            style={styles.row}
          >
            <View style={[styles.rowIcon, { backgroundColor: '#007afe' }]}>
              <FeatherIcon
                color="#fff"
                name="mail"
                size={wp('5%')}
              />
            </View>
            <Text style={styles.rowLabel}>Contact Us</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon
              color="#C6C6C6"
              name="chevron-right"
              size={wp('5%')}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleLogout}
            style={styles.row}
          >
            <View style={[styles.rowIcon, { backgroundColor: Colors.primary }]}>
              {loading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <FeatherIcon
                  color="#fff"
                  name="log-out"
                  size={wp('5%')}
                />
              )}
            </View>
            <Text style={styles.rowLabel}>Log Out</Text>
            <View style={styles.rowSpacer} />
            <FeatherIcon
              color="#C6C6C6"
              name="chevron-right"
              size={wp('5%')}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profile: {
    padding: wp('6%'),
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarWrapper: {
    marginTop: hp('10%'),
    position: 'relative',
  },
  profileAvatar: {
    width: wp('20%'),
    height: wp('20%'),
    borderRadius: wp('50%'),
  },
  image: {
    width: wp('9%'),
    height: wp('9%'),
  },
  profileAction: {
    position: 'absolute',
    right: wp('-1%'),
    bottom: wp('-2.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('7%'),
    height: wp('7%'),
    borderRadius: wp('50%'),
    backgroundColor: '#007bff',
  },
  profileName: {
    marginTop: hp('2.5%'),
    fontSize: RFPercentage(2.4),
    fontWeight: '600',
    color: '#414d63',
    textAlign: 'center',
  },
  profileAddress: {
    marginTop: hp('0.6%'),
    fontSize: RFPercentage(2),
    color: '#989898',
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: wp('6%'),
    marginTop: hp('2%'),
  },
  sectionTitle: {
    paddingVertical: hp('1.5%'),
    fontSize: RFPercentage(1.6),
    fontWeight: '600',
    color: '#9e9e9e',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: hp('6.5%'),
    backgroundColor: '#f2f2f2',
    borderRadius: wp('2%'),
    marginBottom: hp('1.5%'),
    paddingHorizontal: wp('3%'),
  },
  rowIcon: {
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: wp('50%'),
    marginRight: wp('3%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: RFPercentage(2.2),
    fontWeight: '400',
    color: '#0c0c0c',
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
