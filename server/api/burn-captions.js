import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export default defineEventHandler(async (req, res) => {
  console.log("burn captions!");
  const body = await readBody(req);
  const json = await JSON.parse(body);
  console.log("url", json.videoUrl, json.transcription);

  const jsonString = JSON.stringify(json.transcription);

  console.log("jsonString", jsonString);

  if (req.method === "POST") {
    try {
      const output = await replicate.run(
        "jackbader/caption-video-burner:31308a09155ea5632c6e2d6a0be70e0c7c88f2a9859dd9977f928513a3b1e900",
        {
          input: {
            video_file_input: json.videoUrl,
            transcript_json_string: jsonString,
            font: "Poppins/Poppins-ExtraBold.ttf",
            color: "white",
            kerning: -5,
            opacity: 0,
            MaxChars: 10,
            fontsize: 4,
            stroke_color: "black",
            stroke_width: 2.6,
            subs_position: "bottom75",
            highlight_color: "yellow",
          },
        }
      );
      console.log("output", output);
      return {
        message: "Burnt captions successfully",
        videoUrl: output[0],
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
