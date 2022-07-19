import React from "react";

export default function Navbar(props) {
  const { title, updateData, arraySize, updateOrientation, resetArray, isAnimationRunning } = props;

  function generateNewArray() {
    resetArray()
  }

  return (
      <nav className="nav-container">
        <div className="title">{title}</div>
        <select className="select-array-type" onChange={updateData} name="arrayType" disabled={isAnimationRunning ? true:false}>
          <option value="randomArray">Random array</option>
          <option value="sortedAsc">Sorted (non-dec)</option>
          <option value="sortedDes">Sorted (non-inc)</option>
          <option value="nearlySortedAsc">Nearly sorted (non-dec)</option>
          <option value="nearlySortedDes">Nearly sorted (non-inc)</option>
          <option value="manyDuplicates">Many duplicates</option>
        </select>
        <div className="control-size-text">Size of array</div>
        <input
          disabled={isAnimationRunning ? true:false}
          className="control-size"
          type={"range"}
          min={"6"}
          max={"200"}
          value={arraySize}
          name="arraySize"
          onChange={updateData}
        />
        <button className="generate-array-btn" onClick={generateNewArray} disabled={isAnimationRunning ? true:false}>Generate array</button>
        <button className="set-orientation" onClick={updateOrientation}>Change orientation</button>
        <select
          disabled={isAnimationRunning ? true:false}
          className="select-sorting-type"
          onChange={updateData}
          name="sortingType"
        >
          <option value="bubbleSort">Bubble sort</option>
          <option value="selectionSort">Selection sort</option>
          <option value="insertionSort">Insertion sort</option>
          <option value="mergeSort">Merge sort</option>
        </select>
      </nav>
  );
}
