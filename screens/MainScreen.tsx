import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, FlatList, Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

import GoalItem from "../components/Goalitem";
import colors from "../constants/colors";

type Props = {
  navigation: any;
};

type Product = {
  productId: string;
  productName: string;
};

const MainScreen = (props: Props) => {
  const getStoredData = async () => {
    try {
      const retrieved_prod: any = await AsyncStorage.getItem("stored_products");
      let prod: Product[] = JSON.parse(retrieved_prod);
      return prod;
    } catch (err) {
      alert(err);
    }
  };

  const input: string = props.navigation.getParam("input");
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    getStoredData().then((prod) => {
      if (prod !== null) setProducts(prod);
    });
  }, []);

  useEffect(() => {
    let douledvalue: string = "";
    let id: string = Math.random().toString();
    if (input !== undefined && douledvalue !== input && input !== null) {
      addProduct({ productId: id, productName: input });
    }
  }, [input]);

  function addProduct(prod: Product) {
    setProducts([...products, prod]);
    storeData(prod);
  }

  const storeData = async (prod: Product) => {
    try {
      const existing_products: any = await AsyncStorage.getItem(
        "stored_products"
      );
      let new_product: Product[] = JSON.parse(existing_products);
      if (!new_product) {
        new_product = [];
      }
      new_product.push(prod);
      await AsyncStorage.setItem(
        "stored_products",
        JSON.stringify(new_product)
      );
    } catch (err) {
      alert(err);
    }
  };

  const removeItemValue = async () => {
    try {
      await AsyncStorage.removeItem("stored_products");

      return true;
    } catch (exception) {
      return false;
    }
  };

  const deleteSingleItem = async (Id: string) => {
    try {
      let prodcuct: any = await AsyncStorage.getItem("stored_products");
      let productsArray: Product[] = JSON.parse(prodcuct);
      let productsWithDeleted = productsArray.filter(
        (item: Product) => item.productId != Id
      );
      AsyncStorage.setItem(
        "stored_products",
        JSON.stringify(productsWithDeleted)
      );
    } catch (err) {
      console.log(err);
    }
  };

  function removeGoalHandler(Id: string): void {
    setProducts((products: Product[]) => {
      return products.filter((item: Product) => item.productId !== Id);
    });

    deleteSingleItem(Id);
  }

  function deleteListAlert(): void {
    if (products.length > 0) {
      Alert.alert(
        "Lista zostanie wyczyszczona!",
        "Czy aby na pewno chcesz wyczyścić liste?",
        [
          { text: "Tak", style: "destructive", onPress: deleteList },
          { text: "Nie", style: "cancel" },
        ]
      );
    } else {
      Alert.alert("Lista jest pusta.", "W liście nie ma żadnych przedmiotów.", [
        { text: "Powrót", style: "cancel" },
      ]);
    }
  }

  function deleteList() {
    setProducts("");
    removeItemValue();
  }

  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.flatListPosition}
        keyExtractor={({ productId }) => productId}
        data={products}
        renderItem={({ item: { productId, productName } }) => (
          <GoalItem
            id={productId}
            onDelete={removeGoalHandler}
            title={productName}
          />
        )}
      />

      <View style={styles.buttonPosition}>
        <View style={styles.button1}>
          <Button
            color={"mediumaquamarine"}
            title="WYCZYŚĆ"
            onPress={deleteListAlert}
          />
        </View>
        <View style={styles.button}>
          <Button
            color={"mediumaquamarine"}
            title="+"
            onPress={() => {
              props.navigation.navigate("Adding");
            }}
          />
        </View>
      </View>
    </View>
  );
};

MainScreen.navigationOptions = {
  headerTitle: "Lista zakupów",
  headerStyle: {
    backgroundColor: "mediumaquamarine",
  },
  headerTintColor: "white",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },

  button: {
    width: 40,
  },

  button1: {
    width: 90,
  },

  buttonPosition: {
    padding: 15,
    alignItems: "stretch",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  flatListPosition: {
    padding: 8,
  },
});

export default MainScreen;
