export type StudentStatus = "active" | "repeat" | "passed" | "transferred" | "archived";
export type Gender = "male" | "female" | "other";
export type LangPref = "bn" | "en";
export type WalletProvider = "bKash" | "Nagad" | "Rocket" | "Other";
export type PaymentMethod = "mobile_banking" | "bank" | "cash";
export type PromoteResult = "promoted" | "repeat";
export type BloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" | "unknown";
export interface LocalizedName {
    en: string;
    bn?: string;
}
export interface ParentInfo {
    name: LocalizedName;
    mobile: string;
    nid: string;
    birthRegistration: string;
    occupation?: string;
    education?: string;
}
export interface GuardianInfo {
    relation: "guardian" | "other";
    name: LocalizedName;
    mobile: string;
    nid?: string;
    walletProvider: WalletProvider;
}
export interface PromotionEntry {
    session: string;
    fromClass: number;
    toClass: number;
    result: PromoteResult;
    previousRoll?: number;
    newRoll?: number;
    remarks?: string;
    decidedAt: Date;
}
export interface StipendBeneficiary {
    name: string;
    mobile: string;
    relation: "father" | "mother" | "guardian" | "other";
    paymentMethod: PaymentMethod;
    walletProvider?: WalletProvider;
    bankName?: string;
    accountNumber?: string;
    isActive: boolean;
    updatedAt: Date;
}
export interface StudentAddress {
    village: string;
    union: string;
    upazila: string;
    district: string;
    postCode?: string;
}
export interface CreateStudentDTO {
    studentUid: string;
    name: LocalizedName;
    gender: Gender;
    religion: string;
    birthDate: string;
    birthRegistration: string;
    languagePreference?: LangPref;
    imageUrl?: string;
    bloodGroup?: BloodGroup;
    nationality?: string;
    address?: StudentAddress;
    father: ParentInfo;
    mother: ParentInfo;
    guardians?: GuardianInfo[];
    current: {
        session: string;
        class: number;
        roll: number;
    };
}
export interface UpdateStatusDTO {
    status: StudentStatus;
}
export interface PromoteDTO {
    session: string;
    fromClass: number;
    toClass: number;
    result: PromoteResult;
    previousRoll?: number;
    newRoll?: number;
    remarks?: string;
}
export interface StipendDTO {
    name: string;
    mobile: string;
    relation: "father" | "mother" | "guardian" | "other";
    paymentMethod: PaymentMethod;
    walletProvider?: WalletProvider;
    bankName?: string;
    accountNumber?: string;
}
export interface ListStudentsQuery {
    search?: string;
    class?: number | string;
    session?: string;
    gender?: Gender;
    status?: StudentStatus;
    religion?: string;
    ageMin?: number;
    ageMax?: number;
    page?: number;
    limit?: number;
    sortBy?: "name" | "roll" | "class" | "createdAt";
    sortDir?: "asc" | "desc";
}
export interface PaginatedResult<T> {
    data: T[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}
