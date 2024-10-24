// types/gst.ts
export interface GSTVerificationRequest {
  gstin: string
}

export interface GSTVerificationResponse {
  success: boolean
  message: string
  data?: {
    gstNumber: string
    status: string
    businessType: string
    businessName: string
    legalName: string
    address: {
      building: string
      city: string
      pincode: string
      state: string
    }
    dateOfRegistration: string
  }
}

export interface GSTErrorResponse {
  message: string
  error?: {
    code: string
    detail: string
  }
}