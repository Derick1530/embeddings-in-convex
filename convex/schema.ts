import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  // Chunks are one part of a Source, broken up to generate embeddings.
  chunks: defineTable({
    // The Pinecone ID is the chunk's _id
    // raw text: ~1k bytes or less
    text: v.string(),
    sourceId: v.id("sources"),
    // Where in a larger document is this text.
    chunkIndex: v.number(),
    lines: v.object({
      from: v.number(),
      to: v.number(),
    }),
    // Approx: estimated based on the total batch size.
    tokens: v.optional(v.number()),
  }).searchIndex("text", { searchField: "text" }),

  // Sources are materials to search over / compare, made of chunks of text.
  sources: defineTable({
    name: v.string(),
    // Max 1k chunks (otherwise remove this and use an index on sourceId)
    chunkIds: v.array(v.id("chunks")),
    // Whether the embeddings have been saved to Pinecone.
    saved: v.boolean(),
    // stats
    totalTokens: v.optional(v.number()),
    embeddingMs: v.optional(v.number()),
  }),

  // Searches track a comparison between an input string and related chunks.
  searches: defineTable({
    // The Pinecone ID is the search's _id
    input: v.string(),
    relatedChunks: v.optional(
      v.array(
        v.object({
          id: v.id("chunks"),
          score: v.optional(v.number()),
        })
      )
    ),
    // stats
    count: v.number(),
    inputTokens: v.optional(v.number()),
    embeddingMs: v.optional(v.number()),
    pineconeMs: v.optional(v.number()),
    saveSearchMs: v.optional(v.number()),
  }).index("input", ["input"]),

  // Comparisons track a comparison between one chunk and other chunks.
  comparisons: defineTable({
    target: v.id("chunks"),
    relatedChunks: v.optional(
      v.array(
        v.object({
          id: v.id("chunks"),
          score: v.optional(v.number()),
        })
      )
    ),
    // stats
    count: v.number(),
    pineconeMs: v.optional(v.number()),
  }).index("target", ["target"]),
});
