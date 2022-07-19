export function selectionSort(numbers) {
  let copiedArray = [...numbers];
  let animations = [];
  selectionSortHelper(copiedArray, animations);
  return animations;
}

function selectionSortHelper(arr, animations) {
  const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };

  const smallestElIdx = (arr, startIdx, endIdx) => {
    let smIdx = startIdx;
    for (let currIdx = startIdx + 1; currIdx <= endIdx; currIdx++) {
      let animation = {
        compared: false,
        currentSmallestShown: false,
        shown: false,
        compare: [smIdx, currIdx],
        sorted: startIdx,
        currentSmallest: smIdx,
      };
      if (arr[currIdx] < arr[smIdx]) {
        smIdx = currIdx;
        animation.currentSmallest = currIdx;
      }
      animation.currentArray = [...arr]
      animations.push(animation);
    }
    return smIdx;
  };

  const n = arr.length;
  for (let i = 0; i < n; i++) {
    let idx = smallestElIdx(arr, i, n - 1);
    if (i !== idx) swap(arr, i, idx);
  }
}
