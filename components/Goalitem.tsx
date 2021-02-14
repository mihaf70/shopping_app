import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CheckBox } from "react-native-elements";
import Card from "../components/Card";
import { Ionicons } from "@expo/vector-icons";

type Props = {
  title: string;
  onDelete: Function;
  id: string;
};

const GoalItem = (props: Props) => {
  const [toggleCheckBox, setToggleCheckBox] = useState<boolean>(false);
  const [checkToIcon, setCheckToIcon] = useState<boolean>(false);

  function changeBoxToIcon() {
    if (toggleCheckBox === true) {
      setCheckToIcon(true);
    }
  }

  let component:any;

  if (checkToIcon === false) {
    component = (
      <CheckBox
        style={styles.checkBoxPosition}
        checkedIcon="check-circle"
        uncheckedIcon="circle"
        checkedColor="dimgray"
        uncheckedColor="silver"
        checked={toggleCheckBox}
        size={25}
      />
    );
  } else {
    component = (
      <Ionicons
        style={styles.checkBoxPosition}
        name="trash"
        color="dimgray"
        size={25}
        onPress={props.onDelete.bind(this, props.id)}
      />
    );
  }

  return (
    <TouchableOpacity
      onPress={() => setToggleCheckBox(true)}
      onLongPress={changeBoxToIcon}
    >
      <View style={styles.itemPosition}>
        <Card style={styles.listItem}>
          <Text style={styles.text}>{props.title}</Text>
          {component}
        </Card>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemPosition: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 2.3,
  },

  listItem: {
    height: 45,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  checkBoxPosition: {
    padding: 21,
  },

  text: {
    fontSize: 17,
  },
});

export default GoalItem;
