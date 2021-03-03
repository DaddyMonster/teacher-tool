declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // SERVER ENV
      NODE_ENV: "development" | "production";
      PORT?: string;
      CORS_ORIGIN1: string; // CORS_ORIGIN2 : string and so on

      GRAPHQL_PATH: string;

      // MONGO DB
      MONGO_URI: string;

      // POSTGRES
      PG_DATABASE: string;
      PG_HOST: string;
      PG_USERNAME: string;
      PG_PASSWORD: string;
      PG_PORT: number;

      // APIS
      SPEECH_ACE_URL_BASE: string;
      SPEECH_ACE_KEY: string;
      UNSPLASH_KEY: string;
      UNSPLASH_SECRET: string;
      PIXEL_KEY: string;
      PIXA_KEY: string;
      BING_KEY: string;
    }
  }
}

export {};
