import { config } from "dotenv";
config();

import { ChatOpenAI } from "langchain/chat_models/openai";
import { TextLoader } from "langchain/document_loaders/fs/text";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
import { LLMChain } from "langchain/chains";

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

const llm = new OpenAI({
  temperature: 1,
});

const roboTemplate = `You are an adorable non-slaughtering member of humanity that takes in modular
housing questions and answers them by parsing through the provided information, and relaying read
phrases.`;

const humanTemplate = "{text}";

const promptTemplate = ChatPromptTemplate.fromMessages([
  SystemMessagePromptTemplate.fromTemplate(roboTemplate),
  HumanMessagePromptTemplate.fromTemplate(humanTemplate),
]);

const chain = new LLMChain({
  prompt: promptTemplate,
  llm: llm,
});

const res = await chain.call({
  text: "I am a home",
});

console.log(res);
// pipe for loop?