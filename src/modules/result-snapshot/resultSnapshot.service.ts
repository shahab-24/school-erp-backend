import { ResultSnapshot } from "./resultSnapshot.model";

export const ResultSnapshotService = {
  async publish(payload: any) {
    if (payload.scope === "terminal" && !payload.terminalKey) {
      throw new Error("terminalKey is required for terminal scope");
    }

    const docs = payload.results.map((r: any) => ({
      schoolId: payload.schoolId,

      scope: payload.scope,

      terminalKey:
        payload.scope === "terminal" ? payload.terminalKey : undefined,

      session: payload.session,

      class: payload.class,

      studentId: r.studentId,

      academicRecordId: r.academicRecordId,

      resultConfigId: payload.resultConfigId,

      subjects: r.subjects,

      total: r.total,

      percentage: r.percentage,

      failed: r.failed,
    }));

    const inserted = await ResultSnapshot.insertMany(docs, { ordered: true });

    await this.updateRanking(
      payload.schoolId,
      payload.scope,
      payload.session,
      payload.class,
      payload.terminalKey
    );

    return inserted;
  },

  async updateRanking(
    schoolId: string,
    scope: "terminal" | "annual",
    session: string,
    classNo: number,
    terminalKey?: string
  ) {
    const filter: any = {
      schoolId,
      scope,
      session,
      class: classNo,
    };

    if (scope === "terminal") {
      filter.terminalKey = terminalKey;
    }

    const list = await ResultSnapshot.find(filter).sort({ percentage: -1 });

    for (let i = 0; i < list.length; i++) {
      list[i].position = i + 1;

      await list[i].save();
    }
  },

  async listByClass(params: {
    schoolId: string;
    scope: "terminal" | "annual";
    terminalKey?: string;
    session: string;
    class: number;
  }) {
    const q: any = {
      schoolId: params.schoolId,
      scope: params.scope,
      session: params.session,
      class: params.class,
    };

    if (params.scope === "terminal") {
      q.terminalKey = params.terminalKey;
    }

    return ResultSnapshot.find(q).sort({ position: 1 }).lean();
  },

  async getStudent(params: {
    schoolId: string;
    studentId: string;
    scope: "terminal" | "annual";
    terminalKey?: string;
    session: string;
  }) {
    const q: any = {
      schoolId: params.schoolId,
      studentId: params.studentId,
      scope: params.scope,
      session: params.session,
    };

    if (params.scope === "terminal") {
      q.terminalKey = params.terminalKey;
    }

    return ResultSnapshot.findOne(q).lean();
  },
};
