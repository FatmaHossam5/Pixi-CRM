import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import CreateContacts from "./CreateContacts";
import { AuthContext } from "../../../../context/admin/AuthContext";
import DynamicSectionForTabs from "../../../../components/Shared/navigation/DynamicSectionForTabs/DynamicSectionForTabs";
import DeleteModal from "../../../../components/Shared/feedback/DeleteModal/DeleteModal";
import { ModalContext } from "../../../../context/shared/ModalContext";

const Contacts = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const { baseUrlPms, Headers } = useContext(AuthContext);
  const { showState, handleClose, setShowState } = useContext(ModalContext);
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    branchId: null,
  });
  const [editModalState, setEditModalState] = useState({
    isOpen: false,
    rowData: null,
    isEditMode: true
  });
  const [openDropdownId, setopenDropdownId] = useState(null);



  const handleDeleteModal = (id) => {
    setDeleteModalState({ isOpen: true, branchId: id });
  };
  const closeModal = () => setDeleteModalState({ isOpen: false, branchId: null });
  const handleEditModal = (row) => {
    console.log(row);
    const formattedData = {
      // Format the data as needed
    };
    setEditModalState({ isOpen: true, rowData: formattedData });
    console.log(formattedData);
  };
  const closeEditModal = () => {
    setEditModalState({ isOpen: false, rowData: null });
    // Refetch data if needed
    setData(dummyData);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://tenant1.billiqa.com/api/clients?per_page=4`, { headers: Headers });

        if (response.data.status) {

          // Assuming API returns an array of clients inside response.data.data.data
          setData(response.data.data.data);

        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);

  const columnsConfig = [
    {
      name: "ID",
      selector: (row) => row?.id,
      sortable: true,
      // width: "100px",
      visible: true
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      // width: "200px",
      visible: true
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      // width: "250px",
      visible: true
    },
    {
      name: "Area",
      selector: (row) => row.area?.title || "-",
      sortable: true,
      visible: true,
    },
    {
      name: "Source",
      // if you just want the name (for sorting/filtering):
      selector: (row) => row.source?.name || "-",
      sortable: true,
      visible: true,
      // custom cell to show image + name
      cell: (row) =>
        row.source ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={
                // prepend protocol if not included
                row.source.image_url.startsWith("http")
                  ? row.source.image_url
                  : `https://${row.source.image_url}`
              }
              alt={row.source.name}
              style={{
                width: 32,
                height: 32,
                objectFit: "cover",
                borderRadius: "50%",
                marginRight: 8,
              }}
            />
            <span>{row?.source?.name}</span>
          </div>
        ) : (
          "-"
        ),
    },

  ];




  // filter data and egnore null values
  const filterFn = (row) => row.name;




  return (



    <>

      <DynamicSectionForTabs
        data={data}
        fetchData={() => setData()} // Refetch dummy data if needed
        createComponent={<CreateContacts refetch={() => setData()} />}
        translationKey="Contact"
        columnsConfig={columnsConfig}
        filterFn={filterFn}
      />
      {deleteModalState.isOpen && (
        <DeleteModal
          show={deleteModalState.isOpen}
          closeModal={closeModal}
        // fun={deleteHotels}
        />
      )}
      {editModalState.isOpen && (
        <Modal show={editModalState.isOpen} onHide={closeEditModal} centered >
          <Modal.Header closeButton >
            <h4>
              Edit Branch
            </h4>
          </Modal.Header>
          <Modal.Body>
            <CreateContacts
              key={editModalState.rowData?.id || "new"}
              initialData={editModalState.rowData}

              isEditMode={true}
            // fetchContactsForSelectedPaymentAccount={fetchContactsForSelectedPaymentAccount}
            // ContactsTags={ContactsTags}
            // collectedId={collectedId}
            // reset={reset}
            // setCollectedId={setCollectedId}

            />
          </Modal.Body>
        </Modal>
      )}
    </>

  );
};

export default Contacts;
