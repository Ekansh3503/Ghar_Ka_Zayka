import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants/Colors';

const RecipeInfoItem = ({ icon, text }) => {
  return (
    <View style={styles.infoItem}>
      <MaterialIcons
        name={icon}
        size={RFValue(24)}
        color={Colors.primaryBlack}
      />
      <Text style={styles.infoText}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: wp('40%'),
    marginVertical: hp('1%'),
    padding: wp('2%'),
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: wp('5%'),
    backgroundColor: '#edf2fb',
  },
  infoText: {
    fontSize: RFValue(12),
    marginLeft: wp('1%'),
    color: Colors.primaryBlack,
    fontWeight: 'bold',
  },
});

export default RecipeInfoItem;
