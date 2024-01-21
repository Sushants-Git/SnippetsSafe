import { pipeline, env } from "@xenova/transformers";

env.allowLocalModels = false;
env.backends.onnx.wasm.numThreads = 1;

class PipelineSingleton {
  static task = "feature-extraction";
  static model = "Supabase/gte-small";
  static instance = null;

  static async getInstance(progress_callback = null) {
    if (this.instance === null) {
      this.instance = pipeline(this.task, this.model, { progress_callback });
    }

    return this.instance;
  }
}

// Listen for messages from the main thread
self.addEventListener("message", async ({ data }) => {
  const { sentence1, sentence2, obj } = data;

  let model = await PipelineSingleton.getInstance();

  let embedding1 = await model(sentence1, {
    pooling: "mean",
    normalize: true,
  });

  let embedding2 = await model(sentence2, {
    pooling: "mean",
    normalize: true,
  });

  embedding1 = Array.from(embedding1.data);
  embedding2 = Array.from(embedding2.data);

  const similarity = calculateCosineSimilarity(embedding1, embedding2);

  // console.log(similarity);

  let result = similarity;

  function calculateCosineSimilarity(embedding1, embedding2) {
    // Calculate dot product
    let dotProduct = 0;
    for (let i = 0; i < embedding1.length; i++) {
      dotProduct += embedding1[i] * embedding2[i];
    }

    // Calculate magnitudes
    let magnitude1 = 0;
    let magnitude2 = 0;
    for (let i = 0; i < embedding1.length; i++) {
      magnitude1 += embedding1[i] * embedding1[i];
      magnitude2 += embedding2[i] * embedding2[i];
    }
    magnitude1 = Math.sqrt(magnitude1);
    magnitude2 = Math.sqrt(magnitude2);

    // Calculate cosine similarity
    const similarity = dotProduct / (magnitude1 * magnitude2);
    return similarity;
  }

  // Send the output back to the main thread
  self.postMessage({
    status: "complete",
    output: { alike: result, obj: obj },
  });

  //   console.log(embedding1);
});
