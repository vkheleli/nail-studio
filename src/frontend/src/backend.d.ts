import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type BookingId = bigint;
export type Timestamp = bigint;
export interface ServiceType {
    id: ServiceTypeId;
    name: string;
    slug: string;
    description: string;
}
export interface PortfolioImage {
    id: ImageId;
    title: string;
    createdAt: Timestamp;
    image: ExternalBlob;
    serviceTypeId: ServiceTypeId;
}
export interface CreateBookingRequest {
    customerName: string;
    serviceType: string;
    customerPhone: string;
    notes?: string;
    requestedDate: string;
    requestedTime: string;
    techId: TechId;
}
export type TechId = bigint;
export interface NailTech {
    id: TechId;
    name: string;
    town: string;
    address: string;
    specialties: Array<string>;
}
export interface BookingView {
    id: BookingId;
    customerName: string;
    status: BookingStatus;
    serviceType: string;
    customerPhone: string;
    cancellationReason?: string;
    createdAt: Timestamp;
    confirmedDate?: string;
    confirmedTime?: string;
    updatedAt: Timestamp;
    notes?: string;
    requestedDate: string;
    requestedTime: string;
    techId: TechId;
    adminNotes?: string;
    techName: string;
}
export type ImageId = bigint;
export interface ContactMessage {
    id: MessageId;
    name: string;
    createdAt: Timestamp;
    preferredService: string;
    email: string;
    message: string;
}
export type MessageId = bigint;
export type ServiceTypeId = bigint;
export interface RescheduleRequest {
    bookingId: BookingId;
    adminNotes?: string;
    newDate: string;
    newTime: string;
}
export interface ContactInfo {
    hours: string;
    email: string;
    address: string;
    phone: string;
    bookingUrl: string;
}
export enum BookingStatus {
    Rescheduled = "Rescheduled",
    Confirmed = "Confirmed",
    Cancelled = "Cancelled",
    Completed = "Completed",
    Pending = "Pending"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addGalleryItem(title: string, serviceTypeId: ServiceTypeId, image: ExternalBlob): Promise<PortfolioImage>;
    addService(name: string, description: string, slug: string): Promise<ServiceType>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    cancelBooking(bookingId: BookingId, reason: string | null): Promise<BookingView | null>;
    completeBooking(bookingId: BookingId, adminNotes: string | null): Promise<BookingView | null>;
    confirmBooking(bookingId: BookingId, adminNotes: string | null): Promise<BookingView | null>;
    deleteGalleryItem(id: ImageId): Promise<boolean>;
    deleteService(id: ServiceTypeId): Promise<boolean>;
    getBooking(bookingId: BookingId): Promise<BookingView | null>;
    getCallerUserRole(): Promise<UserRole>;
    getContactInfo(): Promise<ContactInfo>;
    getGalleryItem(id: ImageId): Promise<PortfolioImage | null>;
    getNailTech(techId: TechId): Promise<NailTech | null>;
    getService(id: ServiceTypeId): Promise<ServiceType | null>;
    isCallerAdmin(): Promise<boolean>;
    listBookings(statusFilter: BookingStatus | null): Promise<Array<BookingView>>;
    listContacts(): Promise<Array<ContactMessage>>;
    listGalleryItems(): Promise<Array<PortfolioImage>>;
    listGalleryItemsByService(serviceTypeId: ServiceTypeId): Promise<Array<PortfolioImage>>;
    listNailTechs(): Promise<Array<NailTech>>;
    listServices(): Promise<Array<ServiceType>>;
    rescheduleBooking(req: RescheduleRequest): Promise<BookingView | null>;
    setContactInfo(info: ContactInfo): Promise<void>;
    submitBooking(req: CreateBookingRequest): Promise<BookingView>;
    submitContact(name: string, email: string, message: string, preferredService: string): Promise<ContactMessage>;
    updateService(id: ServiceTypeId, name: string, description: string, slug: string): Promise<boolean>;
}
