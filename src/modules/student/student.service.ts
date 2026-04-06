// // src/modules/student/student.service.ts
// import { Student } from "./student.model";
// import { BadRequestError, NotFoundError } from "../../core/errors";
// import type {
//   CreateStudentDTO,
//   ListStudentsQuery,
//   PromoteDTO,
//   StipendDTO,
//   PaginatedResult,
// } from "./student.types";
// import type { IStudent } from "./student.model";

// export const StudentService = {
//   // ══════════════════════════════════════════════════════════════
//   // CREATE
//   // ══════════════════════════════════════════════════════════════
//   async create(payload: CreateStudentDTO): Promise<IStudent> {
//     const exists = await Student.findOne({ studentUid: payload.studentUid });
//     if (exists) throw new BadRequestError("Student UID already exists");

//     // Check duplicate roll in same class+session
//     const rollConflict = await Student.findOne({
//       "current.session": payload.current.session,
//       "current.class": payload.current.class,
//       "current.roll": payload.current.roll,
//     });
//     if (rollConflict) {
//       throw new BadRequestError(
//         `Roll ${payload.current.roll} already taken in Class ${payload.current.class}, Session ${payload.current.session}`
//       );
//     }

//     return Student.create({
//       ...payload,
//       birthDate: new Date(payload.birthDate),
//       imageUrl: payload.imageUrl || undefined,
//     });
//   },

//   // ══════════════════════════════════════════════════════════════
//   // LIST (paginated, filterable, sortable)
//   // ══════════════════════════════════════════════════════════════
//   async list(query: ListStudentsQuery): Promise<PaginatedResult<IStudent>> {
//     const page = Math.max(Number(query.page) || 1, 1);
//     const limit = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
//     const sortBy = query.sortBy ?? "createdAt";
//     const sortDir = query.sortDir ?? "desc";

//     const filter: Record<string, any> = {};

//     if (query.class) filter["current.class"] = Number(query.class);
//     if (query.session) filter["current.session"] = query.session;
//     if (query.gender) filter.gender = query.gender;
//     if (query.status) filter.status = query.status;

//     if (query.search?.trim()) {
//       filter.$text = { $search: query.search.trim() };
//     }

//     // Sort mapping
//     const sortMap: Record<string, string> = {
//       name: "name.en",
//       roll: "current.roll",
//       class: "current.class",
//       createdAt: "createdAt",
//     };
//     const sortField = sortMap[sortBy] ?? "createdAt";
//     const sortOrder = sortDir === "asc" ? 1 : -1;

//     const skip = (page - 1) * limit;

//     const [data, total] = await Promise.all([
//       Student.find(filter)
//         .sort({ [sortField]: sortOrder })
//         .skip(skip)
//         .limit(limit)
//         .lean(),
//       Student.countDocuments(filter),
//     ]);

//     return {
//       data: data as unknown as IStudent[],
//       meta: {
//         total,
//         page,
//         limit,
//         totalPages: total === 0 ? 1 : Math.ceil(total / limit),
//       },
//     };
//   },

//   // ══════════════════════════════════════════════════════════════
//   // GET BY UID
//   // ══════════════════════════════════════════════════════════════
//   async getByUid(studentUid: string): Promise<IStudent | null> {
//   studentUid = studentUid.toUpperCase().trim();
//   const student = await Student.findOne({ studentUid }).lean();
//   return student as unknown as IStudent | null;
// }
// ,
//   // ══════════════════════════════════════════════════════════════
//   // UPDATE STATUS
//   // ══════════════════════════════════════════════════════════════
//   async updateStatus(studentUid: string, status: string): Promise<IStudent> {
//     studentUid = studentUid.toUpperCase().trim();
//     const update: Record<string, any> = { status };
//     if (status === "archived") update.archivedAt = new Date();

//     const student = await Student.findOneAndUpdate(
//       { studentUid },
//       { $set: update },
//       { new: true }
//     ).lean();

//     if (!student) throw new NotFoundError("Student not found");
//     return student as unknown as IStudent;
//   },

//   // ══════════════════════════════════════════════════════════════
//   // PROMOTE
//   // ══════════════════════════════════════════════════════════════
//   async promote(studentUid: string, entry: PromoteDTO): Promise<IStudent> {
//     studentUid = studentUid.toUpperCase().trim();
//     const student = await Student.findOne({ studentUid });
//     if (!student) throw new NotFoundError("Student not found");

