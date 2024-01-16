// API Key Acquisition

import { config } from "dotenv";
config();

// Server Configuration

// import express from "express";
// const app = express();

// const port = 3000;
// app.listen(port, () => console.log("Port:" + port));

// app.use(express.static("public"));
// app.use(express.json());

// // For acquiring user messages

// app.get("/", (req, res) => {});

// GPT Configuration

import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";

import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "@langchain/openai";
import { EmbeddingsFilter } from "langchain/retrievers/document_compressors/embeddings_filter";
// import { LLMChainExtractor } from "langchain/retrievers/document_compressors/chain_extract";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { ContextualCompressionRetriever } from "langchain/retrievers/contextual_compression";

import * as fs from "fs";

const model = new ChatOpenAI({
  cache: true,
  maxConcurrency: 1,
  // temperature: 0.25,
});

const text = new PDFLoader("Burnaby Media/Burnaby Text.pdf", {
  parsedItemSeparator: "",
});
const baseCompressor = new EmbeddingsFilter({
  embeddings: new OpenAIEmbeddings(),
  similarityThreshold: 0.8,
});

const docs = await text.load();

const vectorStorage = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
const vectorRetriever = new ContextualCompressionRetriever({
  baseCompressor,
  baseRetriever: vectorStorage.asRetriever(),
});

const retrievedDocs = await vectorRetriever.getRelevantDocuments(
  "what is recommended area for a laneway home"
);

console.log({ retrievedDocs });

// const parser = new StringOutputParser({});

// const chain = RetrievalQAChain.fromLLM(model, vectorRetriever);

// async function QueryParser(query) {
//   const response = await chain.invoke({ query });
//   return parser.parse(response.text);
// }

// const stream = await QueryParser.stream(
//   // "What sort of rental revenue can i expect from renting a 1000 square foot laneway site in a lower value area, can you provide some samples based on general assumptions",
//   // "How long does it take to get a building permit",
//   // "Are laneway homes expensive?",
//   "Are laneway homes a good investment?"
//   // "What is the general opinion about modular laneway homes?",
//   // "How long would it take me to get a building permit in Burnaby, BC?",
// );

// for await (const chunk of stream) {
//   console.log(chunk);
// }
