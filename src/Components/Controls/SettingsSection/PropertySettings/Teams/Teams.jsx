// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../../../Helpers/Context/AuthContext";
// import { ModalContext } from "../../../../Helpers/Context/ModalContext";
// import usePipeline from "../../../../Helpers/Hook/usePipeline";
// import AddFormOffcanvas from "../../../../Shared/AddFormOffcanvas/AddFormOffcanvas";
// import DynamicSectionForTabs from "../../../../Shared/DynamicSectionForTabs/DynamicSectionForTabs";
// import TooltipIcon from "../../../../Shared/Tooltip/TooltipIcon";
// import CreateTeam from "./CreateTeam";
// import axios from "axios";

// const Team = () => {
//   const [teamData, setTeamData] = useState([]);
//   const [selectedLead, setSelectedLead] = useState(null);
//   const [viewMode, setViewMode] = useState(localStorage.getItem("team_view_mode") || "table");
//    const { setShowState, showState } = useContext(ModalContext);
//    const { base_url, Headers } = useContext(AuthContext);
//    const { pipeline } = usePipeline()

//   const [stagesMeta, setStagesMeta] = useState([
//     { name: "New Lead", color: "#007bff" },
//     { name: "Hot Lead", color: "#fd7e14" },
//     { name: "New Booking", color: "#28a745" },
//     { name: "Visit Attended", color: "#6f42c1" },
//     { name: "New Lead", color: "#007bff" },
//     { name: "Hot Lead", color: "#fd7e14" },
//     { name: "New Booking", color: "#28a745" },
//     { name: "Visit Attended", color: "#6f42c1" },
//   ]);
//   console.log("📦 viewMode:", viewMode);

//   useEffect(() => {
//     const dummyTeams = [
//       { id: 1, name: "Ahmed Khaled", stage: "New Lead", value: "$5000", status: "Pending" },
//       { id: 2, name: "Sara Mohamed", stage: "Hot Lead", value: "$12000", status: "Interested" },
//       { id: 3, name: "Omar Ali", stage: "New Booking", value: "$9000", status: "Confirmed" },
//       { id: 4, name: "Fatma Youssef", stage: "Visit Attended", value: "$3000", status: "Follow-up" },
//       { id: 5, name: "Ali Hassan", stage: "Hot Lead", value: "$4500", status: "Negotiation" },

//     ];
//     setTeamData(dummyTeams);
//   }, []);
//   useEffect(() => {
//     const fetchTeams = async () => {
//       try {
//         const response = await axios.get(`${base_url}/teams`, {
//           headers: Headers,
//           params: {
//             per_page: 3,
//           },
//         });

//         if (response.status === 200 && response.data?.data?.data) {
//           const formattedTeams = response.data.data.data.map(team => ({
//             id: team.id,
//             name: team.title,
//             stage: "New Lead", // Default stage since API doesn't provide
//             value: "$0", // Default value, adjust if needed
//             leader: team.leader?.name || "-",
//             source: team.source?.name || "-",
//             location: team.location?.title || "-",
//             sales: team.sales?.data || [],
//           }));
//           setTeamData(formattedTeams);
//         }
//       } catch (error) {
//         console.error("Error fetching teams:", error);
//       }
//     };

//     fetchTeams();
//   }, [base_url, Headers]);










//   useEffect(() => {
//     localStorage.setItem("team_view_mode", viewMode);
//   }, [viewMode]);
//   const statusStyles = {
//     Pending: "bg-gray-200 text-gray-700",
//     Interested: "bg-blue-200 text-blue-800",
//     Confirmed: "bg-green-200 text-green-800",
//     "Follow-up": "bg-purple-200 text-purple-800",
//     Negotiation: "bg-orange-200 text-orange-800",
//   };


//   console.log(pipeline);





//   const columnsConfig = [
//     {
//       name: "englishName",
//       visible: true,
//       selector: (row) => row?.id,
//       sortable: true,
//       reorder: true,
//       cell: (row) => (
//         <div className="d-flex justify-content-between align-items-center w-100">
//           <div className="w-50">{row?.id}</div>
//         </div>
//       ),
//     },
//     {
//       name: "arabicName",
//       sortable: true,
//       visible: true,
//       cell: (row) => {
//         const initials = row?.name?.substring(0, 2)?.toUpperCase() || "NA";
//         return (
//           <div
//             style={{
//               width: "40px",
//               height: "40px",
//               borderRadius: "50%",
//               backgroundColor: "#d1d1d1",
//               color: "#fff",
//               fontWeight: "bold",
//               fontSize: "14px",
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "center",
//             }}
//           >
//             {initials}
//           </div>
//         );
//       },
//     },
//     {
//       name: "hotel",
//       selector: (row) => row.name,
//       sortable: true,
//       visible: true,
//     },
//   ];

