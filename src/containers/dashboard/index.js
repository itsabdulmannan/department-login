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


const DashboardRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<ProtectedRoute element={SectionHeads} allowedRoles={["cheifEditor"]} />}
      />
      <Route
        path="/section-head-view"
        element={<ProtectedRoute element={SectionHeadDetail} allowedRoles={["cheifEditor"]} />}
      />
      <Route
        path="/all-papers"
        element={<ProtectedRoute element={AllPapers} allowedRoles={["cheifEditor"]} />}
      />
      <Route
        path="/accepted-paper"
        element={<ProtectedRoute element={AcceptedPaper} allowedRoles={["cheifEditor"]} />}
      />
      <Route
        path="/rejected-paper"
        element={<ProtectedRoute element={RejectedPaper} allowedRoles={["cheifEditor"]} />}
      />
      <Route
        path="/assigned-paper"
        element={<ProtectedRoute element={AssignedPaper} allowedRoles={["cheifEditor", "sectionHead"]} />}
      />
      <Route
        path="/review-paper"
        element={<ProtectedRoute element={ReviewedPaper} allowedRoles={["cheifEditor", "sectionHead"]} />}
      />
      <Route
        path="/update-profile"
        element={<ProtectedRoute element={ProfileSetting} allowedRoles={["cheifEditor", "sectionHead"]} />}
      />
         <Route
        path="/unauthorized"
        element={< UnauthorizedPage/>}
      />
    </Routes>
  );
};

export default DashboardRoutes;
