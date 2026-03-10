"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentService = void 0;
// src/modules/student/student.service.ts
const student_model_1 = require("./student.model");
const errors_1 = require("../../core/errors");
exports.StudentService = {
    // ══════════════════════════════════════════════════════════════
    // CREATE
    // ══════════════════════════════════════════════════════════════
    async create(payload) {
        const exists = await student_model_1.Student.findOne({ studentUid: payload.studentUid });
        if (exists)
            throw new errors_1.BadRequestError("Student UID already exists");
        // Check duplicate roll in same class+session
        const rollConflict = await student_model_1.Student.findOne({
            "current.session": payload.current.session,
            "current.class": payload.current.class,
            "current.roll": payload.current.roll,
        });
        if (rollConflict) {
            throw new errors_1.BadRequestError(`Roll ${payload.current.roll} already taken in Class ${payload.current.class}, Session ${payload.current.session}`);
        }
        return student_model_1.Student.create({
            ...payload,
            birthDate: new Date(payload.birthDate),
            imageUrl: payload.imageUrl || undefined,
        });
    },
    // ══════════════════════════════════════════════════════════════
    // LIST (paginated, filterable, sortable)
    // ══════════════════════════════════════════════════════════════
    async list(query) {
        const page = Math.max(Number(query.page) || 1, 1);
        const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
        const sortBy = query.sortBy ?? "createdAt";
        const sortDir = query.sortDir ?? "desc";
        const filter = {};
        if (query.class)
            filter["current.class"] = Number(query.class);
        if (query.session)
            filter["current.session"] = query.session;
        if (query.gender)
            filter.gender = query.gender;
        if (query.status)
            filter.status = query.status;
        if (query.search?.trim()) {
            filter.$text = { $search: query.search.trim() };
        }
        // Sort mapping
        const sortMap = {
            name: "name.en",
            roll: "current.roll",
            class: "current.class",
            createdAt: "createdAt",
        };
        const sortField = sortMap[sortBy] ?? "createdAt";
        const sortOrder = sortDir === "asc" ? 1 : -1;
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            student_model_1.Student.find(filter)
                .sort({ [sortField]: sortOrder })
                .skip(skip)
                .limit(limit)
                .lean(),
            student_model_1.Student.countDocuments(filter),
        ]);
        return {
            data: data,
            meta: {
                total,
                page,
                limit,
                totalPages: total === 0 ? 1 : Math.ceil(total / limit),
            },
        };
    },
    // ══════════════════════════════════════════════════════════════
    // GET BY UID
    // ══════════════════════════════════════════════════════════════
    async getByUid(studentUid) {
        studentUid = studentUid.toUpperCase().trim();
        const student = await student_model_1.Student.findOne({ studentUid }).lean();
        return student;
    },
    // ══════════════════════════════════════════════════════════════
    // UPDATE STATUS
    // ══════════════════════════════════════════════════════════════
    async updateStatus(studentUid, status) {
        studentUid = studentUid.toUpperCase().trim();
        const update = { status };
        if (status === "archived")
            update.archivedAt = new Date();
        const student = await student_model_1.Student.findOneAndUpdate({ studentUid }, { $set: update }, { new: true }).lean();
        if (!student)
            throw new errors_1.NotFoundError("Student not found");
        return student;
    },
    // ══════════════════════════════════════════════════════════════
    // PROMOTE
    // ══════════════════════════════════════════════════════════════
    async promote(studentUid, entry) {
        studentUid = studentUid.toUpperCase().trim();
        const student = await student_model_1.Student.findOne({ studentUid });
        if (!student)
            throw new errors_1.NotFoundError("Student not found");
        // Check roll conflict if newRoll provided
        if (entry.newRoll && entry.result === "promoted") {
            const conflict = await student_model_1.Student.findOne({
                "current.session": entry.session,
                "current.class": entry.toClass,
                "current.roll": entry.newRoll,
                studentUid: { $ne: studentUid },
            });
            if (conflict) {
                throw new errors_1.BadRequestError(`Roll ${entry.newRoll} already taken in Class ${entry.toClass}, Session ${entry.session}`);
            }
        }
        const updated = await student_model_1.Student.findOneAndUpdate({ studentUid }, {
            $push: { promotions: { ...entry, decidedAt: new Date() } },
            $set: {
                status: entry.result === "repeat" ? "repeat" : "active",
                "current.class": entry.toClass,
                "current.roll": entry.newRoll ?? student.current.roll,
                "current.session": entry.session,
            },
        }, { new: true }).lean();
        return updated;
    },
    // ══════════════════════════════════════════════════════════════
    // BULK PROMOTE (class-wise)
    // ══════════════════════════════════════════════════════════════
    async bulkPromote(payload) {
        const { session, fromClass, toClass, studentUids, result, remarks } = payload;
        const students = await student_model_1.Student.find({ studentUid: { $in: studentUids } });
        if (!students.length)
            throw new errors_1.BadRequestError("No valid students found");
        const ops = students.map((s, idx) => student_model_1.Student.findOneAndUpdate({ studentUid: s.studentUid }, {
            $push: {
                promotions: {
                    session,
                    fromClass,
                    toClass,
                    result,
                    previousRoll: s.current.roll,
                    newRoll: idx + 1, // auto assign roll by order
                    remarks: remarks,
                    decidedAt: new Date(),
                },
            },
            $set: {
                status: result === "repeat" ? "repeat" : "active",
                "current.class": toClass,
                "current.roll": idx + 1,
                "current.session": session,
            },
        }, { new: true }));
        const results = await Promise.all(ops);
        return { promoted: results.length, students: results };
    },
    // ══════════════════════════════════════════════════════════════
    // STIPEND
    // ══════════════════════════════════════════════════════════════
    async updateStipendBeneficiary(studentUid, payload) {
        studentUid = studentUid.toUpperCase().trim();
        const student = await student_model_1.Student.findOneAndUpdate({ studentUid }, {
            $set: {
                stipendBeneficiary: {
                    ...payload,
                    isActive: true,
                    updatedAt: new Date(),
                },
            },
        }, { new: true }).lean();
        if (!student)
            throw new errors_1.NotFoundError("Student not found");
        return student;
    },
    async getStipendBeneficiary(studentUid) {
        studentUid = studentUid.toUpperCase().trim();
        const student = await student_model_1.Student.findOne({ studentUid }, { stipendBeneficiary: 1 }).lean();
        if (!student)
            throw new errors_1.NotFoundError("Student not found");
        return student.stipendBeneficiary ?? null;
    },
    // ══════════════════════════════════════════════════════════════
    // UPDATE IMAGE (after Cloudinary upload)
    // ══════════════════════════════════════════════════════════════
    async updateImage(studentUid, imageUrl, cloudinaryPublicId) {
        studentUid = studentUid.toUpperCase().trim();
        const student = await student_model_1.Student.findOneAndUpdate({ studentUid }, { $set: { imageUrl, cloudinaryPublicId } }, { new: true }).lean();
        if (!student)
            throw new errors_1.NotFoundError("Student not found");
        return student;
    },
    // ══════════════════════════════════════════════════════════════
    // DISTINCT helpers
    // ══════════════════════════════════════════════════════════════
    async getSessions() {
        const result = await student_model_1.Student.distinct("current.session");
        return result.sort().reverse();
    },
    async getClasses() {
        const result = await student_model_1.Student.distinct("current.class");
        return result.sort((a, b) => a - b);
    },
    // ══════════════════════════════════════════════════════════════
    // CLASS ROSTER (for bulk promotion / roll management)
    // ══════════════════════════════════════════════════════════════
    async getClassRoster(classNum, session) {
        return student_model_1.Student.find({
            "current.class": classNum,
            "current.session": session,
            status: { $in: ["active", "repeat"] },
        }, { studentUid: 1, name: 1, "current.roll": 1, gender: 1, status: 1 })
            .sort({ "current.roll": 1 })
            .lean();
    },
    // ══════════════════════════════════════════════════════════════
    // STATS (dashboard)
    // ══════════════════════════════════════════════════════════════
    async getStats(session) {
        const baseFilter = session ? { "current.session": session } : {};
        const [total, byGender, byStatus, byClass] = await Promise.all([
            student_model_1.Student.countDocuments(baseFilter),
            student_model_1.Student.aggregate([
                { $match: baseFilter },
                { $group: { _id: "$gender", count: { $sum: 1 } } },
            ]),
            student_model_1.Student.aggregate([
                { $match: baseFilter },
                { $group: { _id: "$status", count: { $sum: 1 } } },
            ]),
            student_model_1.Student.aggregate([
                { $match: baseFilter },
                { $group: { _id: "$current.class", count: { $sum: 1 } } },
                { $sort: { _id: 1 } },
            ]),
        ]);
        return { total, byGender, byStatus, byClass };
    },
};
//# sourceMappingURL=student.service.js.map