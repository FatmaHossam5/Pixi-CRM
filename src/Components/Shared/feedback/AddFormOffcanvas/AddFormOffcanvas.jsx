import i18next from "i18next";
import { Offcanvas } from "react-bootstrap";

const AddFormOffcanvas = ({
    showState,
    handleClose,
    formComponent,
    title,
    name,
    status,

}) => {
    const isRTL = i18next.language === "ar";
    return (
        <Offcanvas
            dir={isRTL ? "rtl" : "ltr"}
            // show={showState === name || status === name}
            show={showState === name}
            onHide={handleClose}
            placement="end"
            backdrop={false}
            scroll={true} //scroll body
            keyboard={false}
            style={{
                width: "560px",
                paddingTop: "48px",
                paddingRight: "15px",
                paddingLeft: "32px",
                // paddingBottom: "32px",
                borderTopLeftRadius: "15px",
                borderBottomLeftRadius: "15px",
            }}
        >
            <Offcanvas.Header closeButton
               
            >
                <Offcanvas.Title>
                    <h4 >{title}</h4>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body >
                {formComponent}
            </Offcanvas.Body>
        </Offcanvas>
    );
};


export default AddFormOffcanvas


// import React, { useState, useEffect } from "react";
// import i18next from "i18next";
// import { Offcanvas, Button } from "react-bootstrap";

// const AddFormOffcanvas = ({
//   showState,
//   handleClose,
//   formComponent,
//   title,
//   name,
//   status,
//   nestedOffcanvasContent,
// }) => {
//   const isRTL = i18next.language === "ar";
//   const [activeLayer, setActiveLayer] = useState("main");
//   const [showNested, setShowNested] = useState(false);

//   // Reset to main layer when nested closes
//   useEffect(() => {
//     if (!showNested) setActiveLayer("main");
//   }, [showNested]);

//   const handleMainClick = () => {
//     if (showNested) setActiveLayer("main");
//   };

//   const handleNestedClick = () => {
//     setActiveLayer("nested");
//   };

//   const handleNestedClose = () => {
//     setShowNested(false);
//   };

//   const handleNestedShow = (e) => {
//     e.stopPropagation();
//     setShowNested(true);
//     setActiveLayer("nested");
//   };

//   return (
//     <>
//       {/* Main Offcanvas */}
//       <Offcanvas
//         dir={isRTL ? "rtl" : "ltr"}
//         show={showState === name || status === name}
//         onHide={handleClose}
//         placement="end"
//         backdrop={false}
//         scroll={true}
//         keyboard={false}
//         onClick={handleMainClick}
//         style={{
//           width: "720px",
//           transform: activeLayer === "main" ? "translateX(0)" : "translateX(-80px)",
//           transition: "transform 0.3s ease",
//           zIndex: activeLayer === "main" ? 1050 : 1040,
//           paddingTop: "56px",
//           paddingRight: "32px",
//           paddingLeft: "32px",
//           borderRadius: "15px 0 0 15px",
//         }}
//       >
//         <Offcanvas.Header closeButton>
//           <Offcanvas.Title>
//             <h4>{title}</h4>
//           </Offcanvas.Title>
//         </Offcanvas.Header>
//         <Offcanvas.Body>
//           {formComponent}
//           {nestedOffcanvasContent && (
//             <Button 
//               variant="primary" 
//               onClick={(e) => {
//                 e.stopPropagation();
//                 handleNestedShow(e);
//               }}
//             >
//               Open Nested
//             </Button>
//           )}
//         </Offcanvas.Body>
//       </Offcanvas>

