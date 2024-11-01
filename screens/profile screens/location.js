import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, Dimensions, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Colors } from "../../constants/Colors";

const { width, height } = Dimensions.get("window");
const LocationSelection = ({ onLocationSelected }) => {
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [countryName, setCountryName] = useState(null);
  const [stateName, setStateName] = useState(null);
  const [cityName, setCityName] = useState(null);
  const [savedLocation, setSavedLocation] = useState(null);
  const [countryFocus, setCountryFocus] = useState(false);
  const [stateFocus, setStateFocus] = useState(false);
  const [cityFocus, setCityFocus] = useState(false);

  useEffect(() => {
    fetchCountries();
    loadSavedLocation();
  }, []);

  const loadSavedLocation = async () => {
    try {
      const saved = await AsyncStorage.getItem("location");
      if (saved !== null) {
        const parsedLocation = JSON.parse(saved);
        setSavedLocation(parsedLocation);
        setCountryName(parsedLocation.country);
        setStateName(parsedLocation.state || "");
        setCityName(parsedLocation.city || "");
        setCountry(parsedLocation.country);
        setState(parsedLocation.state);
        setCity(parsedLocation.city);
      }
    } catch (error) {
      console.error("Error loading saved location", error);
    }
  };

  const fetchCountries = async () => {
    const config = {
      method: "get",
      url: "https://api.countrystatecity.in/v1/countries",
      headers: {
        "X-CSCAPI-KEY":
          "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
      },
    };

    try {
      const response = await axios(config);
      const countryArray = response.data.map((country) => ({
        value: country.iso2,
        label: country.name,
      }));
      setCountryData(countryArray);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const fetchStates = async (countryCode) => {
    const config = {
      method: "get",
      url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
      headers: {
        "X-CSCAPI-KEY":
          "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
      },
    };

    try {
      const response = await axios(config);
      const stateArray = response.data.map((state) => ({
        value: state.iso2,
        label: state.name,
      }));
      setStateData(stateArray);
    } catch (error) {
      console.error("Error fetching states:", error);
    }
  };

  const fetchCities = async (countryCode, stateCode) => {
    const config = {
      method: "get",
      url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
      headers: {
        "X-CSCAPI-KEY":
          "NHhvOEcyWk50N2Vna3VFTE00bFp3MjFKR0ZEOUhkZlg4RTk1MlJlaA==",
      },
    };

    try {
      const response = await axios(config);
      const cityArray = response.data.map((city) => ({
        value: city.id,
        label: city.name,
      }));
      setCityData(cityArray);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const saveLocation = async () => {
    const location = {
      country:
        countryName ||
        countryData.find((item) => item.value === country)?.label ||
        "",
      state: stateName || "",
      city: cityName || "",
    };

    try {
      await AsyncStorage.setItem("location", JSON.stringify(location));

      const stateText = location.state
        ? `State: ${location.state}`
        : "State: N/A";
      const cityText = location.city ? `City: ${location.city}` : "City: N/A";

      Alert.alert(
        "Location Saved",
        `Country: ${location.country}\n${stateText}\n${cityText}`
      );

      setSavedLocation(location);

      if (onLocationSelected) {
        onLocationSelected(location);
      }
    } catch (error) {
      console.error("Error saving location", error);
    }
  };

  const handleStateChange = (item) => {
    setState(item.value);
    fetchCities(country, item.value);
    setStateName(item.label);
    setCity(null);
    setCityName("");
    setStateFocus(false);
  };

  const handleCountryChange = (item) => {
    setCountry(item.value);
    fetchStates(item.value);
    setCountryName(item.label);
    setState(null);
    setCity(null);
    setStateName("");
    setCityName("");
    setCountryFocus(false);
  };

  return (
    <View style={styles.container}>
      {savedLocation && (
        <View style={styles.savedLocationContainer}>
          <Text style={styles.savedLocationText}>
            Saved Location: {savedLocation.country},{" "}
            {savedLocation.state || "N/A"}, {savedLocation.city || "N/A"}
          </Text>
        </View>
      )}
      <View style={styles.selectionContainer}>
        <Dropdown
          style={[styles.dropdown, countryFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={countryData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!countryFocus ? "Select country" : "..."}
          searchPlaceholder="Search..."
          value={country}
          onFocus={() => setCountryFocus(true)}
          onBlur={() => setCountryFocus(false)}
          onChange={handleCountryChange}
        />
        <Dropdown
          style={[styles.dropdown, stateFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={stateData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!stateFocus ? "Select state" : "..."}
          searchPlaceholder="Search..."
          value={state}
          onFocus={() => setStateFocus(true)}
          onBlur={() => setStateFocus(false)}
          onChange={handleStateChange}
        />
        <Dropdown
          style={[styles.dropdown, cityFocus && { borderColor: "blue" }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={cityData}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={!cityFocus ? "Select city" : "..."}
          searchPlaceholder="Search..."
          value={city}
          onFocus={() => setCityFocus(true)}
          onBlur={() => setCityFocus(false)}
          onChange={(item) => {
            setCity(item.value);
            setCityName(item.label);
            setCityFocus(false);
          }}
        />
        <TouchableOpacity style={styles.submitButton} onPress={saveLocation}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationSelection;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectionContainer: {
    backgroundColor: "#fff",
    padding: height * 0.025, 
    borderRadius: 15,
    width: "90%", 
  },
  savedLocationContainer: {
    marginBottom: 10,
    padding: height * 0.02, 
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "90%", 
    alignItems: "center",
  },
  savedLocationText: {
    fontSize: width * 0.04, 
    fontWeight: "bold",
    color: "#333",
  },
  dropdown: {
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: width * 0.03, 
    marginBottom: height * 0.015, 
  },
  placeholderStyle: {
    fontSize: width * 0.04, 
  },
  selectedTextStyle: {
    fontSize: width * 0.04, 
  },
  inputSearchStyle: {
    height: 40,
    fontSize: width * 0.04, 
  },
  submitButton: {
    backgroundColor: Colors.primary, 
    padding: height * 0.02, 
    borderRadius: 15,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    textTransform: "uppercase",
    fontWeight: "600",
    fontSize: width * 0.045,
  },
});
