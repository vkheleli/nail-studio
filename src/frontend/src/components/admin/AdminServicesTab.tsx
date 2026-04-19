import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useAddServiceType,
  useDeleteServiceType,
  useServiceTypes,
  useUpdateServiceType,
} from "../../hooks/useServiceTypes";
import type { ServiceType } from "../../types";

interface ServiceFormData {
  name: string;
  description: string;
  slug: string;
}

const emptyForm: ServiceFormData = { name: "", description: "", slug: "" };

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function AdminServicesTab() {
  const { data: services, isLoading } = useServiceTypes();
  const addService = useAddServiceType();
  const updateService = useUpdateServiceType();
  const deleteService = useDeleteServiceType();

  const [form, setForm] = useState<ServiceFormData>(emptyForm);
  const [editingId, setEditingId] = useState<bigint | null>(null);
  const [editForm, setEditForm] = useState<ServiceFormData>(emptyForm);

  const handleNameChange = (name: string) => {
    setForm((prev) => ({ ...prev, name, slug: slugify(name) }));
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    try {
      await addService.mutateAsync(form);
      setForm(emptyForm);
      toast.success("Service added successfully");
    } catch {
      toast.error("Failed to add service");
    }
  };

  const startEdit = (service: ServiceType) => {
    setEditingId(service.id);
    setEditForm({
      name: service.name,
      description: service.description,
      slug: service.slug,
    });
  };

  const handleUpdate = async (id: bigint) => {
    try {
      await updateService.mutateAsync({ id, ...editForm });
      setEditingId(null);
      toast.success("Service updated");
    } catch {
      toast.error("Failed to update service");
    }
  };

  const handleDelete = async (id: bigint) => {
    try {
      await deleteService.mutateAsync(id);
      toast.success("Service deleted");
    } catch {
      toast.error("Failed to delete service");
    }
  };

  return (
    <div className="space-y-8">
      {/* Add New Service */}
      <div className="bg-card border border-border rounded-2xl p-6 shadow-subtle">
        <h2 className="font-display text-xl text-foreground mb-5">
          Add New Service
        </h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="svc-name">Service Name</Label>
              <Input
                id="svc-name"
                data-ocid="service-name-input"
                placeholder="e.g. Gel Nails"
                value={form.name}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="svc-slug">Slug</Label>
              <Input
                id="svc-slug"
                data-ocid="service-slug-input"
                placeholder="e.g. gel-nails"
                value={form.slug}
                onChange={(e) =>
                  setForm((p) => ({ ...p, slug: e.target.value }))
                }
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="svc-desc">Description</Label>
            <Textarea
              id="svc-desc"
              data-ocid="service-desc-input"
              placeholder="Describe this service..."
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm((p) => ({ ...p, description: e.target.value }))
              }
            />
          </div>
          <Button
            data-ocid="add-service-btn"
            type="submit"
            disabled={!form.name.trim() || addService.isPending}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            {addService.isPending ? "Adding..." : "Add Service"}
          </Button>
        </form>
      </div>

      {/* Services List */}
      <div className="space-y-3">
        <h2 className="font-display text-xl text-foreground">All Services</h2>
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-20 w-full rounded-xl" />
            ))}
          </div>
        ) : !services?.length ? (
          <div
            data-ocid="services-empty"
            className="bg-muted/40 border border-dashed border-border rounded-xl p-10 text-center"
          >
            <p className="text-muted-foreground font-body">
              No services yet. Add your first service above.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {services.map((service) =>
              editingId === service.id ? (
                <div
                  key={service.id.toString()}
                  className="bg-card border border-primary/30 rounded-xl p-5 space-y-3"
                >
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input
                      data-ocid="service-edit-name"
                      value={editForm.name}
                      onChange={(e) =>
                        setEditForm((p) => ({ ...p, name: e.target.value }))
                      }
                      placeholder="Name"
                    />
                    <Input
                      data-ocid="service-edit-slug"
                      value={editForm.slug}
                      onChange={(e) =>
                        setEditForm((p) => ({ ...p, slug: e.target.value }))
                      }
                      placeholder="Slug"
                    />
                  </div>
                  <Textarea
                    data-ocid="service-edit-desc"
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm((p) => ({
                        ...p,
                        description: e.target.value,
                      }))
                    }
                    rows={2}
                    placeholder="Description"
                  />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleUpdate(service.id)}
                      disabled={updateService.isPending}
                      className="gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" /> Save
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingId(null)}
                    >
                      <X className="w-3.5 h-3.5" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  key={service.id.toString()}
                  data-ocid={`service-row-${service.id}`}
                  className="bg-card border border-border rounded-xl p-5 flex items-start justify-between gap-4 group transition-smooth hover:border-primary/30"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-display text-base text-foreground">
                        {service.name}
                      </span>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {service.slug}
                      </Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <Button
                      data-ocid={`service-edit-btn-${service.id}`}
                      size="icon"
                      variant="ghost"
                      onClick={() => startEdit(service)}
                      className="h-8 w-8 opacity-60 group-hover:opacity-100"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                      data-ocid={`service-delete-btn-${service.id}`}
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(service.id)}
                      disabled={deleteService.isPending}
                      className="h-8 w-8 text-destructive opacity-60 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
}
