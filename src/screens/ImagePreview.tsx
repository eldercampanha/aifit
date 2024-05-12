import React, {useEffect, useState} from 'react';
import {View, Image, ScrollView, Button, StyleSheet, Text} from 'react-native';
import useGemini from '../useGemini';
import {error} from 'console';

const ImagePreview = ({route, navigation}) => {
  const {images} = route.params;
  const [newImageURI, setNewImageURI] = useState<string | null>(null);
  const generateImage = useGemini(); // Destructure only 'generateImage'

  const handleStartAgain = () => {
    navigation.navigate('ImageCollector', {reset: true});
  };

  useEffect(() => {
    const generateAndSetImage = async () => {
      const res = await generateImage(
        images,
        'I have 3 images: 2 of clothing items (shirt/pants, dress/shoes, etc.) and 1 of a person. Combine the clothing images onto the person in a new image, creating a realistic and stylish outfit. (Optional: Add details about desired style, e.g., casual, formal, or how to wear the clothes, e.g., shirt tucked in)',
      );
      setNewImageURI(res);
    };
    generateAndSetImage();
  }, [generateImage, images]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {newImageURI ? (
          <Image source={{uri: newImageURI}} style={styles.image} />
        ) : (
          <Text style={styles.error}>Something Went Wrong</Text>
        )}
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
  error: {
    color: 'red',
    textAlign: 'center',
  },
});

export default ImagePreview;
