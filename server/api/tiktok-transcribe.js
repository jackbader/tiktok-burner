import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default defineEventHandler(async (req, res) => {
  console.log("tiktok transcribe!");
  const body = await readBody(req);
  const json = await JSON.parse(body);
  console.log("url", json.url);

  if (req.method === "POST") {
    try {
      const output = await replicate.run(
        "jackbader/whisper-timestamped:5ad0dee2baae157b9c93f8121d6930d82573bb83a5844583d2df5e453932568d",
        {
          input: {
            audio: json.url,
          },
        }
      );
      console.log("output", output);
      return {
        message: "Transcribed successfully",
        transcription: output,
      };
    } catch (e) {
      console.log("e", e);
      throw createError({
        statusCode: 500,
        statusMessage: "Something went wrong",
      });
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: "Method Not Allowed",
  });
});