//     // New function to handle editing; it saves the selected lead data and then opens the offcanvas
//     const handleEditLead = (lead, e) => {
//       // Prevent parent onClick if you have icons that need to work separately
//       if (e) e.stopPropagation();
//       setSelectedLead(lead);
//       setShowState("contact lead");
//     };
  
//   const handleShowTaskForm = () => {
//     setShowState("TaskForm");
//   };

//   const renderKanban = () => (

//     <>


//       <div className="d-flex  gap-3 " style={{
//         display: "flex",
//         gap: "16px",
//         overflowX: "scroll",
//         marginLeft: "24px",
//         cursor: "grab",
//         scrollbarWidth: "none",       // Firefox
//         msOverflowStyle: "none",

//       }}
//         onMouseDown={(e) => {
//           const container = e.currentTarget;
//           container.isDown = true;
//           container.startX = e.pageX - container.offsetLeft;
//           container.scrollLeftStart = container.scrollLeft;
//           container.classList.add("dragging");
//         }}
//         onMouseLeave={(e) => {
//           e.currentTarget.isDown = false;
//           e.currentTarget.classList.remove("dragging");
//         }}
//         onMouseUp={(e) => {
//           e.currentTarget.isDown = false;
//           e.currentTarget.classList.remove("dragging");
//         }}
//         onMouseMove={(e) => {
//           const container = e.currentTarget;
//           if (!container.isDown) return;
//           e.preventDefault();
//           const x = e.pageX - container.offsetLeft;
//           const walk = (x - container.startX) * 1.2;
//           container.scrollLeft = container.scrollLeftStart - walk;
//         }}>
//         {stagesMeta.map((stage) => {
//           const leadsInStage = teamData.filter((lead) => lead.stage === stage.name);
//           return (
//             <div
//               key={stage.name}

             

//             >
//               <div className="rounded  shadow bg-white " style={{ borderTop: `4px solid ${stage.color}` }}>
//                 <h2 className="text-md font-semibold  "
//                   style={{ width: "280px", minHeight: "64px", }}
//                 >
//                   {stage.name}
//                 </h2>
//               </div>

//               {leadsInStage.length === 0 ? (
//                 <p className="text-sm text-gray-400 italic">No leads in this stage</p>
//               ) : (
//                 leadsInStage.map((lead, idx) => (
//                   <div
//                     key={idx}
//                     className="p-3 mb-3 rounded bg-white shadow-sm border"
//                     style={{ width: "280px", minHeight: "108px", cursor: "pointer" }}
//                     onClick={(e) => handleEditLead(lead, e)}
//                   >
//                     <div className="d-flex  align-items-center lead-card">
//                       <p className="font-semibold text-sm text-gray-800 ">{lead.name}</p>
//                       <div className="justify-content-end  ms-auto">
//                         <p className=""
//                           style={{
//                             width: "40px",
//                             height: "40px",
//                             borderRadius: "50%",
//                             backgroundColor: "#EBEBEB",
//                             color: "#707070",
//                             fontWeight: "bold",
//                             fontSize: "14px",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             border: "1px solid #707070",
//                           }}
//                         >
//                           AG
//                         </p>
//                       </div>

//                     </div>
//                     <p className="text-xs text-gray-600" style={{
//                       color: "#707070",

//                       fontWeight: "500",
//                       lineHeight: "20px",
//                     }}>opportunity value: {lead.value}</p>
//                     <div className="text-xs text-gray-500 d-flex gap-3">
//                       <TooltipIcon iconClass="fa-clipboard-list" label="Task"    onClick={(e) => {
//                         e.stopPropagation();
//                         handleShowTaskForm()
//                         }}      />
//                       <TooltipIcon iconClass="fa-comment" label="WhatsApp Message" />
//                       <TooltipIcon iconClass="fa-calendar-clock" label="Appointment" />
//                       <TooltipIcon iconClass="fa-memo" label="Proposal" />
//                       <TooltipIcon iconClass="fa-file" label="Note" style={{ rotate: "-180deg" }} />

//                     </div>

                 
//                   </div>
//                 ))
//               )}
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
//   // filter data and egnore null values
//   const filterFn = (row) => row.name !== null && row.name !== undefined;


//   const viewToggleButtons = (
//     <div className="d-flex gap-2 ms-auto">

//       <button
//         className={`btn  ${viewMode === "board" ? "  btn-primary" : "btn-outline-secondary"}`}
//         onClick={() => setViewMode("board")}
//       >
//         <i className="fa-light fa-grid" />
//       </button>
//       <button
//         className={`btn  ${viewMode === "table" ? " btn-primary" : "btn-outline-secondary"}`}
//         onClick={() => setViewMode("table")}
//       >
//         <i className="fa-solid fa-bars" />

