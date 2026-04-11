// import { Request, Response } from "express";
// import { StudentService } from "./student.service";
// import {
//   createStudentSchema,
//   updateStatusSchema,
//   promoteSchema,
//   stipendBeneficiarySchema,
// } from "./student.validation";

// export const StudentController = {
//   async create(req: Request, res: Response) {
//   const data = createStudentSchema.parse(req.body);

//   if (!data.current?.session?.trim()) {
//     return res.status(400).json({
//       success: false,
//       message: "Session is required",
//     });
//   }

//   const student = await StudentService.create(data);

//   res.status(201).json({
//     success: true,
//     data: student,
//   });
// }
// ,
//   async list(req: Request, res: Response) {
//     console.log("LIST CONTROLLER HIT");

//     const result = await StudentService.list(req.query);

//     console.log("LIST RESULT:", result);

//     return res.status(200).json({
//       success: true,
//       data: result.data,
//       meta: result.meta,
//     });
//   },

//   async sessions(req: Request, res: Response) {
//     const sessions = await StudentService.getSessions();
//     res.json({ success: true, data: sessions });
//   },

//   async classes(req: Request, res: Response) {
//     const classes = await StudentService.getClasses();
//     res.json({ success: true, data: classes });
//   },

//   async get(req: Request, res: Response) {
//     const doc = await StudentService.getByUid(req.params.studentUid);
//     if (!doc) {
//       return res.status(404).json({ success: false, message: "Not found" });
//     }
//     res.json({ success: true, data: doc });
//   },

//   async updateStatus(req: Request, res: Response) {
//     const { status } = updateStatusSchema.parse(req.body);
//     const doc = await StudentService.updateStatus(
//       req.params.studentUid,
//       status
//     );
//     res.json({ success: true, data: doc });
//   },

//   async promote(req: Request, res: Response) {
//     const entry = promoteSchema.parse(req.body);
//     const doc = await StudentService.promote(req.params.studentUid, entry);
//     res.json({ success: true, data: doc });
//   },

//   async updateStipendBeneficiary(req: Request, res: Response) {
//     const data = stipendBeneficiarySchema.parse(req.body);

//     const student = await StudentService.updateStipendBeneficiary(
//       req.params.studentUid,
//       data
//     );

//     res.json({
//       success: true,
//       message: "Stipend beneficiary updated successfully",
//       data: student.stipendBeneficiary,
//     });
//   },

//   async getStipendBeneficiary(req: Request, res: Response) {
//     const beneficiary = await StudentService.getStipendBeneficiary(
//       req.params.studentUid
//     );

//     res.json({ success: true, data: beneficiary });
//   },

  
// };
// src/modules/student/student.controller.ts
import { Request, Response, NextFunction } from "express";
import { StudentService } from "./student.service";
import {
  createStudentSchema,
  updateStatusSchema,
  promoteSchema,
  stipendBeneficiarySchema,
  listQuerySchema,
  bulkPromoteSchema,
  imageUploadSchema,
} from "./student.validation";
import { BulkPromoteDTO, CreateStudentDTO, ListStudentsQuery, PromoteDTO, StipendDTO } from "./student.types";

// Helper: wrap async handlers
const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) =>
    fn(req, res, next).catch(next);

