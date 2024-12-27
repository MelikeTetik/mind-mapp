import React from 'react'

const saveMindMap = () => {
    const mindMapData = { nodes, edges };
    localStorage.setItem(`mindMapData_${id}`, JSON.stringify(mindMapData));
    alert("Zihin haritası kaydedildi!");
  };


export default saveMind