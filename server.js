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

const loader = new DirectoryLoader("Media", {
  ".txt": (path) => new TextLoader(path),
});

const text = await loader.load();

console.log(text);

const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000 });
const docs = await textSplitter.splitText([text]);

const vectorStorage = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());

const vectorRetriever = vectorStorage.asRetriever();

const llm = new OpenAI({
  temperature: 0,
});

const chain = RetrievalQAChain.fromLLM(llm, vectorRetriever);

const res = await chain.call({
  query: "how many home types are there?",
});

console.log(res);
// pipe for loop?