//       </button>
//     </div>
//   );


//   return (
//     <>

//       <DynamicSectionForTabs
//         data={teamData}
//         fetchData={() => setTeamData()}
//         createComponent={<CreateTeam refetch={() => setTeamData()} />}
//         translationKey="Team"
//         columnsConfig={columnsConfig}
//         filterFn={filterFn}
//         customContent={viewMode === "board" ? renderKanban() : null}
//         viewMode={viewMode}
//         extraHeaderControls={viewToggleButtons}
//         customPipelineDiv={
//           <div className="text-muted small mt-2 px-5 d-flex gap-2 align-items-center">
//             <select name="" id="" style={{ width: "400px", height: "48px" }} className="form-select form-select-sm" aria-label="Default select example">
//               <option value="">Select Pipeline</option>
//               {pipeline?.map((item) => (
//                 <option key={item?.id} value={item?.id}>
//                   {item?.name}
//                 </option>
//               ))}

//             </select>
//             <div className="py-1" style={{ width: "160px", backgroundColor: "#1877F21A",border:"1px solid transparent", borderRadius:'20px' ,   textAlign: "center"  }} >
//               <h4 style={{ margin: 0 }} className="px-1">6 Opportunity</h4>
//             </div>
//           </div>
//         }
//       />
  
//    <AddFormOffcanvas
//         name="contact lead"
//         showState={showState}
//         handleClose={() => {
//           setShowState(null);
//           setSelectedLead(null);
//         }}
//         title="Contact lead"
//         // Pass the selected lead data as prop "initialData" for CreateLead
//         formComponent={<CreateTeam initialData={selectedLead} />}
//       />
//     </>
//   );
// };

// export default Team;

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../Helpers/Context/AuthContext";
import { ModalContext } from "../../../../Helpers/Context/ModalContext";
import usePipeline from "../../../../Helpers/Hook/usePipeline";
import AddFormOffcanvas from "../../../../Shared/AddFormOffcanvas/AddFormOffcanvas";
import DynamicSectionForTabs from "../../../../Shared/DynamicSectionForTabs/DynamicSectionForTabs";
import TooltipIcon from "../../../../Shared/Tooltip/TooltipIcon";
import CreateTeam from "./CreateTeam";
import axios from "axios";

