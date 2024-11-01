import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../constants/Colors';

const stripHtmlTags = (html) => {
  return html.replace(/<\/?[^>]+(>|$)/g, "");
};

const RecipeDescription = ({ description }) => {
  const cleanDescription = stripHtmlTags(description);

  return (
    <View style={styles.container}>
      <View style={styles.descriptionCard}>
        <Text style={styles.subtitle}>Description</Text>
        <Text style={styles.descriptionText}>{cleanDescription}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  subtitle: {
    fontSize: RFValue(20),
    fontWeight: 'bold',
    marginVertical: hp('1%'),
    color: Colors.primary,
    textAlign: 'center',
  },
  descriptionCard: {
    backgroundColor: Colors.primaryWhite,
    borderRadius: wp('4%'),
    overflow: 'hidden',
    shadowColor: '#1703f3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    padding: wp('4%'),
  },
  descriptionText: {
    fontSize: RFValue(16),
    color: Colors.secondary,
  },
});

export default RecipeDescription;
