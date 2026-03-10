import mongoose, { Document } from "mongoose";
export interface IStudent extends Document {
    studentUid: string;
    name: {
        en: string;
        bn?: string;
    };
    gender: "male" | "female" | "other";
    religion: string;
    birthDate: Date;
    birthRegistration: string;
    languagePreference: "bn" | "en";
    imageUrl?: string;
    cloudinaryPublicId?: string;
    father: any;
    mother: any;
    guardians: any[];
    stipendBeneficiary?: any;
    current: {
        session: string;
        class: number;
        roll: number;
    };
    status: "active" | "repeat" | "passed" | "transferred" | "archived";
    promotions: any[];
    archivedAt?: Date;
    address?: {
        village: string;
        union: string;
        upazila: string;
        district: string;
        postCode?: string;
    };
    bloodGroup?: string;
    nationality: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Student: mongoose.Model<IStudent, {}, {}, {}, mongoose.Document<unknown, {}, IStudent, {}, {}> & IStudent & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>;
