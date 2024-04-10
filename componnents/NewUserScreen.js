import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { faker } from "@faker-js/faker";
import { useUser } from "./UserContext";

const NewUserScreen = () => {
  const { userData, setUserData } = useUser();
  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    age: "",
  });

  const createRandomUser = () => {
    const newUser = {
      name: faker.person.firstName(),
      email: faker.internet.email(),
      gender: faker.person.sexType(),
      password: faker.internet.password(),
      age: Math.floor(Math.random() * (65 - 18 + 1)) + 18,
    };
    setUser(newUser);
  };

  const createNewUser = () => {
    setUserData([...userData, user]);
    setUser({
      name: "",
      email: "",
      gender: "",
      password: "",
      age: "",
    });
  };

  const hashCode = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return hash;
  };

  const intToRGB = (i) => {
    const c = (i & 0x00ffffff).toString(16).toUpperCase();
    return "00000".substring(0, 6 - c.length) + c;
  };

  const getColor = () => {
    const nameHash = hashCode(user.name);
    return "#" + intToRGB(nameHash);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.avatar, { backgroundColor: getColor() }]}>
        <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={user.name}
        onChangeText={(data) => setUser({ ...user, name: data })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={user.email}
        onChangeText={(data) => setUser({ ...user, email: data })}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={user.gender}
        onChangeText={(data) => setUser({ ...user, gender: data })}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        value={user.age}
        onChangeText={(data) => setUser({ ...user, age: data })}
        keyboardType="numeric"
      />
      <Button title="Create New User" onPress={createNewUser} />
      <Button title="Create Random User" onPress={createRandomUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  input: {
    width: "80%",
    height: 40,
    borderWidth: 1,
    borderColor: "gray",
    marginVertical: 10,
    paddingHorizontal: 10,
  },
});

export default NewUserScreen;