const Team = () => {
  const [teamData, setTeamData] = useState([]);
  const [selectedLead, setSelectedLead] = useState(null);
  const [viewMode, setViewMode] = useState(localStorage.getItem("team_view_mode") || "table");
  const { setShowState, showState } = useContext(ModalContext);
  const { base_url, Headers } = useContext(AuthContext);

  const { pipeline } = usePipeline();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(`${base_url}/teams`, {
          headers: Headers,
          params: { per_page: 3 },
        });
  
        if (response.status === 200 && response.data?.data?.data) {
          const formattedTeams = response.data.data.data.map(team => ({
            id: team.id,
            name: team.title,
            leaderName: team.leader?.name || "-",
            sourceName: team.source?.name || "-",
            locationName: team.location?.title || "-",
            salesTypes: team.sales?.data?.map(sale => sale.type).join(", ") || "-",             stage: "New Lead", // still dummy stage
            value: "$0", // still dummy value
          }));
          setTeamData(formattedTeams);
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };
  
    fetchTeams();
  }, [base_url, Headers]);
  

  useEffect(() => {
    localStorage.setItem("team_view_mode", viewMode);
  }, [viewMode]);

  const statusStyles = {
    Pending: "bg-gray-200 text-gray-700",
    Interested: "bg-blue-200 text-blue-800",
    Confirmed: "bg-green-200 text-green-800",
    "Follow-up": "bg-purple-200 text-purple-800",
    Negotiation: "bg-orange-200 text-orange-800",
  };

  const columnsConfig = [
    {
      name: "Leader",
      selector: (row) => row?.leaderName,
      sortable: true,
      visible: true,
    },
    {
      name: "Team Title",
      selector: (row) => row?.name,
      sortable: true,
      visible: true,
    },
    {
      name: "Leader",
      selector: (row) => row?.salesTypes,
      sortable: true,
      visible: true,
    }
  ];
  
  const handleEditLead = (lead, e) => {
    if (e) e.stopPropagation();
    setSelectedLead(lead);
    setShowState("contact lead");
  };

  const handleShowTaskForm = () => {
    setShowState("TaskForm");
  };

  const renderKanban = () => (
    <div
      className="d-flex gap-3"
      style={{
        display: "flex",
        gap: "16px",
        overflowX: "scroll",
        marginLeft: "24px",
        cursor: "grab",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
      onMouseDown={(e) => {
        const container = e.currentTarget;
        container.isDown = true;
        container.startX = e.pageX - container.offsetLeft;
        container.scrollLeftStart = container.scrollLeft;
        container.classList.add("dragging");
      }}
      onMouseLeave={(e) => {
        e.currentTarget.isDown = false;
        e.currentTarget.classList.remove("dragging");
      }}
      onMouseUp={(e) => {
        e.currentTarget.isDown = false;
        e.currentTarget.classList.remove("dragging");
      }}
      onMouseMove={(e) => {
        const container = e.currentTarget;
        if (!container.isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - container.startX) * 1.2;
        container.scrollLeft = container.scrollLeftStart - walk;
      }}
    >
      {[...new Set(teamData.map((item) => item.stage))].map((stage) => {
        const leadsInStage = teamData.filter((lead) => lead.stage === stage);
        return (
          <div key={stage}>
            <div className="rounded shadow bg-white" style={{ borderTop: `4px solid #007bff` }}>
              <h2 className="text-md font-semibold" style={{ width: "280px", minHeight: "64px" }}>
                {stage}
              </h2>
            </div>

            {leadsInStage.length === 0 ? (
              <p className="text-sm text-gray-400 italic">No leads in this stage</p>
            ) : (
              leadsInStage.map((lead, idx) => (
                <div
                  key={idx}
                  className="p-3 mb-3 rounded bg-white shadow-sm border"
                  style={{ width: "280px", minHeight: "108px", cursor: "pointer" }}
                  onClick={(e) => handleEditLead(lead, e)}
                >
                  <div className="d-flex align-items-center lead-card">
                    <p className="font-semibold text-sm text-gray-800">{lead.name}</p>
                    <div className="justify-content-end ms-auto">
                      <p
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          backgroundColor: "#EBEBEB",
                          color: "#707070",
                          fontWeight: "bold",
                          fontSize: "14px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid #707070",
                        }}
                      >
                        AG
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600" style={{ color: "#707070", fontWeight: "500", lineHeight: "20px" }}>
                    opportunity value: {lead.value}
                  </p>
                  <div className="text-xs text-gray-500 d-flex gap-3">
                    <TooltipIcon iconClass="fa-clipboard-list" label="Task" onClick={(e) => { e.stopPropagation(); handleShowTaskForm(); }} />
                    <TooltipIcon iconClass="fa-comment" label="WhatsApp Message" />
                    <TooltipIcon iconClass="fa-calendar-clock" label="Appointment" />
                    <TooltipIcon iconClass="fa-memo" label="Proposal" />
                    <TooltipIcon iconClass="fa-file" label="Note" style={{ rotate: "-180deg" }} />
                  </div>
                </div>
              ))
            )}
          </div>
        );
      })}
    </div>
  );

  const filterFn = (row) => row.name !== null && row.name !== undefined;

  const viewToggleButtons = (
    <div className="d-flex gap-2 ms-auto">
      <button
        className={`btn ${viewMode === "board" ? "btn-primary" : "btn-outline-secondary"}`}
        onClick={() => setViewMode("board")}
      >
        <i className="fa-light fa-grid" />
      </button>
      <button
        className={`btn ${viewMode === "table" ? "btn-primary" : "btn-outline-secondary"}`}
        onClick={() => setViewMode("table")}
      >
        <i className="fa-solid fa-bars" />
      </button>
    </div>
  );

  return (
    <>
      <DynamicSectionForTabs
        data={teamData}
        fetchData={() => {}}
        createComponent={<CreateTeam refetch={() => {}} />}
        translationKey="Team"
        columnsConfig={columnsConfig}
        filterFn={filterFn}
        customContent={viewMode === "board" ? renderKanban() : null}
        viewMode={viewMode}
        extraHeaderControls={viewToggleButtons}
        customPipelineDiv={
          <div className="text-muted small mt-2 px-5 d-flex gap-2 align-items-center">
            <select
              style={{ width: "400px", height: "48px" }}
              className="form-select form-select-sm"
              aria-label="Default select example"
            >
              <option value="">Select Pipeline</option>
              {pipeline?.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.name}
                </option>
              ))}
            </select>
            <div
              className="py-1"
              style={{ width: "160px", backgroundColor: "#1877F21A", border: "1px solid transparent", borderRadius: "20px", textAlign: "center" }}
            >
              <h4 style={{ margin: 0 }} className="px-1">
                6 Opportunity
              </h4>
            </div>
          </div>
        }
      />

      <AddFormOffcanvas
        name="contact lead"
        showState={showState}
        handleClose={() => {
          setShowState(null);
          setSelectedLead(null);
        }}
        title="Contact lead"
        formComponent={<CreateTeam initialData={selectedLead} />}
      />
    </>
  );
};

export default Team;
