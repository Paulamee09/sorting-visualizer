const barsContainer = document.getElementById("bars-container")

function createBars(array) {
  barsContainer.innerHTML = ""
  for (let value of array) {
    const bar = document.createElement("div")
    bar.className = "bar"
    bar.style.height = `${value}px`
    barsContainer.appendChild(bar)
  }
}

let bars = []

function randomizeBars() {
  bars = []
  for (let i = 0; i < 50; i++) {
    bars.push(Math.floor(Math.random() * 100) + 1)
  }
  createBars(bars)
}

async function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function swap(index1, index2) {
  [bars[index1], bars[index2]] = [bars[index2], bars[index1]]
  createBars(bars)
  await delay(50)
}
async function insertionSort() {
  const n = bars.length
  for (let i = 1; i < n; i++) {
    let key = bars[i]
    let j = i - 1
    while (j >= 0 && bars[j] > key) {
      await swap(j, j + 1)
      j--
    }
    bars[j + 1] = key
  }
}
async function selectionSort() {
  const n = bars.length
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i
    for (let j = i + 1; j < n; j++) {
      if (bars[j] < bars[minIndex]) {
        minIndex = j
      }
    }
    if (minIndex !== i) {
      await swap(i, minIndex)
    }
  }
}

async function bubbleSort() {
  const n = bars.length
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (bars[j] > bars[j + 1]) {
        await swap(j, j + 1)
      }
    }
  }
}

async function quickSort(left, right) {
  if (left >= right) {
    return
  }
  let pivotIndex = await partition(left, right)
  await quickSort(left, pivotIndex - 1)
  await quickSort(pivotIndex + 1, right)
}

async function partition(left, right) {
  let pivotValue = bars[right]
  let pivotIndex = left
  for (let i = left; i < right; i++) {
    if (bars[i] < pivotValue) {
      await swap(i, pivotIndex)
      pivotIndex++
    }
  }
  await swap(right, pivotIndex)
  return pivotIndex
}

async function mergeSort(left, right) {
  if (left < right) {
    let mid = Math.floor((left + right) / 2)
    await mergeSort(left, mid)
    await mergeSort(mid + 1, right)
    await merge(left, mid, right)
  }
}

async function merge(left, mid, right) {
  let leftSize = mid - left + 1
  let rightSize = right - mid
  let leftArr = new Array(leftSize)
  let rightArr = new Array(rightSize)

  for (let i = 0; i < leftSize; i++) {
    leftArr[i] = bars[left + i]
  }
  for (let j = 0; j < rightSize; j++) {
    rightArr[j] = bars[mid + 1 + j]
  }

  let i = 0, j = 0, k = left
  while (i < leftSize && j < rightSize) {
    if (leftArr[i] <= rightArr[j]) {
      bars[k] = leftArr[i]
      i++
    } else {
      bars[k] = rightArr[j]
      j++
    }
    k++
    await delay(50)
  }

  while (i < leftSize) {
    bars[k] = leftArr[i]
    i++
    k++
  }

  while (j < rightSize) {
    bars[k] = rightArr[j]
    j++
    k++
  }
  createBars(bars)
}

async function shellSort() {
  const n = bars.length
  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let temp = bars[i]
      let j
      for (j = i; j >= gap && bars[j - gap] > temp; j -= gap) {
        await swap(j, j - gap)
      }
      bars[j] = temp
    }
  }
}
