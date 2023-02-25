import "./App.css";
import React, { useEffect, useState } from 'react';
import { useSpeechSynthesis } from "react-speech-kit";


export default function App() {
  const { speak } = useSpeechSynthesis(); //extract speak from useSpeechSynthesis api
  const [value, setValue] = React.useState(""); //use state hook from react, default value

  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.speechSynthesis !== 'undefined') {
      setVoices(window.speechSynthesis.getVoices());
    }
  }, []);

 const onVoiceSelect = (event) => {
    const selectedVoice = voices.find((voice) => voice.name === event.target.value);
    setSelectedVoice(selectedVoice);
 };

  return (
    <div className="speak">
      <div className="test1">
        <h1>Type to have it play back</h1>
      </div>
      <div className="test1">
        <textarea rows={10} value={value} //value that will be defined 
          onChange={(e) => setValue(e.target.value)} //when this function triggers, it calls setValue and pass target value in
        ></textarea> 
      </div> 
      <div className="test1"> 
        <button onClick={() => speak({ text: value, voice: selectedVoice })}>
          Speak
        </button> 
      </div>

      <div>
        <label htmlFor="voiceSelect">Select a voice:</label>
        <select id="voiceSelect" value={selectedVoice ? selectedVoice.name : ''} onChange={onVoiceSelect}>
          {voices.map((voice, index) => (
            <option key={index} value={voice.name}>{`${voice.name} (${voice.lang}) ${voice.default ? ' — DEFAULT' : ''}`}</option>
          ))}
        </select>
      </div>
    </div>
  );
}