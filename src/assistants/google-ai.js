import { GoogleGenerativeAI } from "@google/generative-ai";

const googleai = new GoogleGenerativeAI(import.meta.env.VITE_GOOGLE_AI_API_KEY);

export class Assistant {
    #chat;
    constructor(model = "gemini-2.0-flash") {

        const model_ = googleai.getGenerativeModel({ model });
        this.#chat = model_.startChat({ history: [] });


    }

    async chat(content) {
        try {
            const result = await this.#chat.sendMessage(content);
            return result.response.text()
        } catch (error) {
            throw error
        }

    }
}