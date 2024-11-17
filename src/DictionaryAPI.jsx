import axios from 'axios';

const baseURL = 'https://api.dictionaryapi.dev/api/v2/entries/en';

const getWordDefinition = async (word) => {
  try {
    const response = await axios.get(`${baseURL}/${word}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching word definition:', error);
    return null;
  }
};

export default getWordDefinition;
