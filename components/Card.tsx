import React from "react";
import { View, StyleSheet } from "react-native";

type Props = {
  children: any;
  style: any;
};

const Card = (props: Props) => {
  return (
    <View style={{ ...styles.card, ...props.style }}>{props.children}</View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "90%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 1,
    shadowOpacity: 0.22,
    elevation: 2.22,
    backgroundColor: "lightgrey",
    padding: 20,
    borderRadius: 11,
    //borderColor: 'black'
  },
});

export default Card;
