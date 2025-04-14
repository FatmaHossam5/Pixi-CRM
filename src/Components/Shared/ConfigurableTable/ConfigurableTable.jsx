import React, { useEffect } from 'react'
import ReusableSection from '../ReusableSection/ReusableSection'

export default function ConfigurableTable({ data, fetchData, filterFn = (row) => true, getColumns, endpoint }) {
  console.log(data);
  console.log(getColumns);
  
  return(
    <>
        <ReusableSection
    data={data}
    filterFn={filterFn}
    getColumns={getColumns}
    endpoint={endpoint}
    fetchData={fetchData}
  />
    </>
  )
  

}

  