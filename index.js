// ターゲットのElementを単体で取得
const displayElement = document.querySelector('#display');
const resultElement = document.querySelector('#result');
const clearElement = document.querySelector('#clear');

// ターゲットのElementを複数で取得
const numberElements = document.querySelectorAll('.js-number');
const operatorElements = document.querySelectorAll('.js-operator');

// 各変数を定義する
let isInsertNumber = true; // 数字入力中かどうか
let isResult = false; // =を押した後かどうか
let currentNumber = '0'; // 現在選択中の数字
let currentOperator = ''; // 現在選択中の演算子
let numbers = []; // 押した数字の配列を格納する
let operators = []; // 押した演算子の配列を格納する

// 計算窓に表示する
const showDisplay = () =&gt; {
  if (isInsertNumber) {
    const text = String(currentNumber);
    const newText = text.replace(/^0{1,}([^.])/, '$1');
    displayElement.value = newText;
  } else {
    displayElement.value = total();
  }
};

// 演算子の計算する
const calculate = (prev, current, index) =&gt; {
  switch (operators[index]) {
    case '+':
      return prev + current;
    case '-':
      return prev - current;
    case '*':
      return prev * current;
    case '/':
      return prev / current;
    default:
      console.log(`${operator} is not working...`);
  }
};

// 数字配列の左端から順に一つ前の演算子で計算して、すべての計算結果を返す
const total = () =&gt; {
  return numbers.reduce((prev, current, index) =&gt; {
    return calculate(prev, current, index - 1);
  });
};


// 数字をクリックしたときの振る舞い ... (1)
const selectNumber = num =&gt; {
  // = を押した直後
  if (isResult) {
    currentNumber = '0';
    isResult = false;
  }

  // 演算子を押した直後
  if (!isInsertNumber) {
    operators.push(currentOperator);
    currentNumber = '0';
    isInsertNumber = true;
  }

  // 連続の . は不可
  if (num === '.' &amp;&amp; currentNumber.includes('.')) {
    return;
  }

  currentNumber += num;
};

// 数字ボタンの一つ一つに (1) の振る舞いをセットしていく
numberElements.forEach(numberElement =&gt; {
  numberElement.addEventListener('click', event =&gt; {
    selectNumber(event.target.value);
    showDisplay();
  });
});


// 演算子をクリックしたときの振る舞い ... (2)
const selectOparator = op =&gt; {
  if (isInsertNumber) {
    numbers.push(Number(currentNumber));
    isInsertNumber = false;
  }

  currentOperator = op;
};

// 演算子ボタンの一つ一つに (2) の振る舞いをセットしていく
operatorElements.forEach(operatorElement =&gt; {
  operatorElement.addEventListener('click', event =&gt; {
    selectOparator(event.target.value);
    showDisplay();
  });
});


// = をクリックしたときの振る舞い ... (3)
const showResult = () =&gt; {
  if (isInsertNumber &amp;&amp; currentOperator &amp;&amp; !isResult) {
    numbers.push(Number(currentNumber));
    currentOperator = '';
    currentNumber = total();
    numbers = [];
    operators = [];
    isResult = true;
  }
};

// = ボタンに (3) の振る舞いをセットする
resultElement.addEventListener('click', () =&gt; {
  showResult();
  showDisplay();
});


// C をクリックしたときの振る舞い ... (4)
const clear = () =&gt; {
  numbers = [];
  operators = [];
  currentNumber = 0;
  currentOperator = '';
  isInsertNumber = true;
};

  // C ボタンに (4) の振る舞いをセットする
clearElement.addEventListener('click', () =&gt; {
  clear();
  showDisplay();
});