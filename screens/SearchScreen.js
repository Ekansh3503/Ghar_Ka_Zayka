import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFPercentage } from "react-native-responsive-fontsize";
import { Colors } from "../constants/Colors"; 
import { searchRecipes, getRecipesByCategory } from "../Backend Api/Api";
import RecipeListComponent from "../components/RecipeListComponent";
import CategoryButtons from "../components/CategoryButtons";
import Icon from 'react-native-vector-icons/FontAwesome'; 

const categories = [
  "Indian", "French", "Italian", "Mexican", "Thai", "Chinese", "American", "Vegan", "Breakfast", "Lunch", "Dinner"
];

const SearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState(categories[0]); 

  useEffect(() => {
    if (search === "") {
      fetchCategoryRecipes(activeCategory);
    }
  }, [activeCategory, search]);

  const updateSearch = async (searchText) => {
    setSearch(searchText);
    if (searchText.length > 2) {
      setLoading(true);
      setError(null);

      try {
        const results = await searchRecipes(searchText);
        setRecipes(results);
      } catch (error) {
        setError(error.message);
      }

      setLoading(false);
    } else {
      setRecipes([]);
    }
  };

  const fetchCategoryRecipes = async (category) => {
    setActiveCategory(category);
    setLoading(true);
    setError(null);

    try {
      const results = await getRecipesByCategory(category.toLowerCase());
      setRecipes(results);
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  const navigateToRecipeDetail = (item) => {
    navigation.navigate("RecipeDetail", { recipe: item });
  };

  const clearSearch = () => {
    setSearch("");
    setRecipes([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.searchText}>Search</Text>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={Colors.primary} style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={updateSearch}
          placeholder="Explore delicious recipes here..."
          placeholderTextColor={Colors.primary} 
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={clearSearch}>
            <Icon name="times" size={20} color={Colors.primary} style={styles.icon} />
          </TouchableOpacity>
        )}
      </View>
      {search === "" && (
        <>
          <Text style={styles.categoriesTitle}>Categories</Text>
          <CategoryButtons
            categories={categories}
            onPressCategory={fetchCategoryRecipes}
            activeCategory={activeCategory}
          />
        </>
      )}
      <RecipeListComponent
        recipes={recipes}
        loading={loading}
        error={error}
        search={search}
        activeCategory={activeCategory}
        navigateToRecipeDetail={navigateToRecipeDetail}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primaryWhite,
    paddingTop: hp("8%"),
    paddingHorizontal: wp("4%"),
  },
  searchText: {
    fontSize: RFPercentage(4),
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: hp("2%"),
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: Colors.primaryWhite,
    elevation: 10, 
    shadowColor: Colors.primary, 
    shadowOffset: { width: 0, height: 5 }, 
    shadowOpacity: 0.3, 
    shadowRadius: 6, 
    paddingLeft: wp("2%"),
  },
  searchInput: {
    flex: 1,
    height: hp("6%"),
    fontSize: RFPercentage(2),
    color: Colors.primaryBlack,
    backgroundColor: Colors.primaryWhite,
    borderRadius: 15,
    paddingHorizontal: wp("2%"),
  },
  icon: {
    marginRight: wp("2%"),
    marginLeft: wp("2%"),
  },
  categoriesTitle: {
    fontSize: RFPercentage(3.5),
    fontWeight: "bold",
    color: Colors.primary,
    marginTop: hp("2%"),
    marginBottom: hp("2%"),
  },
});
export default SearchScreen;
