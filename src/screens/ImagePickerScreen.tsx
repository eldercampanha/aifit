import React, {useEffect, useState} from 'react';
import {View, Button, Image, StyleSheet, ScrollView} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

const ImageCollector = ({route, navigation}) => {
  const [images, setImages] = useState([]);

  // Effect to check for reset
  useEffect(() => {
    if (route.params?.reset) {
      setImages([]);
    }
  }, [route.params?.reset]);

  const handleImageAdd = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.assets) {
        response.assets.forEach(asset => {
          setImages(prevImages => [...prevImages, {uri: asset.uri}]);
        });
      }
    });
  };

  return (
    <View style={styles.container}>
      {/* Scrollable image container */}
      <ScrollView contentContainerStyle={styles.imageContainer}>
        {images.map((image, index) => (
          <Image key={index} source={image} style={styles.image} />
        ))}
      </ScrollView>
      <View style={styles.buttonContainer}>
        {images.length < 3 && (
          <Button title="Add Image" onPress={handleImageAdd} />
        )}
        <Button
          title="Continue"
          disabled={images.length < 3}
          onPress={() => navigation.navigate('ImagePreview', {images})}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    margin: 10,
  },
  buttonContainer: {
    paddingBottom: 20, // Adds padding at the bottom for aesthetics
    paddingTop: 10,
    backgroundColor: '#f0f0f0', // Optional: adds a different background color to the button area
  },
});

export default ImageCollector;
