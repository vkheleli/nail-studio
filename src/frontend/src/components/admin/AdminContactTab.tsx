import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Clock,
  Link as LinkIcon,
  Mail,
  MapPin,
  Phone,
  Save,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useContactInfo, useSetContactInfo } from "../../hooks/useContactInfo";
import type { ContactInfo } from "../../types";

const defaultInfo: ContactInfo = {
  phone: "",
  email: "",
  address: "",
  hours: "",
  bookingUrl: "",
};

export function AdminContactTab() {
  const { data: contactInfo, isLoading } = useContactInfo();
  const setContactInfo = useSetContactInfo();
  const [form, setForm] = useState<ContactInfo>(defaultInfo);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (contactInfo) {
      setForm(contactInfo);
      setIsDirty(false);
    }
  }, [contactInfo]);

  const handleChange = (field: keyof ContactInfo, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setIsDirty(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await setContactInfo.mutateAsync(form);
      setIsDirty(false);
      toast.success("Contact information saved");
    } catch {
      toast.error("Failed to save contact information");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 max-w-2xl">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-12 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  const fields: {
    key: keyof ContactInfo;
    label: string;
    icon: React.ReactNode;
    type: string;
    placeholder: string;
  }[] = [
    {
      key: "phone",
      label: "Phone Number",
      icon: <Phone className="w-4 h-4" />,
      type: "tel",
      placeholder: "+1 (555) 234-5678",
    },
    {
      key: "email",
      label: "Email Address",
      icon: <Mail className="w-4 h-4" />,
      type: "email",
      placeholder: "hello@auroranails.com",
    },
    {
      key: "address",
      label: "Address",
      icon: <MapPin className="w-4 h-4" />,
      type: "text",
      placeholder: "2255 Blossom Avenue, Suite 12, Los Angeles, CA",
    },
    {
      key: "hours",
      label: "Business Hours",
      icon: <Clock className="w-4 h-4" />,
      type: "text",
      placeholder: "Tue–Sat: 9am–7pm · Sun: 10am–5pm",
    },
    {
      key: "bookingUrl",
      label: "Booking URL",
      icon: <LinkIcon className="w-4 h-4" />,
      type: "url",
      placeholder: "https://auroranails.com/book",
    },
  ];

  return (
    <div className="max-w-2xl">
      <div className="bg-card border border-border rounded-2xl p-6 shadow-subtle">
        <h2 className="font-display text-xl text-foreground mb-6">
          Contact Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          {fields.map(({ key, label, icon, type, placeholder }) => (
            <div key={key} className="space-y-1.5">
              <Label
                htmlFor={`contact-${key}`}
                className="flex items-center gap-2"
              >
                <span className="text-muted-foreground">{icon}</span>
                {label}
              </Label>
              <Input
                id={`contact-${key}`}
                data-ocid={`contact-${key}-input`}
                type={type}
                placeholder={placeholder}
                value={form[key]}
                onChange={(e) => handleChange(key, e.target.value)}
              />
            </div>
          ))}

          <div className="pt-2">
            <Button
              data-ocid="contact-save-btn"
              type="submit"
              disabled={!isDirty || setContactInfo.isPending}
              className="gap-2"
            >
              <Save className="w-4 h-4" />
              {setContactInfo.isPending ? "Saving..." : "Save Changes"}
            </Button>
            {!isDirty && !setContactInfo.isPending && (
              <p className="text-muted-foreground text-xs mt-2 font-body">
                All changes are saved.
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
