import React, { useState } from 'react';
import axios from 'axios';
import { Form, TextArea, Button, Icon } from 'semantic-ui-react';

const languagesList = [
  { name: 'English', code: 'en' },
  { name: 'Spanish', code: 'es' },
  { name: 'French', code: 'fr' },
  // Add more languages as needed
];

const App = () => {
  const [inputText, setInputText] = useState('');
  const [detectLanguageKey, setDetectLanguageKey] = useState('');
  const [selectedLanguageKey, setSelectedLanguageKey] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const languageKey = (selectedLanguage) => {
    setSelectedLanguageKey(selectedLanguage.target.value);
  };

  const getLanguageSource = () => {
    axios.post(`https://libretranslate.de/detect`, {
      q: inputText,
    })
      .then((response) => {
        setDetectLanguageKey(response.data.language);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const translateText = () => {
    let data = {
      q: inputText,
      source: detectLanguageKey,
      target: selectedLanguageKey,
    };
    axios.post(`https://libretranslate.de/translate`, data)
      .then((response) => {
        setTranslatedText(response.data.translatedText);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Form>
        <TextArea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to translate"
        />
        <select className="language-select" onChange={languageKey}>
          <option>Please Select Language..</option>
          {languagesList.map((language) => (
            <option value={language.code}>{language.name}</option>
          ))}
        </select>
        <Button color="orange" size="large" onClick={getLanguageSource}>
          <Icon name="translate" />
          Detect Language
        </Button>
        <Button color="orange" size="large" onClick={translateText}>
          <Icon name="translate" />
          Translate
        </Button>
      </Form>
      <TextArea value={translatedText} placeholder="Translated text" />
    </div>
  );
};

export default App;