//       {/* Nested Offcanvas */}
//       {nestedOffcanvasContent && (
//         <Offcanvas
//           dir={isRTL ? "rtl" : "ltr"}
//           show={showNested}
//           onHide={handleNestedClose}
//           placement="end"
//           backdrop={false}
//           scroll={true}
//           keyboard={false}
//           onClick={handleNestedClick}
//           style={{
//             width: "720px",
//             transform: activeLayer === "nested" 
//               ? "translateX(0)" 
//               : "translateX(-80px)",
//             transition: "transform 0.5s ease",
//             zIndex: activeLayer === "nested" ? 1050 : 1040,
//             paddingTop: "56px",
//             paddingRight: "32px",
//             paddingLeft: "32px",
//             borderRadius: "15px 0 0 15px",
//             position: "fixed",
//             right: 0,
//             // Visual differentiation
//             boxShadow: "-4px 0 12px rgba(0,0,0,0.1)",
//             borderLeft: "1px solid #ddd"
//           }}
//         >
//           <Offcanvas.Header closeButton>
//             <Offcanvas.Title>
//               <h4>Nested Offcanvas</h4>
//             </Offcanvas.Title>
//           </Offcanvas.Header>
//           <Offcanvas.Body>{nestedOffcanvasContent}</Offcanvas.Body>
//         </Offcanvas>
//       )}
//     </>
//   );



// };

// export default AddFormOffcanvas;

// import React, { useState } from "react";
// import i18next from "i18next";
// import { Offcanvas, Button } from "react-bootstrap";

// const AddFormOffcanvas = ({
//     showState,
//     handleClose,
//     formComponent,
//     title,
//     name,
//     status,
//     nestedContents,
// }) => {
//     const isRTL = i18next.language === "ar";
//     const [layers, setLayers] = useState([{ id: "main", key: "main" }]);
//     const OFFCANVAS_WIDTH = 720;
//     const LAYER_OFFSET = 80;

//     const getNestedContent = (nestKey) => {
//         return nestedContents?.[nestKey] || {
//             title: nestKey,
//             content: <div>Missing content for {nestKey}</div>
//         };
//     };

//     const handleOpenNested = (nestKey) => {
//         setLayers(prev => [...prev, { id: nestKey, key: `${nestKey}-${Date.now()}` }]);
//     };

//     const handleActivateLayer = (layerId) => {
//         setLayers(prev => {
//             const layerIndex = prev.findIndex(l => l.id === layerId);
//             if (layerIndex === -1) return prev;
//             const newLayers = [...prev];
//             const [activatedLayer] = newLayers.splice(layerIndex, 1);
//             return [...newLayers, activatedLayer];
//         });
//     };

//     const handleCloseLayer = (layerId) => {
//         setLayers(prev => prev.filter(l => l.id !== layerId));
//     };

//     return (
//         <>
//             {/* Main Offcanvas */}
//             <Offcanvas
//                 dir={isRTL ? "rtl" : "ltr"}
//                 show={showState === name || status === name}
//                 onHide={handleClose}
//                 placement="end"
//                 backdrop={false}
//                 onClick={() => handleActivateLayer("main")}
//                 style={{
//                     width: `${OFFCANVAS_WIDTH}px`,
//                     transform: `translateX(${(layers.length - 1) * -LAYER_OFFSET}px)`,
//                     transition: "transform 0.3s ease",
//                     zIndex: 1050 + layers.findIndex(l => l.id === "main"),
//                     paddingTop: "56px",
//                     borderRadius: "15px 0 0 15px",
//                     position: 'fixed',
//                     boxShadow: '-4px 0 12px rgba(0,0,0,0.1)',
//                 }}
//             >
//                 <Offcanvas.Header closeButton>
//                     <Offcanvas.Title><h4>{title}</h4></Offcanvas.Title>
//                 </Offcanvas.Header>
//                 <Offcanvas.Body>
//                     {formComponent}
//                     {nestedContents && Object.keys(nestedContents).map((nestKey) => (
//                         <Button
//                             key={nestKey}
//                             variant="primary"
//                             className="me-2 mt-2"
//                             onClick={(e) => {
//                                 e.stopPropagation();
//                                 handleOpenNested(nestKey);
//                             }}
//                         >
//                             {getNestedContent(nestKey).title}
//                         </Button>
//                     ))}
//                 </Offcanvas.Body>
//             </Offcanvas>

//             {/* Nested Offcanvases */}
//             {layers
//                 .filter(layer => layer.id !== "main")
//                 .map((layer, index) => {
//                     const content = getNestedContent(layer.id);
//                     const layerPosition = layers.findIndex(l => l.id === layer.id);
//                     const totalLayers = layers.length;

