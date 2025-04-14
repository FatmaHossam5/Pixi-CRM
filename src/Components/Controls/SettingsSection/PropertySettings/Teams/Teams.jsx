import React from 'react'
import DynamicSectionForTabs from '../../../../Shared/DynamicSectionForTabs/DynamicSectionForTabs'
import CreateTeam from './CreateTeam';

export default function Teams() {
    const [teamsData, setTeamsData] = React.useState([]);
    const columnsConfig = [
        {
          name: "englishName",
          visible: true,
          selector: (row) => row?.id,
          sortable: true,
          reorder: true,
          cell: (row) => (
            <div className="d-flex justify-content-between align-items-center w-100">
              <div className="w-50">{row?.id}</div>
            </div>
          ),
        },
        {
          name: "arabicName",
          sortable: true,
          visible: true,
          cell: (row) => {
            const initials = row?.name?.substring(0, 2)?.toUpperCase() || "NA";
            return (
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#d1d1d1",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: "14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {initials}
              </div>
            );
          },
        },
        {
          name: "hotel",
          selector: (row) => row.name,
          sortable: true,
          visible: true,
        },
      ];
      const filterFn = (row) => row.name !== null && row.name !== undefined;

  return (
     <DynamicSectionForTabs
           data={teamsData}
           fetchData={() => setTeamsData()}
           createComponent={<CreateTeam refetch={() => setTeamsData()} />}
           translationKey="Teams"
           columnsConfig={columnsConfig}
           filterFn={filterFn}
       
         
         />
  )
}
