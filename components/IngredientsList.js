import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../constants/Colors';

const IngredientsList = ({ ingredients }) => {
  return (
    <View style={styles.container}>
      <View style={styles.recipeCard}>
        <Text style={styles.subtitle}>Ingredients</Text>
        {ingredients?.map((ingredient, index) => (
          <View key={index} style={styles.ingredientContainer}>
            <Text style={styles.bullet}>●</Text>
            <Text style={styles.ingredient}>{ingredient.original || ingredient}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: hp('4%'),
    marginBottom: hp('2%'),
  },
  subtitle: {
    fontSize: RFValue(24),
    fontWeight: 'bold',
    marginVertical: hp('2%'),
    color: Colors.primary,
    textAlign: 'center',
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
    padding: wp('4%'),
  },
  ingredientContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: hp('0.5%'),
  },
  bullet: {
    fontSize: RFValue(12),
    marginRight: wp('2%'),
    color: '#333',
  },
  ingredient: {
    fontSize: RFValue(16),
  },
});

export default IngredientsList;
