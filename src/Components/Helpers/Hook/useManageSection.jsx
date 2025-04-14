import { useState, useCallback } from "react";
import axios from "axios";

const useManageSection = (baseUrl, entity, fetchData, showToast, t, Headers, toastMessages) => {
  const [deleteModalState, setDeleteModalState] = useState({
    isOpen: false,
    id: null,
  });
  const [editModalState, setEditModalState] = useState({
    isOpen: false,
    rowData: null,
  });
  const [branchesTags, setBranchesTags] = useState([]);
  const [collectedId, setCollectedId] = useState([]);

  const openDeleteModal = useCallback((id) => {
    setDeleteModalState({ isOpen: true, id });
  }, []);

  const closeDeleteModal = useCallback(() => {
    setDeleteModalState({ isOpen: false, id: null });
  }, []);

  const openEditModal = useCallback((rowData) => {
    setEditModalState({ isOpen: true, rowData });
  }, []);

  const closeEditModal = useCallback(() => {
    setEditModalState({ isOpen: false, rowData: null });
  }, []);

  const deleteItem = useCallback(async () => {
    const { id } = deleteModalState;
    if (!id) return;

    try {
      await axios.delete(`${baseUrl}/${entity}/${id}/delete/`, { headers: Headers });
      showToast("success", t(toastMessages.deleteSuccess || "msg.defaultDeleteSuccess"));
      fetchData();
    } catch (error) {
      showToast("error", t(toastMessages.deleteError || "msg.defaultDeleteError"));
    } finally {
      closeDeleteModal();
    }
  }, [baseUrl, entity, deleteModalState, fetchData, Headers, showToast, t, toastMessages]);
};

  const fetchBranches = useCallback(
    async (id, params, headers) => {
      try {
        const { data } = await axios.get(fetchBranchesEndpoint, {
          params: { ...params, id },
          headers,
        });
        setBranchesTags(data.map((branch) => branch.branch_info.pms_branch_en.branch_name_en));
        setCollectedId(data.map((item) => item.id));
      } catch (error) {
        console.error(`Error fetching branches from ${fetchBranchesEndpoint}:`, error);
      }
    },
    [fetchBranchesEndpoint]
  );

  return {
    deleteModalState,
    editModalState,
    branchesTags,
    collectedId,
    openDeleteModal,
    closeDeleteModal,
    openEditModal,
    closeEditModal,
    deleteItem,
    fetchBranches,
  };
};

export default useManageSection;
