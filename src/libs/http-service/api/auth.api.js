import { deleteRequest, getRequest, postRequest, putRequest } from "../methods";

export const AuthAPI = {
  // Auth api
  login: async (body) => await postRequest("auth/login-admin", body),
  resetPassword: async (body) => postRequest("auth/reset-password", body),
};

export const SectionHeadsAPI = {
  getAllSectionHeads: async (body) =>
    await getRequest("users/section-heads", body),
  createSectionHead: async (body) =>
    postRequest("users/sectionheads/create", body),
  viewSectionHead: async (params) => {
    return getRequest(`papers/assigned-papers`, params);
  },
};

export const PapersApi = {
  getAllPapers: async (params) => await getRequest("papers/fetch-papers/status", params),
  updateStatus: async (id,body) => await putRequest(`papers/updateStatus/${id}`,body),
  getAcceptedPaper : async (params) => await getRequest("papers/fetch-papers/status", params),
  getRejectedPaper : async (params) => await getRequest("papers/fetch-papers/status", params),
  updateAssignedPaperStatus : async (params) => await getRequest("papers/fetch-papers/status", params),
  getReviewedPaper : async (params) => await getRequest("papers/fetch-papers/status", params),
}
