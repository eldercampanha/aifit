import {GoogleGenerativeAI} from '@google/generative-ai';
import {readFile} from 'react-native-fs';
import {Buffer} from 'buffer';
import Config from 'react-native-config';

const useGemini = () => {
  const apiKey = Config.API_KEY;
  const model = 'gemini-pro-vision';

  const generateImage = async (images, prompt) => {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);

      const modelParams = {
        model: model,
      };

      const generativeModel = await genAI.getGenerativeModel(modelParams);

      const imageData = await Promise.all(
        images.map(async imageUri => {
          const base64Data = await readFile(imageUri, 'base64');
          return {content: base64Data};
        }),
      );

      console.log({imageData});

      const response = await generativeModel.generateContent({
        contents: imageData,
        prompt,
      });

      const base64Image = response.response.text();

      const decodedImage = Buffer.from(base64Image, 'base64').toString('utf-8');

      return decodedImage;
    } catch {
      return null;
    }
  };

  return generateImage;
};

export default useGemini;
