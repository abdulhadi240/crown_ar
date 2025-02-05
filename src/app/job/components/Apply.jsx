'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const Apply = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentPosition: "",
    expectedSalary: "",
    resumeFile: null,
    coverLetter: "",
  })

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }))
  }

  const isStepValid = () => {
    switch (step) {
      case 1:
        return formData.name && formData.email && formData.phone
      case 2:
        return formData.currentPosition && formData.expectedSalary && formData.resumeFile
      case 3:
        return formData.coverLetter
      default:
        return false
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)

    // Prepare FormData for API submission
    const formDataToSend = new FormData()
    for (const key in formData) {
      formDataToSend.append(key, formData[key])
    }
    console.log("FormData to send:", formDataToSend)

    // Reset form and close dialog
    setIsOpen(false)
    setStep(1)
    setFormData({
      name: "",
      email: "",
      phone: "",
      currentPosition: "",
      expectedSalary: "",
      resumeFile: null,
      coverLetter: "",
    })
  }

  const nextStep = () => {
    if (isStepValid()) {
      setStep(step + 1)
    }
  }

  const prevStep = () => setStep(step - 1)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full bg-amber-200 hover:bg-amber-300 text-gray-800 my-2">
          Apply Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Job Application</DialogTitle>
          <DialogDescription>Fill out the form below to apply for the position.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
              </div>
              <Button type="button" onClick={nextStep} disabled={!isStepValid()} className="w-full text-white bg-primary hover:bg-primary-dark">
                Next
              </Button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="currentPosition">Current Position</Label>
                <Input id="currentPosition" name="currentPosition" value={formData.currentPosition} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="expectedSalary">Expected Salary</Label>
                <Input id="expectedSalary" name="expectedSalary" type="text" value={formData.expectedSalary} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="resumeFile">Resume (PDF, DOC)</Label>
                <Input id="resumeFile" name="resumeFile" type="file" accept=".pdf,.doc,.docx" onChange={handleInputChange} required />
              </div>
              <div className="flex justify-between">
                <Button type="button" onClick={prevStep} className="w-[48%] text-white bg-secondary hover:bg-secondary-dark">
                  Previous
                </Button>
                <Button type="button" onClick={nextStep} disabled={!isStepValid()} className="w-[48%] text-white bg-primary hover:bg-primary-dark">
                  Next
                </Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="coverLetter">Cover Letter</Label>
                <Textarea id="coverLetter" name="coverLetter" value={formData.coverLetter} onChange={handleInputChange} placeholder="Tell us why you're a great fit for this position..." required className="h-40" />
              </div>
              <div className="flex justify-between">
                <Button type="button" onClick={prevStep} className="w-[48%] text-white bg-secondary hover:bg-secondary-dark">
                  Previous
                </Button>
                <Button type="submit" disabled={!isStepValid()} className="w-[48%] text-white bg-green-500 hover:bg-green-600">
                  Submit Application
                </Button>
              </div>
            </div>
          )}
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default Apply
