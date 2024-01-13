import axios from "axios";

export default defineEventHandler(async (req, res) => {
  console.log("tiktok upload!");
  const body = await readBody(req);
  const json = await JSON.parse(body);
  console.log("url", json.url);

  if (req.method === "POST") {
    try {
      const response = await axios.post(
        "https://3sdhwcs22fmtzhcbnl2xvsfy3i0dwuek.lambda-url.us-east-1.on.aws/",
        {
          url: json.url,
        }
      );
      console.log("response from lambda", response.data);
      return response.data;
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