//                     return (
//                         <Offcanvas
//                             key={layer.key}
//                             dir={isRTL ? "rtl" : "ltr"}
//                             show={true}
//                             onHide={() => handleCloseLayer(layer.id)}
//                             placement="end"
//                             backdrop={false}
//                             onClick={() => handleActivateLayer(layer.id)}
//                             style={{
//                                 width: `${OFFCANVAS_WIDTH}px`,
//                                 transform: `translateX(${(totalLayers - layerPosition - 1) * -LAYER_OFFSET}px)`,
//                                 transition: "transform 0.3s ease",
//                                 zIndex: 1050 + layerPosition,
//                                 paddingTop: "56px",
//                                 borderRadius: "15px 0 0 15px",
//                                 boxShadow: '-4px 0 12px rgba(0,0,0,0.1)',
//                                 position: 'fixed',
//                             }}
//                         >
//                             <Offcanvas.Header closeButton>
//                                 <Offcanvas.Title>
//                                     <h4>{content.title}</h4>
//                                 </Offcanvas.Title>
//                             </Offcanvas.Header>
//                             <Offcanvas.Body>
//                                 {content.content}

//                                 {content.nested && Object.keys(content.nested).map((subKey) => (
//                                     <Button
//                                         key={subKey}
//                                         variant="secondary"
//                                         className="mt-2 me-2"
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             handleOpenNested(subKey);
//                                         }}
//                                     >
//                                         {content.nested[subKey].title}
//                                     </Button>
//                                 ))}
//                             </Offcanvas.Body>
//                         </Offcanvas>
//                     );
//                 })}
//         </>
//     );
// };

// export default AddFormOffcanvas;


// import React, { useEffect } from "react";
// import i18next from "i18next";
// import { Offcanvas, Button } from "react-bootstrap";
// import useLayerStore from "../useLayerStore";


// // const AddFormOffcanvas = ({ nestedContents }) => {
// //     const { layers, openLayer, closeLayer, activateLayer } = useLayerStore();
// //     const OFFSET = 80;

// //     const getContent = (id) => {
// //       if (id === 'main') return { 
// //         title: 'Main Panel', 
// //         content: <div>Main Content</div> 
// //       };
// //       return nestedContents?.[id] || { title: id, content: `Content for ${id}` };
// //     };

// //     return (
// //       <>
// //         {layers.map((layer, index) => {
// //           const { title, content } = getContent(layer.id);
// //           const zIndex = 1050 + index;
// //           const translateX = (layers.length - index - 1) * -OFFSET;

// //           return (
// //             <Offcanvas
// //               key={layer.id}
// //               show={true}
// //               onHide={() => layer.id !== 'main' && closeLayer(layer.id)}
// //               placement="end"
// //               backdrop={false}
// //               onClick={() => activateLayer(layer.id)}
// //               style={{
// //                 transform: `translateX(${translateX}px)`,
// //                 zIndex,
// //                 width: '720px',
// //                 transition: 'all 0.3s ease',
// //               }}
// //             >
// //               <Offcanvas.Header closeButton={layer.id !== 'main'}>
// //                 <Offcanvas.Title>{title}</Offcanvas.Title>
// //               </Offcanvas.Header>
// //               <Offcanvas.Body>
// //                 {content}
// //                 {layer.id === 'main' && (
// //                   Object.keys(nestedContents || {}).map((key) => (
// //                     <Button
// //                       key={key}
// //                       className="m-2"
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         openLayer(key);
// //                       }}
// //                     >
// //                       {getContent(key).title}
// //                     </Button>
// //                   ))
// //                 )}
// //                 {layer.id !== 'main' && getContent(layer.id).nested && (
// //                   Object.keys(getContent(layer.id).nested).map((key) => (
// //                     <Button
// //                       key={key}
// //                       className="m-2"
// //                       onClick={(e) => {
// //                         e.stopPropagation();
// //                         openLayer(key);
// //                       }}
// //                     >
// //                       {getContent(key).title}
// //                     </Button>
// //                   ))
// //                 )}
// //               </Offcanvas.Body>
// //             </Offcanvas>
// //           );
// //         })}
// //       </>
// //     );
// // }

// const AddFormOffcanvas = ({ showMain, onClose, nestedContents }) => {

//     const { layers, openLayer, closeLayer, activateLayer } = useLayerStore();
//     const OFFSET = 80;

