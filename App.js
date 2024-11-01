import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RFValue } from 'react-native-responsive-fontsize';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Colors } from './constants/Colors';
import { FavoriteProvider } from './context/FavoriteContext';
import StartScreen from './screens/StartScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import SearchScreen from './screens/SearchScreen';
import AddRecipe from './screens/AddRecipe';
import FavouriteScreen from './screens/FavouriteScreen';
import ProfileScreen from './screens/ProfileScreen';
import RecipeDetail from './screens/RecipeDetail';
import SettingsScreen from './screens/profile screens/settings';
import HelpAndSupport from './screens/profile screens/helpAndSupport';
import SecurityAndPrivacy from './screens/profile screens/securityAndPrivacy';
import ContactUs from './screens/profile screens/contactUs';
import ChangePassword from './screens/profile screens/changePassword';
import LocationSelection from './screens/profile screens/location';
import DeleteAccount from './screens/profile screens/deleteAccount';
import Chatbot from './screens/ChatbotScreen';
import EditProfile from './screens/profile screens/editprofile';
import MyRecipes from './screens/profile screens/MyRecipes';

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const HomeStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={HomeScreen}
      options={{
        headerShown: true,
        headerTitle: 'Recipes',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFValue(24),
        },
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name="RecipeDetail"
      component={RecipeDetail}
      options={{
        headerShown: true,
        headerTitle: 'Recipe Details',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFValue(24),
        },
        headerTitleAlign: 'center',
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Chatbot"
      component={Chatbot}
      options={{
        headerTitle: 'Zayka Bot',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFValue(24),
        },
        headerTitleAlign: 'center',
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        headerTitle: 'Settings',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFValue(24),
        },
        headerTitleAlign: 'center',
      }}
    />
  </Stack.Navigator>
);

const SearchStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="SearchScreen"
      component={SearchScreen}
      options={{
        headerShown: false
      }}
    />
    <Stack.Screen
      name="RecipeDetail"
      component={RecipeDetail}
      options={{
        headerTitle: 'Recipe Details',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFValue(24),
        },
        headerTitleAlign: 'center',
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

const FavouriteStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="FavouriteScreen"
      component={FavouriteScreen}
      options={{
        headerShown: true,
        headerTitle: 'Favourite Recipes',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFValue(24),
        },
        headerTitleAlign: 'center',
      }}
    />
    <Stack.Screen
      name="RecipeDetail"
      component={RecipeDetail}
      options={{
        headerTitle: 'Recipe Details',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFValue(24),
        },
        headerTitleAlign: 'center',
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

const MyRecipesNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="MyRecipesScreen"
      component={MyRecipes}
      options={{
        headerTitle: 'My Recipes',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFValue(24),
        },
        headerTitleAlign: 'center',
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="RecipeDetail"
      component={RecipeDetail}
      options={{
        headerTitle: 'Recipe Details',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFValue(24),
        },
        headerTitleAlign: 'center',
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

const ProfileStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="ProfileScreen"
      component={ProfileScreen}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="editprofile"
      component={EditProfile}
      options={{
        headerTitle: 'Edit Profile',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFValue(24),
        },
        headerTitleAlign: 'center',
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="MyRecipes"
      component={MyRecipesNavigator}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        headerTitle: 'Settings',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFValue(24),
        },
        headerTitleAlign: 'center',
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="ChangePassword"
      component={ChangePassword}
      options={{
        headerTitle: 'Change Password',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFValue(24),
        },
        headerTitleAlign: 'center',
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}
    />

    <Stack.Screen
      name="Location"
      component={LocationSelection}
      options={{
        headerTitle: 'Location',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFValue(24),
        },
        headerTitleAlign: 'center',
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="DeleteAccount"
      component={DeleteAccount}
      options={{
        headerTitle: 'Delete Account',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFValue(24),
        },
        headerTitleAlign: 'center',
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="HelpAndSupport"
      component={HelpAndSupport}
      options={{
        headerTitle: 'Help And Support',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFValue(24),
        },
        headerTitleAlign: 'center',
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="SecurityAndPrivacy"
      component={SecurityAndPrivacy}
      options={{
        headerTitle: 'Security And Privacy',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFValue(24),
        },
        headerTitleAlign: 'center',
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}
    />
    <Stack.Screen
      name="ContactUs"
      component={ContactUs}
      options={{
        headerTitle: 'Contact Us',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFValue(24),
        },
        headerTitleAlign: 'center',
        headerBackTitle: '',
        headerBackTitleVisible: false,
      }}
    />
  </Stack.Navigator>
);

const BottomTabNavigator = () => (
  <BottomTab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        const iconSize = focused ? RFValue(size + 12) : RFValue(size + 3);
        const iconVariant = focused ? '' : '-outline';

        switch (route.name) {
          case 'Recipes':
            iconName = 'local-dining';
            break;
          case 'Search':
            iconName = 'search';
            break;
          case 'Add Recipe':
            iconName = `add-circle${iconVariant}`;
            break;
          case 'Favourite Recipe':
            iconName = `favorite${iconVariant}`;
            break;
          case 'Profile':
            iconName = `person${iconVariant}`;
            break;
        }

        return <MaterialIcons name={iconName} size={iconSize} color={color} />;
      },
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: Colors.primaryWhite,
      },
      tabBarActiveTintColor: Colors.primary,
      tabBarInactiveTintColor: Colors.primarylight,
    })}
  >
    <BottomTab.Screen
      name="Recipes"
      component={HomeStackNavigator}
      options={{ headerShown: false }}
    />
    <BottomTab.Screen
      name="Search"
      component={SearchStackNavigator}
      options={{ headerShown: false }}
    />
    <BottomTab.Screen
      name="Add Recipe"
      component={AddRecipe}
      options={{
        headerTitle: 'Add Recipe',
        headerStyle: {
          backgroundColor: Colors.primaryWhite,
        },
        headerTintColor: Colors.primary,
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: RFValue(24),
        },
        headerTitleAlign: 'center',
      }}
    />
    <BottomTab.Screen
      name="Favourite Recipe"
      component={FavouriteStackNavigator}
      options={{ headerShown: false }}
    />
    <BottomTab.Screen
      name="Profile"
      component={ProfileStackNavigator}
      options={{ headerShown: false }}
    />
  </BottomTab.Navigator>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <FavoriteProvider>
        {user ? (
          <BottomTabNavigator />
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="StartScreen"
              component={StartScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignupScreen"
              component={SignupScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        )}
      </FavoriteProvider>
    </NavigationContainer>
  );
};

export default App;