export const StudentController = {
  // ──────────────────────────────────────────────────────────────
  // POST /students
  // ──────────────────────────────────────────────────────────────
  // src/modules/student/student.controller.ts - create method

  create: asyncHandler(async (req, res) => {
    const data = createStudentSchema.parse(req.body);

    // ✅ Ensure all required fields exist
    const validatedData = {
      ...data,
      studentUid: data.studentUid!,
      current: {
        session: data.current!.session,
        class: data.current!.class,
        roll: data.current!.roll,
      },
    } as CreateStudentDTO;

    const student = await StudentService.create(validatedData);
    return res.status(201).json({ success: true, data: student });
  }),
  // ──────────────────────────────────────────────────────────────
  // GET /students
  // ──────────────────────────────────────────────────────────────
  list: asyncHandler(async (req, res) => {
    const query = listQuerySchema.parse(req.query);
    const result = await StudentService.list(query as ListStudentsQuery);
    return res.json({ success: true, ...result });
  }),

  // ──────────────────────────────────────────────────────────────
  // GET /students/sessions
  // ──────────────────────────────────────────────────────────────
  sessions: asyncHandler(async (_req, res) => {
    const sessions = await StudentService.getSessions();
    res.json({ success: true, data: sessions });
  }),

  // ──────────────────────────────────────────────────────────────
  // GET /students/classes
  // ──────────────────────────────────────────────────────────────
  classes: asyncHandler(async (_req, res) => {
    const classes = await StudentService.getClasses();
    res.json({ success: true, data: classes });
  }),

  // ──────────────────────────────────────────────────────────────
  // GET /students/stats
  // ──────────────────────────────────────────────────────────────
  stats: asyncHandler(async (req, res) => {
    const session = req.query.session as string | undefined;
    const stats = await StudentService.getStats(session);
    res.json({ success: true, data: stats });
  }),

  // ──────────────────────────────────────────────────────────────
  // GET /students/roster?class=5&session=2025
  // ──────────────────────────────────────────────────────────────
  roster: asyncHandler(async (req, res) => {
    const classNum = Number(req.query.class);
    const session = req.query.session as string;
    if (!classNum || !session) {
      return res
        .status(400)
        .json({ success: false, message: "class and session required" });
    }
    const students = await StudentService.getClassRoster(classNum, session);
    res.json({ success: true, data: students });
  }),

  // ──────────────────────────────────────────────────────────────
  // GET /students/:studentUid
  // ──────────────────────────────────────────────────────────────
  get: asyncHandler(async (req, res) => {
    const student = await StudentService.getByUid(req.params.studentUid);
    res.json({ success: true, data: student });
  }),

  // ──────────────────────────────────────────────────────────────
  // PATCH /students/:studentUid/status
  // ──────────────────────────────────────────────────────────────
  updateStatus: asyncHandler(async (req, res) => {
    const { status } = updateStatusSchema.parse(req.body);
    const student = await StudentService.updateStatus(
      req.params.studentUid,
      status
    );
    res.json({ success: true, data: student });
  }),

  // ──────────────────────────────────────────────────────────────
  // POST /students/:studentUid/promote
  // ──────────────────────────────────────────────────────────────
  promote: asyncHandler(async (req, res) => {
    const entry = promoteSchema.parse(req.body) as PromoteDTO;
    const student = await StudentService.promote(req.params.studentUid, entry);
    res.json({ success: true, data: student });
  }),

  // ──────────────────────────────────────────────────────────────
  // POST /students/bulk-promote
  // ──────────────────────────────────────────────────────────────
  bulkPromote: asyncHandler(async (req, res) => {
    const payload = bulkPromoteSchema.parse(req.body) as BulkPromoteDTO;
    const result = await StudentService.bulkPromote(payload);
    res.json({ success: true, data: result });
  }),

  // ──────────────────────────────────────────────────────────────
  // PATCH /students/:studentUid/stipend-beneficiary
  // ──────────────────────────────────────────────────────────────
  updateStipendBeneficiary: asyncHandler(async (req, res) => {
    const data = stipendBeneficiarySchema.parse(req.body)as StipendDTO;
    const student = await StudentService.updateStipendBeneficiary(
      req.params.studentUid,
      data
    );
    res.json({
      success: true,
      message: "Stipend beneficiary updated",
      data: student.stipendBeneficiary,
    });
  }),

  // ──────────────────────────────────────────────────────────────
  // GET /students/:studentUid/stipend-beneficiary
  // ──────────────────────────────────────────────────────────────
  getStipendBeneficiary: asyncHandler(async (req, res) => {
    const data = await StudentService.getStipendBeneficiary(
      req.params.studentUid
    );
    res.json({ success: true, data });
  }),

  // ──────────────────────────────────────────────────────────────
  // PATCH /students/:studentUid/image
  // ──────────────────────────────────────────────────────────────
  updateImage: asyncHandler(async (req, res) => {
    const { imageUrl, cloudinaryPublicId } = imageUploadSchema.parse(req.body);
    const student = await StudentService.updateImage(
      req.params.studentUid,
      imageUrl,
      cloudinaryPublicId
    );
    res.json({ success: true, data: { imageUrl: student.imageUrl } });
  }),
};