//     // Check roll conflict if newRoll provided
//     if (entry.newRoll && entry.result === "promoted") {
//       const conflict = await Student.findOne({
//         "current.session": entry.session,
//         "current.class": entry.toClass,
//         "current.roll": entry.newRoll,
//         studentUid: { $ne: studentUid },
//       });
//       if (conflict) {
//         throw new BadRequestError(
//           `Roll ${entry.newRoll} already taken in Class ${entry.toClass}, Session ${entry.session}`
//         );
//       }
//     }

//     const updated = await Student.findOneAndUpdate(
//       { studentUid },
//       {
//         $push: { promotions: { ...entry, decidedAt: new Date() } },
//         $set: {
//           status: entry.result === "repeat" ? "repeat" : "active",
//           "current.class": entry.toClass,
//           "current.roll": entry.newRoll ?? student.current.roll,
//           "current.session": entry.session,
//         },
//       },
//       { new: true }
//     ).lean();

//     return updated as unknown as IStudent;
//   },

//   // ══════════════════════════════════════════════════════════════
//   // BULK PROMOTE (class-wise)
//   // ══════════════════════════════════════════════════════════════
//   async bulkPromote(payload: {
//     session: string;
//     fromClass: number;
//     toClass: number;
//     studentUids: string[];
//     result: "promoted" | "repeat";
//     remarks?: string;
//   }) {
//     const { session, fromClass, toClass, studentUids, result, remarks } =
//       payload;

//     const students = await Student.find({ studentUid: { $in: studentUids } });
//     if (!students.length) throw new BadRequestError("No valid students found");

//     const ops = students.map((s, idx) =>
//       Student.findOneAndUpdate(
//         { studentUid: s.studentUid },
//         {
//           $push: {
//             promotions: {
//               session,
//               fromClass,
//               toClass,
//               result,
//               previousRoll: s.current.roll,
//               newRoll: idx + 1, // auto assign roll by order
//               remarks: remarks,
//               decidedAt: new Date(),
//             },
//           },
//           $set: {
//             status: result === "repeat" ? "repeat" : "active",
//             "current.class": toClass,
//             "current.roll": idx + 1,
//             "current.session": session,
//           },
//         },
//         { new: true }
//       )
//     );

//     const results = await Promise.all(ops);
//     return { promoted: results.length, students: results };
//   },

//   // ══════════════════════════════════════════════════════════════
//   // STIPEND
//   // ══════════════════════════════════════════════════════════════
//   async updateStipendBeneficiary(
//     studentUid: string,
//     payload: StipendDTO
//   ): Promise<IStudent> {
//     studentUid = studentUid.toUpperCase().trim();
//     const student = await Student.findOneAndUpdate(
//       { studentUid },
//       {
//         $set: {
//           stipendBeneficiary: {
//             ...payload,
//             isActive: true,
//             updatedAt: new Date(),
//           },
//         },
//       },
//       { new: true }
//     ).lean();

//     if (!student) throw new NotFoundError("Student not found");
//     return student as unknown as IStudent;
//   },

//   async getStipendBeneficiary(studentUid: string) {
//     studentUid = studentUid.toUpperCase().trim();
//     const student = await Student.findOne(
//       { studentUid },
//       { stipendBeneficiary: 1 }
//     ).lean();
//     if (!student) throw new NotFoundError("Student not found");
//     return student.stipendBeneficiary ?? null;
//   },

//   // ══════════════════════════════════════════════════════════════
//   // UPDATE IMAGE (after Cloudinary upload)
//   // ══════════════════════════════════════════════════════════════
//   async updateImage(
//     studentUid: string,
//     imageUrl: string,
//     cloudinaryPublicId?: string
//   ): Promise<IStudent> {
//     studentUid = studentUid.toUpperCase().trim();
//     const student = await Student.findOneAndUpdate(
//       { studentUid },
//       { $set: { imageUrl, cloudinaryPublicId } },
//       { new: true }
//     ).lean();
//     if (!student) throw new NotFoundError("Student not found");
//     return student as unknown as IStudent;
//   },

