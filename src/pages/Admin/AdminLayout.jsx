import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <div>HEADER</div>
      <Outlet />
    </>
  );
};

export default AdminLayout;
