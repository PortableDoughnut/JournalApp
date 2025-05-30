import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Button, FlatList, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Entry } from '../models/entry';

export default function Index() {
  const [items, setItems] = useState<Entry[]>([]);
  const [newItem, setNewItem] = useState<Entry>({ title: '', body: '' });
  const [isNewEntryVisible, setIsNewEntryVisible] = useState(false);

  return (
    <View style={styles.container}>
      <FlatList 
        data={items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity style={styles.entry}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.body}>{item.body}</Text>
          </TouchableOpacity>
        )}
      />

      <Button
        title={isNewEntryVisible ? 'Cancel' : 'New Entry'}
        onPress={() => setIsNewEntryVisible(!isNewEntryVisible)}
      />

      {isNewEntryVisible && (
        <View style={styles.form}>
          <TextInput
            value={newItem.title}
            onChangeText={(text) => setNewItem({ ...newItem, title: text })}
            placeholder="Title"
            style={styles.input}
          />
          <TextInput
            value={newItem.body}
            onChangeText={(text) => setNewItem({ ...newItem, body: text })}
            placeholder="Body"
            style={styles.input}
            multiline
          />
          <Button 
            title="Add Entry"
            onPress={() => {
              if (newItem.title.trim() === '' || newItem.body.trim() === '') return;

              setItems([...items, newItem]);
              setNewItem({ title: '', body: '' });
              setIsNewEntryVisible(false);
            }}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  entry: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 4,
  },
  body: {
    fontSize: 16,
    color: '#444',
  },
  form: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 12,
    borderRadius: 6,
  },
});
