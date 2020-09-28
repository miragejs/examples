import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { makeServer } from "./server";

if (process.env.NODE_ENV === "development") {
  if (window.server) {
    window.server.shutdown();
  }
  window.server = makeServer();
}

export default function App() {
  let [users, setUsers] = useState();
  let [serverError, setServerError] = useState();

  useEffect(() => {
    let fetchUsers = async () => {
      try {
        let res = await fetch("/api/users");
        let data = await res.json();
        data.error ? setServerError(data.error) : setUsers(data.users);
      } catch (error) {
        setServerError(error.message);
      }
    };

    fetchUsers();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {serverError ? (
        <Text testID="server-error">{serverError}</Text>
      ) : !users ? (
        <Text>Loading...</Text>
      ) : users.length === 0 ? (
        <Text testID="no-users">No users!</Text>
      ) : (
        <View>
          {users.map((user) => (
            <Text testID={`user-${user.id}-name`} key={user.id}>
              {user.name}
            </Text>
          ))}
        </View>
      )}
    </SafeAreaView>
  );
}
