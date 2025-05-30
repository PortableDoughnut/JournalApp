import React, { useState } from 'react';
import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function NewEntryScreen() {
    const [items, setItems] = useState<string[]>([]);
    const [newItem, setNewItem] = useState('');

    return (
        <View style={{padding: 20}}>
            // User Entry Input
            <TextInput
            value={newItem}
            onChangeText={setNewItem}
            placeholder="Add new item..."
            style={{ borderWidth: 1, padding: 8, marginBottom: 10}}
            />
            <Button 
            title="Add Item"
            onPress={
                () => {
                    if(newItem.trim() == '') return;

                    setItems([...items, newItem]);
                    setNewItem('');
                }
            }
            />

            // List of what's been done
            <FlatList
            data={items}
            keyExtractor={(item, index) => index.toString()}
            renderItem={
                ({item, index}) => (
                    <TouchableOpacity
                    onPress={
                        () => {
                            const updated = [...items];
                            updated.splice(index, 1);
                            setItems(updated);
                        }
                    }
                    >
                        <Text style={{ padding: 10, fontSize: 18}}>{item}</Text>
                    </TouchableOpacity>
                )
            }
            />
        </View>
    );
}