//     // Sync main panel visibility with store
//     useEffect(() => {
//         if (showMain && !layers.some(l => l.id === 'main')) {
//             openLayer('main');
//         }
//     }, [showMain]);

//     const getContent = (id) => {
//         if (id === 'main') return {
//             title: 'Main Panel',
//             content: <div>Main Content</div>
//         };
//         return nestedContents?.[id] || { title: id, content: `Content for ${id}` };
//     };

//     return (
//         <>
//             {layers.map((layer, index) => {
//                 const { title, content } = getContent(layer.id);
//                 const zIndex = 1050 + index;
//                 const translateX = (layers.length - index - 1) * -OFFSET;

//                 return (
//                     <Offcanvas
//                         key={layer.id}
//                         show={true}
//                         onHide={() => {
//                             if (layer.id === 'main') {
//                                 onClose();
//                                 closeLayer('main');
//                             } else {
//                                 closeLayer(layer.id);
//                             }
//                         }}
//                         placement="end"
//                         backdrop={false}
//                         onClick={() => activateLayer(layer.id)}
//                         style={{
//                             transform: `translateX(${translateX}px)`,
//                             zIndex,
//                             width: '720px',
//                             transition: 'all 0.3s ease',
//                         }}
//                     >
//                         <Offcanvas.Header closeButton>
//                             <Offcanvas.Title>{title}</Offcanvas.Title>
//                         </Offcanvas.Header>
//                         <Offcanvas.Body>
//                             {content}
//                             {layer.id === 'main' && (
//                                 Object.keys(nestedContents || {}).map((key) => (
//                                     <Button
//                                         key={key}
//                                         className="m-2"
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             openLayer(key);
//                                         }}
//                                     >
//                                         {getContent(key).title}
//                                     </Button>
//                                 ))
//                             )}
//                             {layer.id !== 'main' && getContent(layer.id).nested && (
//                                 Object.keys(getContent(layer.id).nested).map((key) => (
//                                     <Button
//                                         key={key}
//                                         className="m-2"
//                                         onClick={(e) => {
//                                             e.stopPropagation();
//                                             openLayer(key);
//                                         }}
//                                     >
//                                         {getContent(key).title}
//                                     </Button>
//                                 ))
//                             )}
//                         </Offcanvas.Body>
//                     </Offcanvas>
//                 );
//             })}
//         </>
//     );
// };

// export default AddFormOffcanvas;
// components/AddFormOffcanvas.jsx
// import { useEffect } from 'react';
// import i18next from 'i18next';
// import { Offcanvas, Button } from 'react-bootstrap';
// import useLayerStore from "../useLayerStore";

// // const AddFormOffcanvas = ({
// //   showState,
// //   handleClose,
// //   formComponent,
// //   title,
// //   name,
// //   status,
// //   nestedContents,
// // }) => {
// //   const isRTL = i18next.language === "ar";
// //   const { layers, openLayer, closeLayer, activateLayer } = useLayerStore();
// //   const OFFSET = 80;

// //   // Sync with external state
// //   useEffect(() => {
// //     const shouldShow = showState === name || status === name;
// //     if (shouldShow && !layers.some(l => l.id === 'main')) {
// //       openLayer('main');
// //     }
// //   }, [showState, status, name]);

// //   const getContent = (id) => {
// //     if (id === 'main') return {
// //       title,
// //       content: formComponent,
// //       nested: nestedContents
// //     };
// //     return nestedContents?.[id] || { 
// //       title: id, 
// //       content: `Content for ${id}`,
// //       nested: null 
// //     };
// //   };

// //   return (
// //     <>
// //       {layers.map((layer, index) => {
// //         const { title, content } = getContent(layer.id);
// //         const zIndex = 1050 + index;
// //         const translateX = (layers.length - index - 1) * -OFFSET;

