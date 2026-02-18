export interface SiteConfigData {
  _id: string;
  isShowNavigation: boolean;
  isShowPagination: boolean;
  slideDuration: number;
  facebook: string;
  instagram: string;
  telegram: string;
  twitter: string;
  youtube: string;
  linkedIn: string;
  contactAddress: string;
  contactEmail: string;
  contactWhatsapp: number;
  contactNumber: number;
  createdBy: object;
  createdAt: string;
  updatedAt: string;
}

export interface SiteConfigResponse {
  error: boolean;
  status: boolean;
  statusCode: number;
  responseTimestamp: string;
  data: SiteConfigData;
}