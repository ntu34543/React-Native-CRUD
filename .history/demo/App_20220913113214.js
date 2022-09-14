import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Button, FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function App() {
  const [data, setData] = useState([]);

  const getPosts = () => {
    fetch("https://6995-14-224-144-137.ap.ngrok.io/posts")
      .then((res) => res.json())
      .then((resJson) => {
        console.log("data", resJson);
        setData(resJson);
      })
      .catch((e) => console.error(e));
  };

  const addPosts = (title, author) => {
    fetch("https://6995-14-224-144-137.ap.ngrok.io/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        title: title,
        author: author,
      }),
    })
      .then((res) => res.json())
      .then((resJson) => {
        console.log("data", resJson);
        setData(resJson);
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getPosts();
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          return (
            <View style={styles.container}>
              <Text>{item.title}</Text>
              <Text>{item.author}</Text>
              <TouchableOpacity>
                
              </TouchableOpacity>
            </View>
          );
        }}
      />
      <Button title="Add Post" onPress={() => {addPosts('title', 'posts')}}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
