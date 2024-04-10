// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewUserScreen from "./componnents/NewUserScreen";
import UsersListScreen from "./componnents/UsersListScreen";
import { UserProvider } from "./componnents/UserContext";

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name="NewUser" component={NewUserScreen} />
          <Tab.Screen name="UsersList" component={UsersListScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
};

export default App;
