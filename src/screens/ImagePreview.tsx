import React from 'react';
import {View, Image, ScrollView, Button, StyleSheet} from 'react-native';

const ImagePreview = ({route, navigation}) => {
  const {images} = route.params;

  const handleStartAgain = () => {
    navigation.navigate('ImageCollector', {reset: true});
  };
  return (
    <View style={styles.container}>
      <ScrollView>
        {images.map((image, index) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{uri: image.uri}} style={styles.image} />
          </View>
        ))}
      </ScrollView>
      <Button title="Start Again" onPress={handleStartAgain} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    padding: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
});

export default ImagePreview;
