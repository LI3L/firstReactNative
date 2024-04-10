import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { faker } from "@faker-js/faker";
import { useUser } from "./UserContext";

const UsersListScreen = ({ setuseStateList }) => {
  const { userData, setUserData } = useUser();
  const [users, setUsers] = useState([]);

  const createUsers = () => {
    const newUsers = [];
    for (let i = 0; i < 10; i++) {
      newUsers.push({
        id: i,
        name: faker.person.firstName(),
        lastName: faker.person.lastName(),
        age: Math.floor(Math.random() * (65 - 18 + 1)) + 18,
        gender: faker.person.sexType(),
        email: faker.internet.email(),
      });
    }
    setuseStateList(newUsers);
    setUsers(newUsers);
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

  const getColor = (name) => {
    const nameHash = hashCode(name);
    return "#" + intToRGB(nameHash);
  };

  const renderUser = ({ item }) => {
    return (
      <View style={styles.userContainer}>
        <View style={[styles.avatar, { backgroundColor: getColor(item.name) }]}>
          <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {userData &&
        userData.map((user) => {
          return (
            <View style={styles.userContainer}>
              <View
                style={[
                  styles.avatar,
                  { backgroundColor: getColor(user.name) },
                ]}
              >
                <Text style={styles.avatarText}>{user.name.charAt(0)}</Text>
              </View>
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
              </View>
            </View>
          );
        })}
      <View style={styles.buttonContainer}>
        <Button title="Create Users" onPress={createUsers} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  userContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  userEmail: {
    fontSize: 14,
    color: "gray",
  },
  emptyText: {
    fontSize: 16,
    marginVertical: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default UsersListScreen;
