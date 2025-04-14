import Users from "../Users/Users";
import Permissions from './../Permissions/Permissions';

const RoleDetailsSection = () => {

  return (
    <>
      
      <div
        className="tab-pane fade show active"
        id="pills-Users"
        role="tabpanel"
        aria-labelledby="pills-Users-tab"
        tabIndex={0}
      >
        <Users/>
      </div>

      <div
        className="tab-pane fade show"
        id="pills-Permission"
        role="tabpanel"
        aria-labelledby="pills-Permission-tab"
        tabIndex={0}
      >
        <Permissions/>
      </div>
    </>
  );
};

export default RoleDetailsSection;
