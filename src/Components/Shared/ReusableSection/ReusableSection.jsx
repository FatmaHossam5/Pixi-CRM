import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import GeneralTable from "../GeneralTable/GeneralTable";

const ReusableSection = ({ filterFn, getColumns, fetchData, data }) => {
  
  const { t } = useTranslation();

  



  const filteredRows = useMemo(() => {

    const rows = Array.isArray(data) ? data?.filter(filterFn) : [];

    return rows;
  }, [data, filterFn]);


  const columns = useMemo(() => getColumns(t), [t, getColumns]);



  return <GeneralTable filteredRows={filteredRows} columns={columns} fetchData={fetchData} />;
};

export default ReusableSection;
