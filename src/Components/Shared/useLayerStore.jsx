// import { create } from 'zustand';

// const useLayerStore = create((set) => ({
//   //   layers: [{ id: 'main' }],
//   //   openLayer: (id) => set((state) =>
//   //     !state.layers.some(l => l.id === id) ?
//   //       { layers: [...state.layers, { id }] } :
//   //       state
//   //   ),
//   //   closeLayer: (id) => set((state) => ({
//   //     layers: state.layers.filter(layer => layer.id !== id)
//   //   })),
//   //   activateLayer: (id) => set((state) => ({
//   //     layers: [
//   //       ...state.layers.filter(l => l.id !== id),
//   //       state.layers.find(l => l.id === id)
//   //     ].filter(Boolean)
//   //   })),
//   // }));
//   //   layers: [], // List of all open panels
//   //   /* Add new panel */
//   //   openLayer: (id) => set((state) =>
//   //     !state.layers.some(l => l.id === id) ?
//   //       { layers: [...state.layers, { id }] } :
//   //       state
//   //   ),
//   //   /* Remove panel */
//   //   closeLayer: (id) => set((state) => ({
//   //     layers: state.layers.filter(layer => layer.id !== id)
//   //   })),
//   //   /* Bring panel to front */
//   //   activateLayer: (id) => set((state) => ({
//   //     layers: [
//   //       ...state.layers.filter(l => l.id !== id),
//   //       state.layers.find(l => l.id === id)
//   //     ].filter(Boolean)
//   //   })),
//   // }));


//   layers: [],
//   openLayer: (id) => set((state) =>
//     !state.layers.some(l => l.id === id) ?
//       { layers: [...state.layers, { id }] } :
//       state
//   ),
//   closeLayer: (id) => set((state) => ({
//     layers: state.layers.filter(layer => layer.id !== id)
//   })),
//   activateLayer: (id) => set((state) => ({
//     layers: [
//       ...state.layers.filter(l => l.id !== id),
//       state.layers.find(l => l.id === id)
//     ].filter(Boolean)
//   })),
// }));
// export default useLayerStore;







// store/layers.js
// store/layers.js
import { create } from 'zustand';

const useLayerStore = create((set) => ({
  layers: [],
  openLayer: (id) => set((state) =>
    !state.layers.some(l => l.id === id) ?
      { layers: [...state.layers, { id }] } :
      state
  ),
  closeLayer: (id) => set((state) => ({
    layers: state.layers.filter(layer => layer.id !== id)
  })),
  activateLayer: (id) => set((state) => ({
    layers: [
      ...state.layers.filter(l => l.id !== id),
      state.layers.find(l => l.id === id)
    ].filter(Boolean)
  })),
  resetLayers: () => set({ layers: [] }), // Add this action
}));

export default useLayerStore;