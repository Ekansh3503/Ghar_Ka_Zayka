import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';

const SecurityAndPrivacy = () => {
  const [securityCollapsed, setSecurityCollapsed] = useState(true);
  const [privacyCollapsed, setPrivacyCollapsed] = useState(true);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Security and Privacy</Text>
      <Text style={styles.subtitle}>Learn about our security practices and privacy policies to keep your data safe.</Text>

      <TouchableOpacity onPress={() => setSecurityCollapsed(!securityCollapsed)} style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeader}>{securityCollapsed ? '▶' : '▼'} Security Practices</Text>
      </TouchableOpacity>
      <Collapsible collapsed={securityCollapsed}>
        <View style={styles.sectionContent}>
          <Text style={styles.question}>How do you protect my data?</Text>
          <Text style={styles.answer}>We use advanced encryption protocols to ensure that your data is secure both in transit and at rest. Regular security audits and vulnerability assessments are conducted to maintain the highest security standards.</Text>

          <Text style={styles.question}>What should I do if I suspect a security issue?</Text>
          <Text style={styles.answer}>If you suspect a security issue, please contact us immediately at gharkazayka07@gmail.com. We will investigate and take appropriate actions to address the concern.</Text>
          
          <Text style={styles.question}>Do you offer two-factor authentication?</Text>
          <Text style={styles.answer}>Currently, we do not offer two-factor authentication. However, we are constantly reviewing our security features and will consider this option in the future.</Text>
        </View>
      </Collapsible>

      <TouchableOpacity onPress={() => setPrivacyCollapsed(!privacyCollapsed)} style={styles.sectionHeaderContainer}>
        <Text style={styles.sectionHeader}>{privacyCollapsed ? '▶' : '▼'} Privacy Policy</Text>
      </TouchableOpacity>
      <Collapsible collapsed={privacyCollapsed}>
        <View style={styles.sectionContent}>
          <Text style={styles.question}>What personal information do you collect?</Text>
          <Text style={styles.answer}>We collect personal information such as your name, email address, and any other information you provide when creating an account or interacting with our services. This information is used to provide and improve our services.</Text>

          <Text style={styles.question}>How is my information used?</Text>
          <Text style={styles.answer}>Your information is used to personalize your experience, communicate with you, and improve our services. We do not sell or share your personal information with third parties except as required by law or for service improvement purposes.</Text>
          
          <Text style={styles.question}>How can I access or delete my information?</Text>
          <Text style={styles.answer}>You can access and manage your information through your account settings. If you wish to delete your account, please contact us at gharkazayka07@gmail.com and we will process your request according to our data retention policies.</Text>
        </View>
      </Collapsible>
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
    marginBottom: hp('1.5%'),
  },
  subtitle: {
    fontSize: RFPercentage(2.2),
    marginBottom: hp('3%'),
  },
  sectionHeaderContainer: {
    width: '100%',
    paddingVertical: hp('2%'),
    backgroundColor: '#f0f0f0', 
    borderRadius: wp('2%'),
    marginBottom: hp('2%'),
  },
  sectionHeader: {
    fontSize: RFPercentage(2.5),
    fontWeight: 'bold',
  },
  sectionContent: {
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
});

export default SecurityAndPrivacy;
