import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const TARGET_LOCALES = ['fr', 'es', 'it', 'de', 'hy', 'ru', 'ar'];
const EN_JSON_PATH = path.join(process.cwd(), 'dictionaries', 'en.json');

async function translateDictionary() {
  const enContent = fs.readFileSync(EN_JSON_PATH, "utf-8");

  for (const locale of TARGET_LOCALES) {
    console.log(`🌐 Translating to: ${locale}...`);
    
    const prompt = `
      You are a professional translator. Translate the following JSON object into the language code: ${locale}.
      - Keep the JSON keys exactly the same.
      - Translate only the values.
      - "Arman Ayva" is a name, do not translate it unless the script requires it (like Armenian or Arabic).
      - Maintain the tone of a professional musician/composer portfolio.
      - Return ONLY the raw JSON.
      
      JSON to translate:
      ${enContent}
    `;

    try {
      const result = await model.generateContent(prompt);
      const translatedText = result.response.text().replace(/```json|```/g, "").trim();
      
      const outputPath = path.join(process.cwd(), 'dictionaries', `${locale}.json`);
      fs.writeFileSync(outputPath, translatedText);
      console.log(`✅ Created ${locale}.json`);
    } catch (error) {
      console.error(`❌ Error translating ${locale}:`, error);
    }
  }
}

translateDictionary();