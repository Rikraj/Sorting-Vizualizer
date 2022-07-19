export function bubbleSort(numbers) {
  let copiedArray = [...numbers];
  let animations = [];
  bubbleSortHelper(copiedArray, animations);
  return animations;
}

function bubbleSortHelper(arr, animations) {
  const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };

  const n = arr.length;
  let didSwap;
  let sortedPortion = [];
  // repeat for n-1 times
  for (let i = n; i > 1; i--) {
    didSwap = false;
    for (let j = 0; j < i - 1; j++) {
      let animation = {
        compared: false,
        swaped: false,
        shown: false,
        sorted: [...sortedPortion],
        swap: [],
        compare: [],
      };
      animation.compare = [j, j + 1];
      if (arr[j] > arr[j + 1]) {
        animation.swap = [j, j + 1];
        swap(arr, j, j + 1);
        didSwap = true;
      }
      animation.currentArray = [...arr];
      animations.push(animation);
    }
    sortedPortion.push(i - 1);
    // optimizing bubble sort for nearly sorted array
    if (!didSwap) break;
  }
}
