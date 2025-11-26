import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import axios from "axios";
import { useEffect, useState } from 'react';

export default function App() {
  // replace with Strapi Production URL
  const STRAPI_URL = "http://localhost:1337";

  // State to store articles
  const [articles, setArticles] = useState([]);

  // fetch articles from Strapi
  const fetchArticles = async () => {
    try {
      // Fetch articles along with their covers
      const response = await axios.get(`${STRAPI_URL}/api/articles?populate=*`);
      setArticles(response.data.data);
    } catch (error) {
      console.error("Error fetching articles:", error);
    }
  };

  // Format date
  const formatDate = (date) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(date).toLocaleDateString("en-US", options);
  };


  // Render article card
  const renderArticle = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={{ uri: `${STRAPI_URL}${item.cover.url}` }}
        style={styles.image}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.published}>Published: {formatDate(item.publishedAt)}</Text>
    </View>
  );

  // Fetch articles on component mount
  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>React Native and Strapi Integration</Text>
      <FlatList
        title="Articles"
        data={articles}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderArticle}
        numColumns={2}
        contentContainerStyle={styles.container}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  published: {
    fontSize: 12,
    color: '#666',
    paddingHorizontal: 5,
    marginBottom: 5,
  },
  heading: {
    marginTop: 40,
    fontSize: 24,
    textAlign: "center",
    fontWeight: "900"
  }
});
