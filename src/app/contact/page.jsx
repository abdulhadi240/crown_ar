"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Phone, Mail } from "lucide-react"
import Design from "../homepage1/components/Design"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Handle form submission
    console.log(formData)
  }

  return (
    <><Design secondary bg></Design><div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-[#0A1828] py-8">
        <h1 className="text-center text-3xl font-bold text-white">Contact Us</h1>
      </div>

      {/* Description Section */}
      <div className="max-w-3xl mx-auto text-center px-4 py-8 text-base">
        <p className="text-gray-600">
          At the British Academy, we're dedicated to supporting you at every step. If you have questions about our
          courses or services, or if you need additional information, simply complete the section below with a brief
          description of your needs, and we'll respond promptly.
        </p>
      </div>

      {/* Contact Form and Map Section */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <Card className="p-6 md:p-8 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Form Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-6">
                Get in <span className="text-secondary">Touch</span>
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
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
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
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
                <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90  text-white">
                  Send
                </Button>
              </form>

              {/* Contact Information */}
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

            {/* Map Section */}
            <div className="relative h-[400px] md:h-full min-h-[400px] rounded-lg overflow-hidden bg-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.2889612073266!2d-0.1276534!3d51.5073509!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDMwJzI2LjQiTiAwwrAwNyc0MC43Ilc!5e0!3m2!1sen!2suk!4v1635959573000!5m2!1sen!2suk"
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

