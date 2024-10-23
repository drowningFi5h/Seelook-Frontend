// components/GstInput.tsx
"use client"

import React, { useState } from "react"

type GstInputProps = {
  onValidGst: (isValid: boolean) => void
}

const GstInput: React.FC<GstInputProps> = ({ onValidGst }) => {
  const [gstNumber, setGstNumber] = useState("")

  const handleGstInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setGstNumber(value)

    // GST number validation logic (e.g., length check or regex)
    const isValidGst = value.length === 15 // Example: GST number should be 15 characters long
    onValidGst(isValidGst)
  }

  return (
    <div className="space-y-4">
      <label
        htmlFor="gst-number"
        className="block text-sm font-medium text-gray-700"
      >
        Enter your GST number (required for wholesale orders):
      </label>
      <input
        id="gst-number"
        type="text"
        value={gstNumber}
        onChange={handleGstInput}
        className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        placeholder="Enter your GST number"
      />
    </div>
  )
}

export default GstInput
