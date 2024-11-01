import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';

const HelpAndSupport = () => {
  const [faqCollapsed, setFaqCollapsed] = useState(true);
  const [guidesCollapsed, setGuidesCollapsed] = useState(true);
  const [contactCollapsed, setContactCollapsed] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Help and Support</Text>
      <Text style={styles.subtitle}>Need help? Find answers to your questions or get in touch with us.</Text>

      <TouchableOpacity onPress={() => setFaqCollapsed(!faqCollapsed)} style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeader}>{faqCollapsed ? '▶' : '▼'} Frequently Asked Questions</Text>
      </TouchableOpacity>
      <Collapsible collapsed={faqCollapsed}>
        <View style={styles.sectionContent}>
          <Text style={styles.question}>How do I upload my recipe?</Text>
          <Text style={styles.answer}>You can upload your recipe by navigating to the "Add Recipe" section in the app and filling out the necessary details.</Text>
          <Text style={styles.question}>How do I change my password?</Text>
          <Text style={styles.answer}>Go to the account settings and click on "Change Password". Follow the instructions provided.</Text>
          
          <Text style={styles.question}>How do I change my username?</Text>
          <Text style={styles.answer}>In our app, you can go to "Edit Profile" section inside the profile section, and here you can change your name.</Text>
          <Text style={styles.question}>Where can I see my uploaded recipes?</Text>
          <Text style={styles.answer}>Navigate to Profile section, and go to "My Recipes" section. Here you can see all recipes uploaded by you.</Text>
          <Text style={styles.question}>I can’t log in, help!</Text>
          <Text style={styles.answer}>To reset your password, click on the "Forgot Password" button on login screen after which you can change your pasword, and then try to login. If you still have difficulty logging in, please contact us at gharkazayka07@gmail.com.</Text>
          <Text style={styles.question}>I want to cancel or delete my account.</Text>
          <Text style={styles.answer}>You can cancel or delete your account by going to "Delete Account" section inside settings menu.</Text>

          <Text style={styles.question}>How do I get emails?</Text>
          <Text style={styles.answer}>If you’d like to be added to our email list, please turn on the notifications by visiting the notifications page.</Text>
          <Text style={styles.question}>How do I unsubscribe from emails?</Text>
          <Text style={styles.answer}>You can change your email and notification preferences at any time by updating your notifications page.</Text>

          <Text style={styles.question}>How do I contact GharKaZayka?</Text>
          <Text style={styles.answer}>You can email us at gharkazayka07@gmail.com.
          </Text>
        </View>
      </Collapsible>

      <TouchableOpacity onPress={() => setGuidesCollapsed(!guidesCollapsed)} style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeader}>{guidesCollapsed ? '▶' : '▼'} Guides and Tutorials</Text>
      </TouchableOpacity>
      <Collapsible collapsed={guidesCollapsed}>
        <View style={styles.sectionContent}>
          <Text style={styles.question}>How do I get started with my first recipe?</Text>
          <Text style={styles.answer}>To get started with your first recipe, go to the "Add Recipe" section, fill in the details like recipe title,description,ingredients.steps,etc, and then click on "Upload Recipe".</Text>
          <Text style={styles.question}>How do I navigate the app?</Text>
          <Text style={styles.answer}>The app has a bottom navigation bar that allows you to move between different sections such as Home, Search, Add Recipe, Favorites, and Profile.</Text>
          <Text style={styles.question}>How do I create and share recipes?</Text>
          <Text style={styles.answer}>You can create a recipe by clicking on the "Add Recipe" button in the app, entering the required information, and clicking "Upload Recipe". You can then share it via social media or direct link.</Text>
          <Text style={styles.question}>How do I manage my profile?</Text>
          <Text style={styles.answer}>To manage your profile, go to the "Profile" section, where you can edit your information, change your username, and update your settings.</Text>
        </View>
      </Collapsible>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: wp('5%'),
  },
  title: {
    fontSize: RFPercentage(3.5),
    fontWeight: 'bold',
    marginBottom: hp('1.5%'),
  },
  subtitle: {
    fontSize: RFPercentage(2.2),
    marginBottom: hp('3%'),
  },
  searchBar: {
    height: hp('6%'),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: wp('2%'),
    paddingLeft: wp('3%'),
    marginBottom: hp('3%'),
  },
  sectionHeaderContainer: {
    width: '100%',
    paddingVertical: hp('2%'),
    backgroundColor: '#f0f0f0',
    borderRadius: wp('2%'),
    marginBottom: hp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionHeader: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
    marginLeft: wp('2%'),
    flex: 1,
  },
  sectionContent: {
    marginTop: hp('1.5%'),
    marginBottom: hp('3%'),
  },
  question: {
    fontSize: RFPercentage(2.2),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
  },
  answer: {
    fontSize: RFPercentage(1.8),
    marginBottom: hp('2%'),
  },
  input: {
    height: hp('6%'),
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: wp('2%'),
    paddingLeft: wp('3%'),
    marginBottom: hp('3%'),
  },
  textArea: {
    height: hp('15%'),
  },
  contactOptions: {
    marginTop: hp('3%'),
  },
});

export default HelpAndSupport;
