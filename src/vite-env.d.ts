/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_MOCKS: string;
  readonly VITE_API_URL: string;
  readonly VITE_TELEGRAM_BOT_NAME: string;
  readonly VITE_BASE_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
