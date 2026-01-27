import { GoogleGenerativeAI } from "@google/generative-ai";

// Standard generation for Lyrics
export const generateLyrics = async (prompt: string, genre: string) => {
  const res = await fetch("/api/gemini", {
    method: "POST",
    body: JSON.stringify({ 
      prompt: `Write lyrics for a ${genre} song about: ${prompt}`,
      mode: "composer" 
    }),
  });
  const data = await res.json();
  return data.text;
};

// Gemini 1.5 Flash doesn't "generate" images directly, 
// it generates the *prompt* for an image generator (like Imagen or DALL-E).
export const generateAlbumArt = async (description: string) => {
  // For this experiment, we will simulate a high-quality prompt generation
  const res = await fetch("/api/gemini", {
    method: "POST",
    body: JSON.stringify({ 
      prompt: `Act as a professional art director. Create a highly detailed DALL-E prompt for album art based on: ${description}`,
      mode: "code" 
    }),
  });
  const data = await res.json();
  // In a full production app, you'd send data.text to an Image API here.
  return "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=1000"; // Placeholder
};

// Audio Helpers for JamBuddy
export const decodeBase64 = (base64: string) => Uint8Array.from(atob(base64), c => c.charCodeAt(0));
export const encodeBase64 = (array: Uint8Array) => btoa(String.fromCharCode(...array));