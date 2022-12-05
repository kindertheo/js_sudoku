class sudoku {
  constructor() {
    this.sudoku = document.querySelector("#sudoku-game");
    // this._buildMatrice();
    this._generateSudoku();
    this._addEventListenerInputs();
  }

  _generateSudoku() {
    for (let i = 0; i < 10; i++) {
      this._buildMatrice();
      this._buildMatriceOfInputs();
      let randLine = this.randomIntFromInterval(1, 9);
      let randCol = this.randomIntFromInterval(1, 9);
      let value = this.randomIntFromInterval(1, 9);
      if (
        !this.isPresentInSquare(randLine, randCol, value) &&
        !this.isPresentInArray(this.getColumn(randCol), value) &&
        !this.isPresentInArray(this.getLine(randLine), value)
      ) {
        this.matrice[randLine - 1][randCol - 1] = value;
        this.matriceInputs[randLine - 1][randCol - 1].value = value;
      }
    }
  }

  _addEventListenerInputs() {
    const that = this;
    document.querySelectorAll("input").forEach((el) => {
      el.addEventListener("input", function (el) {
        if (el.data == "" || el.data === null || el.data === undefined) {
          that._buildMatrice();
          return false;
        }
        if (!that.IsPresentInMatrice(el)) {
          console.log("present");
          that.cancel(el);
        } else {
          console.log("not present");
          that.accept(el);
        }
        that._buildMatrice();
      });
    });
  }

  IsPresentInMatrice(inputElement) {
    let classes = inputElement.target.parentNode.classList;
    let value = inputElement.data;
    const colRegex = new RegExp("^c([0-9]{1})$");
    const lineRegex = new RegExp("^l([0-9]{1})$");
    let col = "";
    let line = "";
    classes.forEach((classe) => {
      if (classe.match(colRegex)) {
        col = classe.match(colRegex)[1];
      }
      if (classe.match(lineRegex)) {
        line = classe.match(lineRegex)[1];
      }
    });

    let arrayCol = this.getColumn(col);
    let arrayLine = this.getLine(line);
    if (
      this.isPresentInArray(arrayCol, value) ||
      this.isPresentInArray(arrayLine, value) ||
      this.isPresentInSquare(line, col, value)
    ) {
      return false;
    }
    return true;
  }

  isPresentInSquare(lineNumber, colNumber, value) {
    let r = this.range(0, 9, 3);
    const line = parseInt(lineNumber);
    const col = parseInt(colNumber);
    let rangeLine = [];
    let rangeCol = [];
    for (let i = 0; i < r.length; i++) {
      if (line > r[i] && line <= r[i + 1]) {
        rangeLine = [r[i] + 1, r[i + 1]];
      }
      if (col > r[i] && col <= r[i + 1]) {
        rangeCol = [r[i] + 1, r[i + 1]];
      }
    }
    if (
      this.verifyPresenceInSquare(
        rangeLine,
        rangeCol,
        lineNumber,
        colNumber,
        value
      )
    ) {
      return true;
    }
    return false;
  }

  verifyPresenceInSquare(rangeLine, rangeCol, lineNumber, colNumber, value) {
    let valuesInSquare = [];
    // console.log(this.matrice);
    // console.log("lo");
    for (let i = rangeCol[0] - 1; i <= rangeCol[1] - 1; i++) {
      for (let j = rangeLine[0] - 1; j <= rangeLine[1] - 1; j++) {
        console.log(i, j, this.matrice[j][i]);
        valuesInSquare.push(this.matrice[j][i]);
      }
    }
    console.log(
      "value in square ",
      valuesInSquare,
      "line",
      rangeLine,
      "col",
      rangeCol,
      "matrice",
      this.matrice
    );
    if (valuesInSquare.includes(value)) {
      return true;
    }
    return false;
  }

  isPresentInArray(array, value) {
    // console.log(array, value, array.includes(value));
    return array.includes(value);
  }

  accept(el) {
    el.target.parentNode.style.backgroundColor = "green";
  }
  cancel(el) {
    // console.log(el);
    el.target.parentNode.style.backgroundColor = "red";
  }

  _buildMatrice() {
    const trs = document.querySelectorAll("tr");
    let matrice = [];
    let l = 1;
    trs.forEach((tr) => {
      let line = [];
      for (let i = 0; i < tr.childElementCount; i++) {
        tr.children[i].classList.add(`l${l}`);
        tr.children[i].classList.add(`c${i + 1}`);
        let value = tr.children[i].querySelector("input").value;
        line.push(value);
      }
      l = l + 1;
      matrice.push(line);
    });
    // console.log(matrice);
    this.matrice = matrice;
  }

  _buildMatriceOfInputs() {
    const trs = document.querySelectorAll("tr");
    let matrice = [];
    let l = 1;
    trs.forEach((tr) => {
      let line = [];
      for (let i = 0; i < tr.childElementCount; i++) {
        tr.children[i].classList.add(`l${l}`);
        tr.children[i].classList.add(`c${i + 1}`);
        let value = tr.children[i].querySelector("input");
        line.push(value);
      }
      l = l + 1;
      matrice.push(line);
    });
    // console.log(matrice);
    this.matriceInputs = matrice;
  }

  getLine(number) {
    return this.matrice[number - 1];
  }

  getColumn(number) {
    return this.matrice.map((el) => el[number - 1]);
  }

  numberIsPresent(array, number) {
    return array.includes(number);
  }

  range(start, end, step) {
    const result = [];
    for (let i = start; i <= end; i += step) {
      result.push(i);
    }
    return result;
  }

  isBetweenTwoNumbers(value, start, end) {
    return (value - start) * (value - end) <= 0;
  }

  randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
}

new sudoku();
