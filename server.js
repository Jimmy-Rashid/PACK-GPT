import { config } from "dotenv";
config();

import { ChatOpenAI } from "langchain/chat_models/openai";
import { DirectoryLoader } from "langchain/document_loaders/fs/directory";
import { TextLoader } from "langchain/document_loaders/fs/text";
import {
  ChatPromptTemplate,
  SystemMessagePromptTemplate,
  HumanMessagePromptTemplate,
} from "langchain/prompts";
import { OpenAI } from "langchain/llms/openai";
import { LLMChain, RetrievalQAChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import * as fs from "fs";

// For podcasts and RDH
// const text = fs.readFileSync("Media/CombinedText.txt", "utf8");

// For Burnaby laneway housing guidelines
const text = fs.readFileSync("Burnaby Media/Burnaby Text.txt", "utf8");
const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
const docs = await textSplitter.createDocuments([text]);
const vectorStorage = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
const vectorRetriever = vectorStorage.asRetriever();

const llm = new OpenAI({
  cache: true,
  maxConcurrency: 1,
  temperature: 0.5,
});

const chain = RetrievalQAChain.fromLLM(llm, vectorRetriever);

const res = await chain.call({
  query:
    // "What sort of rental revenue can i expect from renting a 1000 square foot laneway site in a lower value area, can you provide some samples based on general assumptions",
    // "How long does it take to get a building permit",
    // "Are laneway homes expensive?",
    // "Are laneway homes a good investement?",
    // "What is the general opinion about modular laneway homes?",
    "How long would it take me to get a building permit in Burnaby, BC?",

    // Power apps, low coder
});

console.log(res);
