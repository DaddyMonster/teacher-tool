import { TextToSpeechClient } from "@google-cloud/text-to-speech";

const ttsClientConfig =
  process.env.NODE_ENV === "production"
    ? undefined
    : {
        keyFilename: process.env.STORAGE_KEY_PATH,
        projectId: process.env.PROJECT_ID,
      };

const client = new TextToSpeechClient(ttsClientConfig);

export const getTTs = async (text: string) => {
  try {
    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: {
        languageCode: "en-US",
        name: "en-US-Wavenet-F",
      },
      audioConfig: {
        audioEncoding: "MP3",
      },
    });
    return response.audioContent as Uint8Array;
  } catch (err) {
    throw new Error("TTS ERROR" + err);
  }
};
