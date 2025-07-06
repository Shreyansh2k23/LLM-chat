// lib/gemini.ts

import { GoogleGenerativeAI } from "@google/generative-ai"

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)


export async function generateGeminiResponse(prompt: string) {
  const model = genAI.getGenerativeModel({ model: "models/gemini-pro" })

  const result = await model.generateContent(prompt)
  const response = await result.response
  return response.text()
}


// // lib/gemini.ts
// import { GoogleGenerativeAI } from "@google/generative-ai"

// const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY

// if (!apiKey) {
//   throw new Error("Missing NEXT_PUBLIC_GEMINI_API_KEY in environment variables.")
// }

// const genAI = new GoogleGenerativeAI(apiKey)

// export async function generateGeminiResponse(prompt: string): Promise<string> {
//   try {
//     const model = genAI.getGenerativeModel({ model: "models/chat-bison-001" })
//     const result = await model.generateContent(prompt)
//     const response = result.response
//     const text = response.text()

//     return text
//   } catch (error) {
//     console.error("Gemini API Error:", error)
//     return "Sorry, something went wrong while generating a response."
//   }
// }
