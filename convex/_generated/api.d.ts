/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * Generated by convex@0.17.0.
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type { ApiFromModules } from "convex/server";
import type * as comparisons from "../comparisons";
import type * as lib_embeddings from "../lib/embeddings";
import type * as lib_migrations from "../lib/migrations";
import type * as lib_pinecone from "../lib/pinecone";
import type * as lib_utils from "../lib/utils";
import type * as searches from "../searches";
import type * as sources from "../sources";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: ApiFromModules<{
  comparisons: typeof comparisons;
  "lib/embeddings": typeof lib_embeddings;
  "lib/migrations": typeof lib_migrations;
  "lib/pinecone": typeof lib_pinecone;
  "lib/utils": typeof lib_utils;
  searches: typeof searches;
  sources: typeof sources;
}>;
