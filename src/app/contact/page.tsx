"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE_CONFIG } from "@/lib/constants";

export default function ContactPage() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const formData = new FormData(e.currentTarget);
    const payload = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-16">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Send me a message below, or email me directly at{" "}
        <a href={`mailto:${SITE_CONFIG.email}`} className="underline">
          {SITE_CONFIG.email}
        </a>
        .
      </p>

      <Card className="mt-8 max-w-md">
        <CardHeader>
          <CardTitle className="text-base">Send a message</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" type="text" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" rows={5} required />
            </div>
            <Button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending..." : "Send Message"}
            </Button>

            {status === "sent" && (
              <p className="text-sm text-green-600">
                Thanks! Your message has been sent.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-destructive">
                Something went wrong. Please email me directly instead.
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </section>
  );
}
