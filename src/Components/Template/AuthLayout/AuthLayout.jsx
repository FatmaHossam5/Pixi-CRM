import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <>
      <div class="px-wrapper text-capitalize">
        <div class="container-fluid gx-0">
          <div class="row gx-0">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}

export default AuthLayout;
