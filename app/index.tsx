import { Link } from 'expo-router';
import { Button, FlatList, Text, View } from 'react-native';

const dummyEntries = [
  { id: '1', title: 'First entry',  body: 'Today was alright' },
  { id: '2', title: 'Second entry', body: 'Could use a nap honestly' }
];

export default function Index() {
  return (
    <View
      style={{
        padding: 20
      }}
    >
      <FlatList
        data={dummyEntries}
        keyExtractor={(item) => item.id}
        renderItem={
          ({item}) => (
            <View style={{ marginBottom: 15 }}>
              <Text style={{ fontWeight: 'bold' }}>
                {item.title}
              </Text>
            </View>
          )
        }
      />

      <Link href="/new" asChild>
        <Button title="Add New Entry" />
      </Link>
    </View>
  );
}