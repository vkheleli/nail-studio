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
export type MessageId = bigint;
export interface ContactMessage {
    id: MessageId;
    name: string;
    createdAt: Timestamp;
    preferredService: string;
    email: string;
    message: string;
}
export type ServiceTypeId = bigint;
export interface ContactInfo {
    hours: string;
    email: string;
    address: string;
    phone: string;
    bookingUrl: string;
}
export type ImageId = bigint;
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addGalleryItem(title: string, serviceTypeId: ServiceTypeId, image: ExternalBlob): Promise<PortfolioImage>;
    addService(name: string, description: string, slug: string): Promise<ServiceType>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteGalleryItem(id: ImageId): Promise<boolean>;
    deleteService(id: ServiceTypeId): Promise<boolean>;
    getCallerUserRole(): Promise<UserRole>;
    getContactInfo(): Promise<ContactInfo>;
    getGalleryItem(id: ImageId): Promise<PortfolioImage | null>;
    getService(id: ServiceTypeId): Promise<ServiceType | null>;
    isCallerAdmin(): Promise<boolean>;
    listContacts(): Promise<Array<ContactMessage>>;
    listGalleryItems(): Promise<Array<PortfolioImage>>;
    listGalleryItemsByService(serviceTypeId: ServiceTypeId): Promise<Array<PortfolioImage>>;
    listServices(): Promise<Array<ServiceType>>;
    setContactInfo(info: ContactInfo): Promise<void>;
    submitContact(name: string, email: string, message: string, preferredService: string): Promise<ContactMessage>;
    updateService(id: ServiceTypeId, name: string, description: string, slug: string): Promise<boolean>;
}
