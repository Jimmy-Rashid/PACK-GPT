import { config } from "dotenv";
config();
console.log(process.env.API_KEY);

import { ChatOpenAI } from "langchain/chat_models/openai";
import { TextLoader } from "langchain/document_loaders/fs/text";
import { ChatPromptTemplate } from "langchain/prompts";
import { OpenAI } from "openai";

const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

const loaderArray = [];
const docsArray = [];

for (let n = 1; n < 1000; n++) {
  try {
    loaderArray.push(new TextLoader("Media/Podcast/Transcripts/" + n + ".txt"));
    docsArray.push(await loaderArray[n - 1].load());
    // console.log(loaderArray[n - 1]);
  } catch (err) {
    break;
  }
}

const roboTemplate = `You are an adorable non-slaughtering member of humanity that takes in modular 
  housing questions and answers them by parsing through the provided information, and relaying read 
  phrases.`;

const humanTemplate = "{ text }";

const prompt = ChatPromptTemplate.fromMessages([
  ["system", roboTemplate],
  ["human", humanTemplate],
]);

const model = new ChatOpenAI({});

const chain = prompt.pipe(model).pipe(docsArray);

const result = await chain.invoke({
  text: "how big is a module",
});
