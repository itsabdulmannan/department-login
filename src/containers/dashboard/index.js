import { Route, Routes } from "react-router-dom";
import CheifEditorsDetail from "./SectionHeads/sectionHeadView";
import AllPapers from "./allPapers";
import AcceptedPaper from "./acceptedPaper";
import RejectedPaper from "./rejectedPaper";
import AssignedPaper from "./assignedPaper";
import ReviewedPaper from "./reviewedPaper";
import ProfileSetting from "./profile";
import ProtectedRoute from "routes/ProtectedRoute";
import UnauthorizedPage from "./unauthorizedPage";
import SectionHeads from "./SectionHeads";
import SectionHeadDetail from "./SectionHeads/sectionHeadView";
import AcceptedPAperDetail from "./acceptedPaper/acceptedPaperDetail";
import SectionHeadAssignedPaper from "./sectionHeadAssignedPaper";
import SectionReviewedPaper from "./sectionHeadReviewedPaper";
import ViewSectionHeadAssignd from "./assignedPaper/viewSectionAssigned";
import SectionHeadPAperDetail from "./sectionHeadReviewedPaper/paperDetail";
import ViewRejectedPaper from "./rejectedPaper/viewRejectedPaper";
import ViewReviewedPaer from "./reviewedPaper/viewReviewePaper";

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute
            element={SectionHeads}
            allowedRoles={["cheifEditor"]}
          />
        }
      />
      <Route
        path="/section-head-view"
        element={
          <ProtectedRoute
            element={SectionHeadDetail}
            allowedRoles={["cheifEditor"]}
          />
        }
      />
      <Route
        path="/all-papers"
        element={
          <ProtectedRoute element={AllPapers} allowedRoles={["cheifEditor"]} />
        }
      />
      <Route
        path="/accepted-paper"
        element={
          <ProtectedRoute
            element={AcceptedPaper}
            allowedRoles={["cheifEditor"]}
          />
        }
      />
      <Route
        path="/accepted-paper-view"
        element={
          <ProtectedRoute
            element={AcceptedPAperDetail}
            allowedRoles={["cheifEditor"]}
          />
        }
      />

      <Route
        path="/rejected-paper"
        element={
          <ProtectedRoute
            element={RejectedPaper}
            allowedRoles={["cheifEditor"]}
          />
        }
      />
          <Route
        path="/rejected-paper-detail"
        element={
          <ProtectedRoute
            element={ViewRejectedPaper}
            allowedRoles={["cheifEditor"]}
          />
        }
      />
      
      <Route
        path="/assigned-paper"
        element={
          <ProtectedRoute
            element={AssignedPaper}
            allowedRoles={["cheifEditor"]}
          />
        }
      />

      <Route
        path="/view-assigned-detail-section-head"
        element={
          <ProtectedRoute
            element={ViewSectionHeadAssignd}
            allowedRoles={["cheifEditor"]}
          />
        }
      />

      <Route
        path="/review-paper"
        element={
          <ProtectedRoute
            element={ReviewedPaper}
            allowedRoles={["cheifEditor"]}
          />
        }
      />
       <Route
        path="/review-paper-detail"
        element={
          <ProtectedRoute
            element={ViewReviewedPaer}
            allowedRoles={["cheifEditor"]}
          />
        }
      />
      
      <Route
        path="/update-profile"
        element={
          <ProtectedRoute
            element={ProfileSetting}
            allowedRoles={["cheifEditor", "sectionHead"]}
          />
        }
      />
      <Route
        path="/section-head-assigned-paper"
        element={
          <ProtectedRoute
            element={SectionHeadAssignedPaper}
            allowedRoles={["sectionHead"]}
          />
        }
      />
      <Route
        path="/section-head-review-paper"
        element={
          <ProtectedRoute
            element={SectionReviewedPaper}
            allowedRoles={["sectionHead"]}
          />
        }
      />
      <Route
        path="/section-head-paper-detail"
        element={
          <ProtectedRoute
            element={SectionHeadPAperDetail}
            allowedRoles={["sectionHead"]}
          />
        }
      />

      <Route path="/unauthorized" element={<UnauthorizedPage />} />
    </Routes>
  );
};

export default DashboardRoutes;
