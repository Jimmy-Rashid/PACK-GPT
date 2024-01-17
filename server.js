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

import { HNSWLib } from "@langchain/community/vectorstores/hnswlib";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { ChatOpenAI } from "@langchain/openai";
import { RetrievalQAChain } from "langchain/chains";
import { OpenAIEmbeddings } from "@langchain/openai";
import { EmbeddingsFilter } from "langchain/retrievers/document_compressors/embeddings_filter";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { DocumentCompressorPipeline } from "langchain/retrievers/document_compressors";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { ContextualCompressionRetriever } from "langchain/retrievers/contextual_compression";

const model = new ChatOpenAI({
  cache: true,
  maxTokens: 50,
  modelName: "gpt-3.5-turbo",
  maxConcurrency: 1,
  // temperature: 0.25,
  callbacks: [
    {
      handleLLMEnd(output) {
        console.log(JSON.stringify(output.llmOutput, null, 2));
      },
    },
  ],
});

const text = new PDFLoader("Burnaby Media/Burnaby Text.pdf", {
  parsedItemSeparator: "",
});

const docs = await text.load();

const embeddingsFilter = new EmbeddingsFilter({
  embeddings: new OpenAIEmbeddings(),
  similarityThreshold: 0.8,
  k: 3,
});
const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: 300,
  chunkOverlap: 0,
});

const baseCompressor = new DocumentCompressorPipeline({
  transformers: [textSplitter, embeddingsFilter],
});

const vectorStorage = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
const vectorRetriever = new ContextualCompressionRetriever({
  baseCompressor,
  baseRetriever: vectorStorage.asRetriever(),
});

const query = "How big can I construct a laneway home";

const chain = RetrievalQAChain.fromLLM(model, vectorRetriever);

const message = await chain.invoke({
  query: query + " Answer using atleast 30 words, but no more than 50 words.",
});

console.log(message);

// For checking retrieved documents

// const retrievedDocs = await vectorRetriever.getRelevantDocuments(query);
// console.log({ retrievedDocs });