// //         return (
// //           <Offcanvas
// //             key={layer.id}
// //             dir={isRTL ? "rtl" : "ltr"}
// //             show={true}
// //             onHide={() => {
// //               if (layer.id === 'main') {
// //                 handleClose();
// //                 closeLayer('main');
// //               } else {
// //                 closeLayer(layer.id);
// //               }
// //             }}
// //             placement="end"
// //             backdrop={false}
// //             scroll={true}
// //             keyboard={false}
// //             onClick={() => activateLayer(layer.id)}
// //             style={{
// //               transform: `translateX(${translateX}px)`,
// //               zIndex,
// //               width: "720px",
// //               paddingTop: "48px",
// //               paddingRight: "32px",
// //               paddingLeft: "32px",
// //               borderTopLeftRadius: "15px",
// //               borderBottomLeftRadius: "15px",
// //               transition: 'all 0.3s ease',
// //             }}
// //           >
// //             <Offcanvas.Header closeButton style={{ marginBottom: "16px" }}>
// //               <Offcanvas.Title>
// //                 <h4>{title}</h4>
// //               </Offcanvas.Title>
// //             </Offcanvas.Header>

// //             <Offcanvas.Body>
// //               {content}

// //               {/* Navigation Buttons */}
// //               {Object.keys(getContent(layer.id).nested || {}).map((key) => (
// //                 <Button
// //                   key={key}
// //                   className="m-2"
// //                   variant="primary"
// //                   onClick={(e) => {
// //                     e.stopPropagation();
// //                     openLayer(key);
// //                   }}
// //                 >
// //                   {getContent(key).title}
// //                 </Button>
// //               ))}
// //             </Offcanvas.Body>
// //           </Offcanvas>
// //         );
// //       })}
// //     </>
// //   );
// // };

// // export default AddFormOffcanvas;

// const AddFormOffcanvas = ({
//   showState,
//   handleClose,
//   formComponent,
//   title,
//   name,
//   status,
//   nestedContents,
// }) => {
//   const isRTL = i18next.language === "ar";
//   const { layers, openLayer, closeLayer, activateLayer } = useLayerStore();
//   const OFFSET = 80;

//   // Sync with external state
//   useEffect(() => {
//     const shouldShow = showState === name || status === name;
//     if (shouldShow && !layers.some(l => l.id === 'main')) {
//       openLayer('main');
//     }
//   }, [showState, status, name]);

//   const getContent = (id) => {
//     if (id === 'main') return {
//       title,
//       content: formComponent,
//       nested: nestedContents, // Use nestedContents here
//     };
//     return nestedContents?.[id] || {
//       title: id,
//       content: `Content for ${id}`,
//       nested: null
//     };
//   };

//   return (
//     <>
//       {layers.map((layer, index) => {
//         const { title, content, nested } = getContent(layer.id); // Destructure nested
//         const zIndex = 1050 + index;
//         const translateX = (layers.length - index - 1) * -OFFSET;

//         return (
//           <Offcanvas
//             key={layer.id}
//             dir={isRTL ? "rtl" : "ltr"}
//             show={true}
//             onHide={() => {
//               if (layer.id === 'main') {
//                 handleClose();
//                 closeLayer('main');
//               } else {
//                 closeLayer(layer.id);
//               }
//             }}
//             placement="end"
//             backdrop={false}
//             scroll={true}
//             keyboard={false}
//             onClick={() => activateLayer(layer.id)}
//             style={{
//               transform: `translateX(${translateX}px)`,
//               zIndex,
//               width: "720px",
//               paddingTop: "48px",
//               paddingRight: "32px",
//               paddingLeft: "32px",
//               borderTopLeftRadius: "15px",
//               borderBottomLeftRadius: "15px",
//               transition: 'all 0.3s ease',
//             }}
//           >
//             <Offcanvas.Header closeButton style={{ marginBottom: "16px" }}>
//               <Offcanvas.Title>
//                 <h4>{title}</h4>
//               </Offcanvas.Title>
//             </Offcanvas.Header>

//             <Offcanvas.Body>
//               {content}

//               {/* Navigation Buttons */}
//               {nested && Object.keys(nested).map((key) => ( // Use nested here
//                 <Button
//                   key={key}
//                   className="m-2"
//                   variant="primary"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     openLayer(key);
//                   }}
//                 >
//                   {nested[key].title}
//                 </Button>
//               ))}
//             </Offcanvas.Body>
//           </Offcanvas>
//         );
//       })}
//     </>
//   );
// };
// export default AddFormOffcanvas;
