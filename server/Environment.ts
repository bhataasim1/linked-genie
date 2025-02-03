import 'dotenv/config';

class Environment {
  public static getApiKey(): string {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not defined in the environment variables');
    }
    return apiKey;
  }

  public static getPort(): number | string {
    return process.env.PORT || 3000;
  }
}

export default Environment;
