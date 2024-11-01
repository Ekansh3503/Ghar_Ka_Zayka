import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../constants/Colors';

const NutritionInfo = ({ recipe = {} }) => {
  return (
    <View style={styles.container}>
      <View style={styles.recipeCard}>
        <Text style={styles.subtitle}>Nutritional Information</Text>
        {recipe.calories != null && (
          <View style={styles.nutritionRow}>
            <Text style={styles.nutritionLabel}>Calories:</Text>
            <Text style={styles.nutritionValue}>{recipe.calories}</Text>
          </View>
        )}
        {recipe.protein != null && (
          <View style={styles.nutritionRow}>
            <Text style={styles.nutritionLabel}>Protein:</Text>
            <Text style={styles.nutritionValue}>{recipe.protein}g</Text>
          </View>
        )}
        {recipe.fat != null && (
          <View style={styles.nutritionRow}>
            <Text style={styles.nutritionLabel}>Fat:</Text>
            <Text style={styles.nutritionValue}>{recipe.fat}g</Text>
          </View>
        )}
        {recipe.weightWatcherSmartPoints != null && (
          <View style={styles.nutritionRow}>
            <Text style={styles.nutritionLabel}>Weight Watcher SmartPoints:</Text>
            <Text style={styles.nutritionValue}>{recipe.weightWatcherSmartPoints}</Text>
          </View>
        )}
        {recipe.healthScore != null && (
          <View style={styles.nutritionRow}>
            <Text style={styles.nutritionLabel}>Health Score:</Text>
            <Text style={styles.nutritionValue}>{recipe.healthScore}</Text>
          </View>
        )}
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
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp('1%'),
  },
  nutritionLabel: {
    fontSize: RFValue(16),
    fontWeight: 'bold',
  },
  nutritionValue: {
    fontSize: RFValue(16),
  },
});

export default NutritionInfo;
