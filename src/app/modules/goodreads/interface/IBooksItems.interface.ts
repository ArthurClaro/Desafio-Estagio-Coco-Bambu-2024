// Interface para o Volume de um Livro (VolumeInfo)
export interface VolumeInfo {
  title: string;
  subtitle?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  categories?: string[];
  imageLinks?: {
    smallThumbnail?: string;
    thumbnail?: string;
    small?: string;
    medium?: string;
    large?: string;
  };
  language?: string;
  infoLink?: string;
  previewLink?: string;
  canonicalVolumeLink?: string;
  maturityRating?: string;
}

// Interface para o acesso de informações de um livro (AccessInfo)
export interface AccessInfo {
  country: string;
  viewability: string;
  embeddable: boolean;
  publicDomain: boolean;
  textToSpeechPermission: string;
}

// Interface para as informações de venda (SaleInfo)
export interface SaleInfo {
  country: string;
  saleability: string;
  isEbook: boolean;
  listPrice?: {
    amount: number;
    currencyCode: string;
  };
  retailPrice?: {
    amount: number;
    currencyCode: string;
  };
}

// Interface para a Pesquisa de Livros (BookItem)
export interface BookItem {
  id: string;
  kind: string;
  etag: string;
  selfLink: string;
  volumeInfo: VolumeInfo;
  accessInfo: AccessInfo;
  saleInfo?: SaleInfo;
  randomRating?: number;
}

// Interface para a resposta da API de busca (ApiResponse)
export interface ApiResponse {
  kind: string;
  totalItems: number;
  items: BookItem[];
}

// Interface para o detalhe completo de um livro (BookDetail)
export interface BookDetail extends BookItem {
  favorite?: boolean;
  tags?: string[];
  notes?: string;
  range?: number;
}

// Interface para o armazenamento local de livros
export interface LocalStorageBook extends BookDetail {}
