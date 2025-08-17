// src/types.ts
export interface UploadRow {
  id: string;
  user_id: number | null;
  original_name: string;
  mime: string | null;
  size: number;
  disk: string;
  path: string;
  checksum: string | null;
  is_public: boolean;
  url: string | null;
  created_at: string;
  updated_at: string;
}

export interface UploadResponse {
    success: boolean;
    message: string;
    data: UploadRow;
}