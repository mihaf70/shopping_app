import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import Card from "../components/Card";
import colors from "../constants/colors";
import Autocomplete from "react-native-autocomplete-input";
import AsyncStorage from "@react-native-community/async-storage";
import { TouchableOpacity } from "react-native-gesture-handler";


//cos tam zostalo pozmieniane 

//druga zmiana

//trzecia zmiana

//czwarta zmiana

type Props = {
  navigation: any;
  style: any;
};

type Product = {
  productId: string;
  productName: string;
};

const AddingScreen = (props: Props) => {
  useEffect(() => {
    getStoredData().then((prod) => {
      setProductsSuggestions(prod);
    });
  }, []);

  const [enteredProduct, setEnteredProduct] = useState<string>("");
  const [ammount, setAmmount] = useState<string>("");
  const [productsSuggestions, setProductsSuggestions] = useState<any>([]);
  const [filteredSuggestons, setFilteredSuggestions] = useState<Product[]>([]);

 function findProduct(query: string) {
    if (query) {
      const regex = new RegExp(`${query.trim()}`, "i");

      setFilteredSuggestions(
        productsSuggestions.filter(
          (product: Product) => product.productName.search(regex) >= 0
        )
      );
    } else {
      setFilteredSuggestions([]);
    }
  };

  function setSuggestion(suggestion: Product):void {
    let text: string = JSON.stringify(suggestion);
    text = text.replace(/"/gi, "");
    setEnteredProduct(text);
  }

  function enteredProductHandler(enteredText: string): void {
    if (productsSuggestions !== null) {
      findProduct(enteredText);
    }
    setEnteredProduct(enteredText);
  }

  function ammountHandler(enteredText: string): void {
    setAmmount(enteredText);
  }

  function confirmProduct(): void {
    let duplicatedSuggestion: boolean = false;

    if (productsSuggestions !== null) {
      var arrayLength = productsSuggestions.length;

      for (var i = 0; i < arrayLength; i++) {
        if (productsSuggestions[i].productName === enteredProduct) {
          duplicatedSuggestion = true;
        }
      }
    }

    let id: string = Math.random().toString();
    if (duplicatedSuggestion === false) {
      storeData({ productId: id, productName: enteredProduct });
    }

    let amountInt: number = parseInt(ammount);

    if (enteredProduct !== "") {
      if (isNaN(amountInt) || amountInt < 1 || ammount !== "") {
        props.navigation.navigate("Main", { input: enteredProduct });
      }

      if (amountInt > 1) {
        props.navigation.navigate("Main", {
          input: ammount + "  x  " + enteredProduct,
        });
      }

      setEnteredProduct("");
      setAmmount("");
    } else return;
  }

  const storeData = async (prod: Product) => {
    try {
      const existing_products: any = await AsyncStorage.getItem(
        "stored_suggestions"
      );
      let new_product: Product[] = JSON.parse(existing_products);
      if (!new_product) {
        new_product = [];
      }
      new_product.push(prod);
      await AsyncStorage.setItem(
        "stored_suggestions",
        JSON.stringify(new_product)
      );
    } catch (err) {
      alert(err);
    }
  };

  const getStoredData = async () => {
    try {
      const retrieved_prod: any = await AsyncStorage.getItem(
        "stored_suggestions"
      );
      let prod: Product[] = JSON.parse(retrieved_prod);
      return prod;
    } catch (err) {
      alert(err);
    }
  };

  const removeItemValue = async () => {
    try {
      await AsyncStorage.removeItem("stored_suggestions");
      setProductsSuggestions([]);

      return true;
    } catch (exception) {
      return false;
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.inputContainer}>
        <Card style={styles.screen}>
          <View style={{ height: 50, marginBottom: 10 }}>
            <Autocomplete
              blurOnSubmit
              autoCapitalize="none"
              placeholder="Nazwa przedmiotu"
              containerStyle={styles.autocompleteContainer}
              onChangeText={enteredProductHandler}
              value={enteredProduct}
              data={filteredSuggestons}
              renderItem={({ item }: { item: any }) => (
                <TouchableOpacity
                  onPress={() => {
                    setSuggestion(item.productName);
                    setFilteredSuggestions([]);
                  }}
                >
                  <Text style={styles.itemText}>{item.productName}</Text>
                </TouchableOpacity>
              )}
            />
          </View>

          <TextInput
            keyboardType="number-pad"
            placeholder="Ilość"
            style={styles.input}
            onChangeText={ammountHandler}
            value={ammount}
          />

          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button
                color={colors.accent}
                title="Dodaj"
                onPress={confirmProduct}
              />
            </View>
            <View style={styles.button1}>
              <Button
                title="Wyczyść sugestie"
                color={colors.accent}
                onPress={removeItemValue}
              />
            </View>
          </View>
        </Card>
      </View>
    </TouchableWithoutFeedback>
  );
};

AddingScreen.navigationOptions = {
  headerTitle: "Dodaj przedmiot do listy",
  headerStyle: {
    backgroundColor: colors.accent,
  },
  headerTintColor: "white",
};

const styles = StyleSheet.create({
  screen: {
    justifyContent: "center",
    alignItems: "center",
  },

  inputContainer: {
    flex: 0.7,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    height: 30,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    marginVertical: 13,
  },

  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "60%",
    marginTop: 15,
  },

  button: {
    width: "35%",
  },

  button1: {
    width: "45%",
  },
  autocompleteContainer: {
    flex: 1,
    right: 0,
    top: 0,
    zIndex: 1,
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
});

export default AddingScreen;


