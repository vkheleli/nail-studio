import type { ServiceType, PortfolioImage, ContactMessage, ContactInfo } from "../backend";
import { ExternalBlob, UserRole } from "../backend";

const sampleServices: ServiceType[] = [
  { id: BigInt(1), name: "Gel Nails", slug: "gel-nails", description: "Long-lasting gel polish that cures under UV light. Keeps nails shiny and chip-free for up to 3 weeks." },
  { id: BigInt(2), name: "Acrylic Nails", slug: "acrylic-nails", description: "Durable acrylic extensions sculpted to any length and shape. Perfect for nail art and added strength." },
  { id: BigInt(3), name: "Nail Art", slug: "nail-art", description: "Custom hand-painted designs, gems, and foils. From minimalist to elaborate — every nail tells a story." },
  { id: BigInt(4), name: "Pedicures", slug: "pedicures", description: "Relaxing foot soak, exfoliation, and polish. Leave with soft, beautiful feet and perfectly painted toes." },
  { id: BigInt(5), name: "Gel-X", slug: "gel-x", description: "Soft gel extensions applied with nail forms for a natural look and feel. No monomer, no harsh chemicals." },
];

const placeholderImage = ExternalBlob.fromURL("https://placehold.co/600x400/f0d9d9/c084a0?text=Nail+Art");

const sampleGallery: PortfolioImage[] = [
  { id: BigInt(1), title: "Rose Gold Gel Set", createdAt: BigInt(Date.now()), image: placeholderImage, serviceTypeId: BigInt(1) },
  { id: BigInt(2), title: "French Tip Acrylic", createdAt: BigInt(Date.now()), image: placeholderImage, serviceTypeId: BigInt(2) },
  { id: BigInt(3), title: "Floral Nail Art", createdAt: BigInt(Date.now()), image: placeholderImage, serviceTypeId: BigInt(3) },
  { id: BigInt(4), title: "Classic Pedicure", createdAt: BigInt(Date.now()), image: placeholderImage, serviceTypeId: BigInt(4) },
  { id: BigInt(5), title: "Gel-X Extensions", createdAt: BigInt(Date.now()), image: placeholderImage, serviceTypeId: BigInt(5) },
  { id: BigInt(6), title: "Ombre Gel Nails", createdAt: BigInt(Date.now()), image: placeholderImage, serviceTypeId: BigInt(1) },
];

const sampleContactInfo: ContactInfo = {
  phone: "(555) 123-4567",
  email: "hello@nailtechstudio.com",
  address: "123 Beauty Lane, Glam City, CA 90210",
  hours: "Mon–Sat 9am–7pm, Sun 10am–5pm",
  bookingUrl: "https://nailtechstudio.com/book",
};

const sampleMessages: ContactMessage[] = [
  { id: BigInt(1), name: "Jane Smith", email: "jane@example.com", message: "I'd love to book a gel manicure!", preferredService: "Gel Nails", createdAt: BigInt(Date.now()) },
  { id: BigInt(2), name: "Emily Rose", email: "emily@example.com", message: "Do you have any openings this weekend?", preferredService: "Nail Art", createdAt: BigInt(Date.now()) },
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const mockBackend: any = {
  // Object storage stubs
  _immutableObjectStorageBlobsAreLive: async () => [],
  _immutableObjectStorageBlobsToDelete: async () => [],
  _immutableObjectStorageConfirmBlobDeletion: async () => undefined,
  _immutableObjectStorageCreateCertificate: async () => ({ method: "GET", blob_hash: "" }),
  _immutableObjectStorageRefillCashier: async () => ({ success: true }),
  _immutableObjectStorageUpdateGatewayPrincipals: async () => undefined,
  _initializeAccessControl: async () => undefined,

  // Domain methods
  addGalleryItem: async (title: string, serviceTypeId: bigint, image: ExternalBlob): Promise<PortfolioImage> => ({
    id: BigInt(sampleGallery.length + 1),
    title,
    createdAt: BigInt(Date.now()),
    image,
    serviceTypeId,
  }),
  addService: async (name: string, description: string, slug: string): Promise<ServiceType> => ({
    id: BigInt(sampleServices.length + 1),
    name,
    slug,
    description,
  }),
  assignCallerUserRole: async () => undefined,
  deleteGalleryItem: async () => true,
  deleteService: async () => true,
  getCallerUserRole: async () => UserRole.admin,
  getContactInfo: async () => sampleContactInfo,
  getGalleryItem: async (id: bigint) => sampleGallery.find((img) => img.id === id) ?? null,
  getService: async (id: bigint) => sampleServices.find((s) => s.id === id) ?? null,
  isCallerAdmin: async () => true,
  listContacts: async () => sampleMessages,
  listGalleryItems: async () => sampleGallery,
  listGalleryItemsByService: async (serviceTypeId: bigint) => sampleGallery.filter((img) => img.serviceTypeId === serviceTypeId),
  listServices: async () => sampleServices,
  setContactInfo: async () => undefined,
  submitContact: async (name: string, email: string, message: string, preferredService: string): Promise<ContactMessage> => ({
    id: BigInt(sampleMessages.length + 1),
    name,
    email,
    message,
    preferredService,
    createdAt: BigInt(Date.now()),
  }),
  updateService: async () => true,
};
