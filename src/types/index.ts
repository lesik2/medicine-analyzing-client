export interface ServerResponseError {
  message: string;
  error: string;
  statusCode: number;
}

export interface ApiSendConfig {
  method: 'post' | 'patch';
  url: string;
  invalidateKey?: string[];
}

export interface ApiGetConfig {
  url: string;
  keys: string[];
}
