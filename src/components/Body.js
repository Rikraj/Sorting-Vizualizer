import React from "react";
import fontawesome from "https://kit.fontawesome.com/633eaa11fa.js"
import * as BubbleSort from "../algorithms/BubbleSort"
import * as SelectionSort from "../algorithms/SelectionSort"
import * as InsertionSort from "../algorithms/InsertionSort"

export default function Body(props) {
  let {orientation, nums, arraySize, algorithmSpeed, sortingType, updateData, updateButton, playingMode, arrayAnimation, updateArrayAnimation} = props 
  let k = 0
  let arrayBars = nums.map(num=>(
    <div 
      key={k++}
      className="array-bar" 
      style={{
        backgroundColor: "#2ECC71",
        // assume navbar is at max 15vh, 5-200 is the range of values in numbers array, it is fixed as of now
        height: `${72*num/200}vh`,
        // 100% is the width of the container, which is actually 80% of body width
        width: `${80/arraySize}vw`,
        marginTop: orientation? 0:`${(76-(72*num/200))}vh`
      }}
    ></div>
  ))

  function updateSortingStatus() {
    if (arrayAnimation.length===0){
      let animation
      if (sortingType==="bubbleSort")
        animation = BubbleSort.bubbleSort(nums)
      else if (sortingType==="selectionSort")
        animation = SelectionSort.selectionSort(nums)
      else if (sortingType==="insertionSort") 
        animation = InsertionSort.insertionSort(nums)

      updateArrayAnimation(animation)
    }
    updateButton()
  }

  return (
    <div className="body">
      <main className="main">
        <div 
          className="array-bars" 
          style={{
            // to invert the bars on screen we have to change display property of it's container (here container of bar is bars)
            display: orientation? "flex":"block"
          }}
        >
          {arrayBars}
        </div>
      </main>
      <div className="bottom-controls">
        <input
          className="control-speed"
          type={"range"}
          min={"10"}
          max={"1000"}
          value={algorithmSpeed}
          name="algorithmSpeed"
          onChange={updateData}
        />
        <button id="btn" className="sorting-control-btn" onClick={updateSortingStatus}>
          {playingMode ? <i className="fas fa-2x fa-pause"></i> : <i className="fas fa-2x fa-play"></i>}
        </button>
      </div>
    </div>
  );
}
