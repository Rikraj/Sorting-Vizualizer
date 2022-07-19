import React from "react";
import Navbar from "./components/Navbar";
import Body from "./components/Body";

export default function App() {
  let [array, setArray] = React.useState(generateNumbers(50));
  let [data, setData] = React.useState({
    arrayType: "randomArray",
    arraySize: "50",
    sortingType: "bubbleSort",
    algorithmSpeed: "50",
  });
  let [reversed, setReversed] = React.useState(true);
  let [isPlaying, setIsPlaying] = React.useState(false);
  let [animation, setAnimation] = React.useState([]);

  function generateNumbers(n, lowerBound = 6, upperBound = 200) {
    // returns an integer array with n entries
    // helper function
    let numbers = [];
    for (let i = 0; i < n; i++) {
      let number = generateRandomNumber(lowerBound, upperBound);
      numbers.push(number);
    }
    return numbers;
  }

  function generateRandomNumber(min, max) {
    // generates random number in range [min,max]
    // helper function
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getNewArray(arraySize = data.arraySize, arrayType = data.arrayType) {

    function swap(array, idx1, idx2) {
      [array[idx1], array[idx2]] = [array[idx2], array[idx1]];
    }

    function shuffle(nums) {
      for (let _i = 0; _i < 40; _i++) {
        let idx1 = generateRandomNumber(0, nums.length - 1);
        let idx2 = generateRandomNumber(0, nums.length - 1);
        swap(nums, idx1, idx2);
      }
      return nums;
    }

    // setting animation to none
    handleAnimationChange([]);
    // set Array
    if (arrayType === "randomArray") {
      setArray(generateNumbers(arraySize));
    } else if (arrayType === "sortedAsc") {
      let numbers = generateNumbers(arraySize);
      numbers.sort((num1, num2) => num1 - num2);
      setArray(numbers);
    } else if (arrayType === "sortedDes") {
      let numbers = generateNumbers(arraySize);
      numbers.sort((num1, num2) => num2 - num1);
      setArray(numbers);
    } else if (arrayType === "nearlySortedAsc") {
      let numbers = generateNumbers(arraySize);
      numbers.sort((num1, num2) => num1 - num2);
      let numOfSwaps = parseInt(parseInt(arraySize) / 6);
      for (let _i = 0; _i < numOfSwaps; _i++) {
        let idx1 = generateRandomNumber(0, arraySize - 1);
        let idx2 = generateRandomNumber(0, arraySize - 1);
        swap(numbers, idx1, idx2);
      }
      setArray(numbers);
    } else if (arrayType === "nearlySortedDes") {
      let numbers = generateNumbers(arraySize);
      numbers.sort((num1, num2) => num2 - num1);
      let numOfSwaps = parseInt(parseInt(arraySize) / 6);
      for (let _i = 0; _i < numOfSwaps; _i++) {
        let idx1 = generateRandomNumber(0, arraySize - 1);
        let idx2 = generateRandomNumber(0, arraySize - 1);
        swap(numbers, idx1, idx2);
      }
      setArray(numbers);
    } else if (arrayType === "manyDuplicates") {
      let upperBound = parseInt(parseInt(arraySize) * 0.3),
        lowerBound = parseInt(parseInt(arraySize) * 0.4);
      let uniques = generateRandomNumber(lowerBound, upperBound);
      let uniqueNumbers = generateNumbers(uniques);
      let numbers = [];
      while (numbers.length < arraySize) {
        let shuffledNumbers = shuffle(uniqueNumbers);
        numbers = [...numbers, ...shuffledNumbers];
      }
      setArray(numbers.slice(0, arraySize));
    }
  }

  function handleChange(event) {
    let { name, value } = event.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
    setIsPlaying(false);

    if (name === "arraySize") getNewArray(value, data.arrayType);
    if (name === "arrayType") getNewArray(data.arraySize, value);
    if (name === "sortingType") handleAnimationChange();
  }

  function handleAnimationChange(animation = []) {
    let bars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < bars.length; i++) {
      bars[i].style.backgroundColor = "#2ECC71";
    }
    setAnimation(animation);
  }

  // **************************************** SORTING ANIMATION LOGIC *****************************************************************

  React.useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        if (data.sortingType==="bubbleSort") bubbleSortAnimation()
        if (data.sortingType==="selectionSort") selectionSortAnimation()
      }, 1000 / data.algorithmSpeed);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isPlaying]);


  function bubbleSortAnimation() {
    let bars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animation.length; i++) {
      if (animation[i].shown === true) continue;
      else {
        let { compare, swap, sorted } = animation[i];
        if (!animation[i].compared) {
          bars[compare[0]].style.backgroundColor = "red";
          bars[compare[1]].style.backgroundColor = "red";
          for (let j = 0; j < sorted.length; j++) {
            bars[sorted[j]].style.backgroundColor = "yellow";
          }
          animation[i].compared = true;
          break;
        } 
        else if (!animation[i].swaped && swap.length>0) {
          bars[compare[0]].style.backgroundColor = "#2ECC71";
          bars[compare[1]].style.backgroundColor = "#2ECC71";
          bars[swap[0]].style.backgroundColor = "blue";
          bars[swap[1]].style.backgroundColor = "blue";
          for (let j = 0; j < sorted.length; j++) {
            bars[sorted[j]].style.backgroundColor = "yellow";
          }
          animation[i].swaped = true 
          break 
        }
        else {
          if (swap.length>0) {
            bars[swap[0]].style.backgroundColor = "#2ECC71";
            bars[swap[1]].style.backgroundColor = "#2ECC71";
          }
          else {
            bars[compare[0]].style.backgroundColor = "#2ECC71";
            bars[compare[1]].style.backgroundColor = "#2ECC71";
            animation[i].swaped = true 
          }
          for (let j = 0; j < sorted.length; j++) {
            bars[sorted[j]].style.backgroundColor = "yellow";
          }
          setArray(animation[i].currentArray);
          animation[i].shown = true;
          // if sorting is done
          if (i===animation.length-1) {
            setIsPlaying(false)
            handleAnimationChange()
          }
          break;
        }
      }
    }
  }

  function selectionSortAnimation() {
    let bars = document.getElementsByClassName("array-bar");
    for (let i = 0; i < animation.length; i++) {
      if (animation[i].shown === true) continue;
      else {
        let { compare, currentSmallest, sorted } = animation[i];
        if (!animation[i].compared) {
          bars[compare[0]].style.backgroundColor = "red";
          bars[compare[1]].style.backgroundColor = "red";
          for (let j = 0; j < sorted; j++) {
            bars[j].style.backgroundColor = "yellow";
          }
          animation[i].compared = true;
          break;
        } 
        else if (!animation[i].currentSmallestShown) {
          bars[compare[0]].style.backgroundColor = "#2ECC71";
          bars[compare[1]].style.backgroundColor = "#2ECC71";
          bars[currentSmallest].style.backgroundColor = "blue"
          for (let j = 0; j < sorted; j++) {
            bars[j].style.backgroundColor = "yellow";
          }
          animation[i].currentSmallestShown = true
          break 
        }
        else {
          bars[currentSmallest].style.backgroundColor = "#2ECC71"
          animation[i].shown = true  
          setArray(animation[i].currentArray);
          if (i===animation.length-1) {
            setIsPlaying(false)
            handleAnimationChange()
          }
        }
      }
    }
  }

  // ************************************************************************************************************************************

  return (
    <div className="app">
      <Navbar
        title={"Sorting Visualizer"}
        updateData={handleChange}
        arraySize={data.arraySize}
        updateOrientation={() => {
          setReversed((prev) => !prev);
        }}
        resetArray={getNewArray}
        isAnimationRunning={isPlaying}
      />
      <Body
        orientation={reversed}
        nums={array}
        arraySize={data.arraySize}
        algorithmSpeed={data.algorithmSpeed}
        sortingType={data.sortingType}
        updateData={handleChange}
        updateButton={() => {
          setIsPlaying((prev) => !prev);
        }}
        playingMode={isPlaying}
        arrayAnimation={animation}
        updateArrayAnimation={handleAnimationChange}
      />
    </div>
  );
}
