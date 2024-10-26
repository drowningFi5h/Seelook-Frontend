"use client"
import React, { useState } from 'react'
import axios from 'axios'
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
import { Button, Label, Input } from '@medusajs/ui'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

// Types for GST Response
interface GSTAddress {
  building: string
  city: string
  state: string
  pincode: string
}

interface GSTVerificationResponse {
  success: boolean
  data: {
    businessName: string
    status: string
    dateOfRegistration: string
    address: GSTAddress
  }
}

interface GSTErrorResponse {
  success: boolean
  message: string
}

const GstVerificationForm = () => {
  const [gstin, setGstin] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [verificationData, setVerificationData] = useState<GSTVerificationResponse['data']>()
  const [error, setError] = useState('')

  const handleGstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGstin(e.target.value.toUpperCase())
    if (status !== 'idle') {
      setStatus('idle')
      setVerificationData(undefined)
      setError('')
    }
  }

  const handleGstSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus('idle')
    setError('')
    setVerificationData(undefined)

    try {
      const response = await axios.post<GSTVerificationResponse>('/admin/gst/verify', { gstin })
      setStatus('success')
      setVerificationData(response.data.data)
    } catch (error) {
      setStatus('error')
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
          'An error occurred while verifying the GST number.'
        )
      } else {
        setError('An unexpected error occurred.')
      }
    } finally {
      setLoading(false)
    }
  }


  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>GST Verification</CardTitle>
        <CardDescription>
          Enter your GSTIN to verify its validity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleGstSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="gstin">GST Number (GSTIN)</Label>
            <Input
              type="text"
              id="gstin"
              placeholder="29ABCDE1234F1Z5"
              value={gstin}
              onChange={handleGstChange}
              className="uppercase"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? 'Verifying...' : 'Verify GST'}
          </Button>
        </form>

        {status === 'success' && verificationData && (
          <Alert className="mt-4">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Verification Successful</AlertTitle>
            <AlertDescription className="mt-2">
              <div className="space-y-2">
                <p><strong>Business Name:</strong> {verificationData.businessName}</p>
                <p><strong>Status:</strong> {verificationData.status}</p>
                <p><strong>Registration Date:</strong> {new Date(verificationData.dateOfRegistration).toLocaleDateString()}</p>
                <p><strong>Address:</strong> {`${verificationData.address.building}, ${verificationData.address.city}, ${verificationData.address.state} - ${verificationData.address.pincode}`}</p>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {status === 'error' && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

export default GstVerificationForm