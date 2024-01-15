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

import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { RetrievalQAChain } from "langchain/chains";
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

const model = new ChatOpenAI({
  // cache: true,
  // maxConcurrency: 1,
  // temperature: 0.5,
});

const parser = new StringOutputParser({});

const chain = RetrievalQAChain.fromLLM(model, vectorRetriever);

const res = await chain.invoke({
  query:
    // "What sort of rental revenue can i expect from renting a 1000 square foot laneway site in a lower value area, can you provide some samples based on general assumptions",
    // "How long does it take to get a building permit",
    // "Are laneway homes expensive?",
    "Are laneway homes a good investment?",
    // "What is the general opinion about modular laneway homes?",
    // "How long would it take me to get a building permit in Burnaby, BC?",
});

console.log(res.text);
