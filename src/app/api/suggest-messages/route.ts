// import { openai } from "@ai-sdk/openai";
// import { StreamingTextResponse, streamText } from "ai";

// // Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

// export async function POST(req: Request) {
//   const { messages } = await req.json();

//   const result = await streamText({
//     model: openai("gpt-4-turbo"),
//     messages,
//   });

//   return result.toAIStreamResponse();
// }
import { OpenAIStream, StreamingTextResponse, streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Allow streaming responses up to 30 seconds
// export const maxDuration = 30;

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ende and engaging questions formatted as a single string. Each question should br separate by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What's a hobby you've recently started?||If you could have dinner with any historical figure, who would it be?||What's a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      max_tokens: 400,
      stream: true,
      prompt,
    });

    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    if (error instanceof OpenAI.APIError) {
      const { name, status, headers, message } = error;

      return NextResponse.json(
        {
          name,
          status,
          headers,
          message,
        },
        {
          status,
        }
      );
    } else {
      console.error("An unexpected error occurred", error);
      throw error;
    }
  }
}