//   // ══════════════════════════════════════════════════════════════
//   // DISTINCT helpers
//   // ══════════════════════════════════════════════════════════════
//   async getSessions(): Promise<string[]> {
//     const result = await Student.distinct("current.session");
//     return (result as string[]).sort().reverse();
//   },

//   async getClasses(): Promise<number[]> {
//     const result = await Student.distinct("current.class");
//     return (result as number[]).sort((a, b) => a - b);
//   },

//   // ══════════════════════════════════════════════════════════════
//   // CLASS ROSTER (for bulk promotion / roll management)
//   // ══════════════════════════════════════════════════════════════
//   async getClassRoster(classNum: number, session: string) {
//     return Student.find(
//       {
//         "current.class": classNum,
//         "current.session": session,
//         status: { $in: ["active", "repeat"] },
//       },
//       { studentUid: 1, name: 1, "current.roll": 1, gender: 1, status: 1 }
//     )
//       .sort({ "current.roll": 1 })
//       .lean();
//   },

//   // ══════════════════════════════════════════════════════════════
//   // STATS (dashboard)
//   // ══════════════════════════════════════════════════════════════
//   async getStats(session?: string) {
//     const baseFilter = session ? { "current.session": session } : {};

//     const [total, byGender, byStatus, byClass] = await Promise.all([
//       Student.countDocuments(baseFilter),
//       Student.aggregate([
//         { $match: baseFilter },
//         { $group: { _id: "$gender", count: { $sum: 1 } } },
//       ]),
//       Student.aggregate([
//         { $match: baseFilter },
//         { $group: { _id: "$status", count: { $sum: 1 } } },
//       ]),
//       Student.aggregate([
//         { $match: baseFilter },
//         { $group: { _id: "$current.class", count: { $sum: 1 } } },
//         { $sort: { _id: 1 } },
//       ]),
//     ]);

//     return { total, byGender, byStatus, byClass };
//   },
// };
// src/modules/student/student.service.ts
import { Student } from "./student.model";
import { BadRequestError, NotFoundError } from "../../core/errors";
import type {
  CreateStudentDTO,
  ListStudentsQuery,
  PromoteDTO,
  StipendDTO,
  PaginatedResult,
} from "./student.types";
import type { IStudent } from "./student.model";

