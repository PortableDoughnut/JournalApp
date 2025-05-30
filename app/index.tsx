import React, { useState } from 'react';
import {
  Button,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entry } from '../models/entry';

export default function Index() {
  const [items, setItems] = useState<Entry[]>([]);
  const [newItem, setNewItem] = useState<Entry>({ title: '', body: '' });
  const [isNewEntryVisible, setIsNewEntryVisible] = useState(false);

  const InnerContent = (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <FlatList
          data={items}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.entry}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.body}>{item.body}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ paddingBottom: 120 }}
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
    </SafeAreaView>
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {Platform.OS !== 'web' ? (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          {InnerContent}
        </TouchableWithoutFeedback>
      ) : (
        InnerContent
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  entry: {
    padding: 12,
    backgroundColor: '#eee',
    marginBottom: 10,
    borderRadius: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  body: {
    fontSize: 14,
  },
  form: {
    marginTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});
