import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import DynamicSectionForTabs from "../../../../Shared/DynamicSectionForTabs/DynamicSectionForTabs";
import CreateUsers from "./CreateUsers";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import { ModalContext } from "../../../../Helpers/Context/ModalContext";

const Users = () => {
  const [data, setData] = useState([]);
  const [userType, setUserType] = useState("admin");

  const { base_url } = useContext(AuthContext);
  const { showState, handleClose, setShowState } = useContext(ModalContext);
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    branchId: null,
  });
  const [editModalState, setEditModalState] = useState({
    isOpen: false,
    rowData: null,
    isEditMode: true,
  });
  const [openDropdownId, setOpenDropdownId] = useState(null);

  const handleDeleteModal = (id) => {
    setDeleteModalState({ isOpen: true, branchId: id });
  };

  const closeModal = () => setDeleteModalState({ isOpen: false, branchId: null });

  const handleEditModal = (row) => {
    const formattedData = {};
    setEditModalState({ isOpen: true, rowData: formattedData });
  };

  const closeEditModal = () => {
    setEditModalState({ isOpen: false, rowData: null });
  };

  useEffect(() => {
    const fetchData = async (type) => {
      try {
        const response = await axios.get(`${base_url}/users`, {
       
          params: {
            type: type,
            per_page: 3,
          },
        });

        if (response.status === 200 && response.data?.data?.data) {
          setData(response.data.data.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(userType);
  }, [base_url,userType]);

  const columnsConfig = [
    {
      name: "ID",
      selector: (row) => row?.id,
      sortable: true,
      visible: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      visible: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      visible: true,
    },
  ];

  const filterFn = (row) => row.name;

  return (
    <>
          {/* <Form.Group controlId="userTypeSelect" className="mb-3">
        <Form.Label>Select User Type</Form.Label>
        <Form.Control
          as="select"
          value={userType}
          onChange={(e) => setUserType(e.target.value)}
        >
          <option value="admin">Admin</option>
          <option value="leader">Leader</option>
          <option value="sales">Sales</option>
        </Form.Control>
      </Form.Group> */}
      <DynamicSectionForTabs
        data={data}
        fetchData={() => {}}
        createComponent={<CreateUsers refetch={() => {}} />}
        translationKey="Users"
        columnsConfig={columnsConfig}
        filterFn={filterFn}
      />

      {deleteModalState.isOpen && (
        <DeleteModal
          show={deleteModalState.isOpen}
          closeModal={closeModal}
        />
      )}

      {editModalState.isOpen && (
        <Modal show={editModalState.isOpen} onHide={closeEditModal} centered>
          <Modal.Header closeButton>
            <h4>Edit Branch</h4>
          </Modal.Header>
          <Modal.Body>
            <CreateUsers
              key={editModalState.rowData?.id || "new"}
              initialData={editModalState.rowData}
              isEditMode={true}
            />
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default Users;
