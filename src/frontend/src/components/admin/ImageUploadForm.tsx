import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageIcon, UploadCloud, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../../backend";
import { useAddImage } from "../../hooks/useGallery";
import type { ServiceType } from "../../types";

interface ImageUploadFormProps {
  services: ServiceType[];
}

export function ImageUploadForm({ services }: ImageUploadFormProps) {
  const addImage = useAddImage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState("");
  const [serviceTypeId, setServiceTypeId] = useState<string>("");
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
    if (!title)
      setTitle(file.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "));
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !title.trim() || !serviceTypeId) return;

    setIsUploading(true);
    setUploadProgress(0);
    try {
      const bytes = new Uint8Array(await selectedFile.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadProgress(pct);
      });

      await addImage.mutateAsync({
        title: title.trim(),
        serviceTypeId: BigInt(serviceTypeId),
        image: blob,
      });

      toast.success("Image uploaded successfully");
      setTitle("");
      setServiceTypeId("");
      clearFile();
      setUploadProgress(0);
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const canSubmit =
    !!selectedFile && !!title.trim() && !!serviceTypeId && !isUploading;

  return (
    <div className="bg-card border border-border rounded-2xl p-6 shadow-subtle">
      <h2 className="font-display text-xl text-foreground mb-5">
        Upload Image
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* File Picker */}
        <div className="space-y-2">
          <Label>Photo</Label>
          {preview ? (
            <div className="relative inline-block">
              <img
                src={preview}
                alt="Preview"
                className="h-40 w-40 object-cover rounded-xl border border-border"
              />
              <button
                type="button"
                onClick={clearFile}
                aria-label="Remove photo"
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground
                  flex items-center justify-center shadow-subtle hover:opacity-90 transition-smooth"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              data-ocid="image-upload-zone"
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-2 border-dashed border-border rounded-xl p-8 text-center
                hover:border-primary/50 hover:bg-primary/5 transition-smooth cursor-pointer"
            >
              <UploadCloud className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-muted-foreground font-body text-sm">
                Click to select a photo
              </p>
              <p className="text-muted-foreground font-body text-xs mt-1">
                JPG, PNG, WEBP up to 10MB
              </p>
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            data-ocid="image-file-input"
            onChange={handleFileSelect}
          />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label htmlFor="img-title">
              <ImageIcon className="w-4 h-4 inline mr-1.5 text-muted-foreground" />
              Title
            </Label>
            <Input
              id="img-title"
              data-ocid="image-title-input"
              placeholder="e.g. Soft Pink Gel Set"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="img-service">Service Type</Label>
            <Select value={serviceTypeId} onValueChange={setServiceTypeId}>
              <SelectTrigger
                id="img-service"
                data-ocid="image-service-select"
                className="w-full"
              >
                <SelectValue placeholder="Select a service..." />
              </SelectTrigger>
              <SelectContent>
                {services.map((s) => (
                  <SelectItem key={s.id.toString()} value={s.id.toString()}>
                    {s.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {isUploading && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-body text-muted-foreground">
              <span>Uploading...</span>
              <span>{Math.round(uploadProgress)}%</span>
            </div>
            <Progress value={uploadProgress} className="h-2" />
          </div>
        )}

        <Button
          data-ocid="image-upload-btn"
          type="submit"
          disabled={!canSubmit}
          className="gap-2"
        >
          <UploadCloud className="w-4 h-4" />
          {isUploading ? "Uploading..." : "Upload Image"}
        </Button>
      </form>
    </div>
  );
}
