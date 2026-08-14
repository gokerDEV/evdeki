"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import siteData from "@/data/site.json";

export default function Web3FormsContact({
  dict,
}: {
  dict: {
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    submittingButton: string;
    successMessage: string;
    errorMessage: string;
  };
}) {
  const [result, setResult] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResult(dict.submittingButton);

    const formData = new FormData(event.currentTarget);
    formData.append("access_key", siteData.shared.web3formsAccessKey);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        setResult(dict.successMessage);
        (event.target as HTMLFormElement).reset();
      } else {
        setResult(data.message || dict.errorMessage);
      }
    } catch (error) {
      setResult(`${dict.errorMessage} ${String(error)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">{dict.nameLabel}</Label>
          <Input
            id="name"
            name="name"
            required
            placeholder={dict.namePlaceholder}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">{dict.emailLabel}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder={dict.emailPlaceholder}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">{dict.phoneLabel}</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder={dict.phonePlaceholder}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">{dict.messageLabel}</Label>
        <Textarea
          id="message"
          name="message"
          required
          placeholder={dict.messagePlaceholder}
          rows={5}
        />
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
        <p className="text-sm font-medium text-muted-foreground">{result}</p>
        <Button
          size="lg"
          className="w-full sm:w-auto self-end"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? dict.submittingButton : dict.submitButton}
        </Button>
      </div>
    </form>
  );
}
