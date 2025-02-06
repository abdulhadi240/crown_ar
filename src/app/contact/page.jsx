"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import Design from "../homepage1/components/Design"

export default function ContactPage() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    po_box: "",
    message: "",
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formattedData = new FormData()
    formattedData.append("name", formData.name)
    formattedData.append("email", formData.email)
    formattedData.append("number", formData.number)
    formattedData.append("po_box", formData.po_box)
    formattedData.append("message", formData.message)

    try {
      const response = await fetch("https://backendbatd.clinstitute.co.uk/api/contact-us", {
        method: "POST",
        headers: {
          "Accept-Language": "en",
          "Accept": "application/json",
        },
        body: formattedData,
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Success",
          description: "Your message has been sent successfully!",
          variant: "success",
        })
        setFormData({
          name: "",
          email: "",
          number: "",
          po_box: "",
          message: "",
        })
      } else {
        throw new Error(data.message || "Something went wrong. Please try again.")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <><Design secondary bg></Design><div className="min-h-screen bg-white">
      <div className="bg-[#0A1828] py-8">
        <h1 className="text-center text-3xl font-bold text-white">Contact Us</h1>
      </div>
      <div className="max-w-3xl mx-auto text-center px-4 py-8 text-base">
        <p className="text-gray-600">
          At the British Academy, we're dedicated to supporting you at every step. If you have questions about our
          courses or services, or if you need additional information, simply complete the section below with a brief
          description of your needs, and we'll respond promptly.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <Card className="p-6 md:p-8 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Get in <span className="text-secondary">Touch</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required />
                </div>
                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.number}
                    onChange={(e) => setFormData({ ...formData, number: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.po_box}
                    onChange={(e) => setFormData({ ...formData, po_box: e.target.value })}
                    required />
                </div>
                <div>
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="min-h-[120px]"
                    required />
                </div>
                <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-white" disabled={loading}>
                  {loading ? "Sending..." : "Send"}
                </Button>
              </form>
              <div className="mt-8 flex gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  <span>+1234567890</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  <span>contact@example.com</span>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] md:h-full min-h-[400px] rounded-lg overflow-hidden bg-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?..."
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0" />
            </div>
          </div>
        </Card>
      </div>
    </div></>
  )
}