export const StudentService = {

  // ══════════════════════════════════════════════════════════════
  // CREATE
  // ══════════════════════════════════════════════════════════════
  async create(payload: CreateStudentDTO): Promise<IStudent> {
    const exists = await Student.findOne({ studentUid: payload.studentUid });
    if (exists) throw new BadRequestError("Student UID already exists");

    // Check duplicate roll in same class+session
    const rollConflict = await Student.findOne({
      "current.session": payload.current.session,
      "current.class":   payload.current.class,
      "current.roll":    payload.current.roll,
    });
    if (rollConflict) {
      throw new BadRequestError(
        `Roll ${payload.current.roll} already taken in Class ${payload.current.class}, Session ${payload.current.session}`
      );
    }

    return Student.create({
      ...payload,
      birthDate: new Date(payload.birthDate),
      imageUrl: payload.imageUrl || undefined,
    });
  },

  // ══════════════════════════════════════════════════════════════
  // LIST (paginated, filterable, sortable)
  // ══════════════════════════════════════════════════════════════
  async list(query: ListStudentsQuery): Promise<PaginatedResult<IStudent>> {
    const page    = Math.max(Number(query.page)  || 1,  1);
    const limit   = Math.min(Math.max(Number(query.limit) || 10, 1), 100);
    const sortBy  = query.sortBy  ?? "createdAt";
    const sortDir = query.sortDir ?? "desc";

    const filter: Record<string, any> = {};

    // ── Exact / enum filters ──────────────────────────────────────
    if (query.class)    filter["current.class"]   = Number(query.class);
    if (query.session)  filter["current.session"] = query.session;
    if (query.gender)   filter.gender             = query.gender;
    if (query.status)   filter.status             = query.status;
    if (query.religion) filter.religion           = new RegExp(query.religion, "i");

    // ── Age range filter via birthDate ────────────────────────────
    if (query.ageMin || query.ageMax) {
      const now = new Date();
      const dateFilter: Record<string, Date> = {};
      if (query.ageMax) {
        const minDate = new Date(now);
        minDate.setFullYear(minDate.getFullYear() - Number(query.ageMax) - 1);
        dateFilter.$gte = minDate;
      }
      if (query.ageMin) {
        const maxDate = new Date(now);
        maxDate.setFullYear(maxDate.getFullYear() - Number(query.ageMin));
        dateFilter.$lte = maxDate;
      }
      filter.birthDate = dateFilter;
    }

    // ── Full-text $or regex search ────────────────────────────────
    // Covers: name (EN/BN), UID, birth reg, father/mother name+phone+NID, guardian phone
    const term = query.search?.trim();
    if (term) {
      const re = new RegExp(term, "i");
      filter.$or = [
        { "name.en":          re },
        { "name.bn":          re },
        { studentUid:         re },
        { birthRegistration:  re },
        { "father.name.en":   re },
        { "father.name.bn":   re },
        { "father.mobile":    re },
        { "father.nid":       re },
        { "mother.name.en":   re },
        { "mother.name.bn":   re },
        { "mother.mobile":    re },
        { "guardians.name":   re },
        { "guardians.mobile": re },
      ];
    }

    // Sort mapping
    const sortMap: Record<string, string> = {
      name:      "name.en",
      roll:      "current.roll",
      class:     "current.class",
      createdAt: "createdAt",
    };
    const sortField = sortMap[sortBy] ?? "createdAt";
    const sortOrder = sortDir === "asc" ? 1 : -1;

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      Student.find(filter)
        .sort({ [sortField]: sortOrder })
        .skip(skip)
        .limit(limit)
        .lean(),
      Student.countDocuments(filter),
    ]);

    return {
      data: data as unknown as IStudent[],
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
  async getByUid(studentUid: string): Promise<IStudent> {
    studentUid = studentUid.toUpperCase().trim();
    const student = await Student.findOne({ studentUid }).lean();
    if (!student) throw new NotFoundError("Student not found");
    return student as unknown as IStudent;
  },

  // ══════════════════════════════════════════════════════════════
  // UPDATE STATUS
  // ══════════════════════════════════════════════════════════════
  async updateStatus(studentUid: string, status: string): Promise<IStudent> {
    studentUid = studentUid.toUpperCase().trim();
    const update: Record<string, any> = { status };
    if (status === "archived") update.archivedAt = new Date();

    const student = await Student.findOneAndUpdate(
      { studentUid },
      { $set: update },
      { new: true }
    ).lean();

    if (!student) throw new NotFoundError("Student not found");
    return student as unknown as IStudent;
  },

  // ══════════════════════════════════════════════════════════════
  // PROMOTE
  // ══════════════════════════════════════════════════════════════
  async promote(studentUid: string, entry: PromoteDTO): Promise<IStudent> {
    studentUid = studentUid.toUpperCase().trim();
    const student = await Student.findOne({ studentUid });
    if (!student) throw new NotFoundError("Student not found");

    // Check roll conflict if newRoll provided
    if (entry.newRoll && entry.result === "promoted") {
      const conflict = await Student.findOne({
        "current.session": entry.session,
        "current.class":   entry.toClass,
        "current.roll":    entry.newRoll,
        studentUid:        { $ne: studentUid },
      });
      if (conflict) {
        throw new BadRequestError(
          `Roll ${entry.newRoll} already taken in Class ${entry.toClass}, Session ${entry.session}`
        );
      }
    }

    const updated = await Student.findOneAndUpdate(
      { studentUid },
      {
        $push: { promotions: { ...entry, decidedAt: new Date() } },
        $set:  {
          status:            entry.result === "repeat" ? "repeat" : "active",
          "current.class":   entry.toClass,
          "current.roll":    entry.newRoll ?? student.current.roll,
          "current.session": entry.session,
        },
      },
      { new: true }
    ).lean();

    return updated as unknown as IStudent;
  },

  // ══════════════════════════════════════════════════════════════
  // BULK PROMOTE (class-wise)
  // ══════════════════════════════════════════════════════════════
  async bulkPromote(payload: {
    session:     string;
    fromClass:   number;
    toClass:     number;
    studentUids: string[];
    result:      "promoted" | "repeat";
    remarks?:    string;
  }) {
    const { session, fromClass, toClass, studentUids, result, remarks } = payload;

    const students = await Student.find({ studentUid: { $in: studentUids } });
    if (!students.length) throw new BadRequestError("No valid students found");

    const ops = students.map((s, idx) =>
      Student.findOneAndUpdate(
        { studentUid: s.studentUid },
        {
          $push: {
            promotions: {
              session, fromClass, toClass, result,
              previousRoll: s.current.roll,
              newRoll:      idx + 1,   // auto assign roll by order
              remarks:      remarks,
              decidedAt:    new Date(),
            },
          },
          $set: {
            status:            result === "repeat" ? "repeat" : "active",
            "current.class":   toClass,
            "current.roll":    idx + 1,
            "current.session": session,
          },
        },
        { new: true }
      )
    );

    const results = await Promise.all(ops);
    return { promoted: results.length, students: results };
  },

  // ══════════════════════════════════════════════════════════════
  // STIPEND
  // ══════════════════════════════════════════════════════════════
  async updateStipendBeneficiary(studentUid: string, payload: StipendDTO): Promise<IStudent> {
    studentUid = studentUid.toUpperCase().trim();
    const student = await Student.findOneAndUpdate(
      { studentUid },
      {
        $set: {
          stipendBeneficiary: {
            ...payload,
            isActive:  true,
            updatedAt: new Date(),
          },
        },
      },
      { new: true }
    ).lean();

    if (!student) throw new NotFoundError("Student not found");
    return student as unknown as IStudent;
  },

  async getStipendBeneficiary(studentUid: string) {
    studentUid = studentUid.toUpperCase().trim();
    const student = await Student.findOne(
      { studentUid },
      { stipendBeneficiary: 1 }
    ).lean();
    if (!student) throw new NotFoundError("Student not found");
    return student.stipendBeneficiary ?? null;
  },

  // ══════════════════════════════════════════════════════════════
  // UPDATE IMAGE (after Cloudinary upload)
  // ══════════════════════════════════════════════════════════════
  async updateImage(studentUid: string, imageUrl: string, cloudinaryPublicId?: string): Promise<IStudent> {
    studentUid = studentUid.toUpperCase().trim();
    const student = await Student.findOneAndUpdate(
      { studentUid },
      { $set: { imageUrl, cloudinaryPublicId } },
      { new: true }
    ).lean();
    if (!student) throw new NotFoundError("Student not found");
    return student as unknown as IStudent;
  },

  // ══════════════════════════════════════════════════════════════
  // DISTINCT helpers
  // ══════════════════════════════════════════════════════════════
  async getSessions(): Promise<string[]> {
    const result = await Student.distinct("current.session");
    return (result as string[]).sort().reverse();
  },

  async getClasses(): Promise<number[]> {
    const result = await Student.distinct("current.class");
    return (result as number[]).sort((a, b) => a - b);
  },

  // ══════════════════════════════════════════════════════════════
  // CLASS ROSTER (for bulk promotion / roll management)
  // ══════════════════════════════════════════════════════════════
  async getClassRoster(classNum: number, session: string) {
    return Student.find(
      {
        "current.class":   classNum,
        "current.session": session,
        status:            { $in: ["active", "repeat"] },
      },
      { studentUid: 1, name: 1, "current.roll": 1, gender: 1, status: 1 }
    )
      .sort({ "current.roll": 1 })
      .lean();
  },

  // ══════════════════════════════════════════════════════════════
  // STATS (dashboard)
  // ══════════════════════════════════════════════════════════════
  async getStats(session?: string) {
    const baseFilter = session ? { "current.session": session } : {};

    const [total, byGender, byStatus, byClass] = await Promise.all([
      Student.countDocuments(baseFilter),
      Student.aggregate([
        { $match: baseFilter },
        { $group: { _id: "$gender", count: { $sum: 1 } } },
      ]),
      Student.aggregate([
        { $match: baseFilter },
        { $group: { _id: "$status", count: { $sum: 1 } } },
      ]),
      Student.aggregate([
        { $match: baseFilter },
        { $group: { _id: "$current.class", count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
    ]);

    return { total, byGender, byStatus, byClass };
  },
};