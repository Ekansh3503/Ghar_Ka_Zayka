import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { Colors } from '../constants/Colors';

const RecipeCard = ({ image, title, readyInMinutes, veryPopular, vegetarian, category, onPress }) => (
  <Pressable 
    onPress={onPress} 
    style={({ pressed }) => [
      {
        opacity: pressed ? 0.8 : 1,
      },
      styles.cardContainer
    ]}
  >
    <View style={styles.recipeCard}>
      <Image source={{ uri: image }} style={styles.recipeImage} />
      <View style={styles.recipeInfo}>
        <Text style={styles.recipeTitle}>{title}</Text>
        <View style={styles.detailsContainer}>
          <View style={styles.leftDetails}>
            <Text style={styles.detailLabel}>Time: </Text>
            <Text style={styles.detailText}>{`${readyInMinutes} mins`}</Text>
          </View>
          <View style={styles.rightDetails}>
            <Text style={styles.detailLabel}>Category: </Text>
            <Text style={styles.detailText}>{category}</Text>
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.leftDetails}>
            <Text style={styles.detailLabel}>Difficulty: </Text>
            <Text style={styles.detailText}>{veryPopular ? 'Easy' : 'Medium'}</Text>
          </View>
          <View style={styles.rightDetails}>
            <Text style={styles.detailLabel}>Diet: </Text>
            <Text style={styles.detailText}>{vegetarian ? 'Vegetarian' : 'Non-Vegetarian'}</Text>
          </View>
        </View>
      </View>
    </View>
  </Pressable>
);

const styles = StyleSheet.create({
  cardContainer: {
    marginBottom: hp('2%'),
    paddingHorizontal: wp('2%'),
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
    shadowColor: '#1703f3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  recipeCard: {
    backgroundColor: Colors.primaryWhite,
    borderRadius: wp('4%'),
    overflow: 'hidden',
    shadowColor: '#1703f3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  recipeImage: {
    width: '100%',
    height: hp('30%'),
    resizeMode: 'cover',
  },
  recipeInfo: {
    padding: wp('4%'),
  },
  recipeTitle: {
    fontSize: RFPercentage(3),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
    color: Colors.primary,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
  },
  leftDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: RFPercentage(2),
    color: Colors.primary,
    fontWeight: 'bold',
    marginRight: wp('1%'),
  },
  detailText: {
    fontSize: RFPercentage(2),
    color: Colors.primaryBlack,
  },
});

export default RecipeCard;
