import { config } from "dotenv";
config();
console.log(process.env.API_KEY);

import { TextLoader } from "langchain/document_loaders/fs/text";

for (n = 1; n < 100; n++) {
  window["Podcast " + n] = new TextLoader(
    "Media/Podcast/Transcripts/" + n + ".txt"
  );
  window["Document " + n] = await ["Podcast " + n].load();

  console.log(window["Podcast " + n]);
}
