import mailgun from "mailgun-js";

export default defineEventHandler(async (req, res) => {
  console.log("send mail  API!!");
  const body = await readBody(req);

  if (req.method === "POST") {
    //   try {
    //     const mg = mailgun({
    //       apiKey: process.env.MAILGUN_API_KEY,
    //       domain: process.env.MAILGUN_DOMAIN,
    //     });
    //     const data = {
    //       from: body.email, // Use your Mailgun email
    //       to: "kellbader@gmail.com", // Your personal email where you want to receive messages
    //       subject: `KellyBaderArt.com - ${body.name}`,
    //       text: body.message,
    //     };
    //     mg.messages().send(data, function (error, body) {
    //       if (error) {
    //         throw createError({
    //           statusCode: 500,
    //           statusMessage: "Error sending email",
    //         });
    //       }
    //       return { message: "Email sent successfully!" };
    //     });
    //   } catch (error) {
    //     throw createError({
    //       statusCode: 500,
    //       statusMessage: error.message,
    //     });
    //   }
    // } else {
    //   throw createError({
    //     statusCode: 405,
    //     statusMessage: "Method Not Allowed",
    //   });
  }
});
