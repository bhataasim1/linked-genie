import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import cors from 'cors';
import { PROPMT } from './constants';
import Environment from './Environment';

class LinkedGenieServer {
  private app: express.Application;
  private apiKey: string;
  private genAI: GoogleGenerativeAI;
  private model: any;
  private generationConfig: object;

  constructor() {
    this.app = express();
    this.apiKey = Environment.getApiKey();
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: PROPMT,
    });
    this.generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware() {
    this.app.use(express.json());
    this.app.use(cors());
  }

  private configureRoutes() {
    // this.app.post('/api/generate-comments', this.handleGenerateComments.bind(this));
    this.app.post('/api/generate-comments', (req: express.Request, res: express.Response) => {
      this.handleGenerateComments(req, res);
    });

    this.app.get('/', (req: express.Request, res: express.Response) => {
      res.send('LinkedGenie API');
    });
  }

  private async generateComment(postData: string) {
    const chatSession = this.model.startChat({
      generationConfig: this.generationConfig,
      history: [],
    });

    const result = await chatSession.sendMessage(postData);
    const response = result.response.text();
    const cleanResponse = response.replace(/```.*?\n|\n```/g, '').trim();
    const comments = JSON.parse(cleanResponse);
    return comments;
  }

  private async handleGenerateComments(req: express.Request, res: express.Response) {
    try {
      const { postData } = req.body;

      if (!postData) {
        return res.status(400).json({ error: 'Post data is required' });
      }

      const comments = await this.generateComment(postData);
      res.json({ comments });
    } catch (error) {
      console.error('Error generating comments:', error);
      res.status(500).json({ error: 'Failed to generate comments' });
    }
  }

  public start() {
    const PORT = Environment.getPort();
    this.app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
}

const server = new LinkedGenieServer();
server.start();