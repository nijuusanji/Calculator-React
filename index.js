function App(){
  
    const [expression,setExpression] = React.useState("");
    const [answer,setAnswer] = React.useState(expression);
    
    
    function display(symbol) {
      setExpression((prevValue) => {
        if (
          /[+*-/]/.test(symbol) &&
          /[+*-/]/.test(prevValue[prevValue.length - 1])
        ) {
          let newValue;
          if (/[-]/.test(symbol)) {
            newValue = prevValue.slice(0, prevValue.length) + symbol;
          } else {
            let count = 0;
            for (let i = 0; i < prevValue.length; i++) {
              if (isNaN(+prevValue[i])) {
                count++;
              } else {
                count = 0;
              }
            }
            newValue = prevValue.slice(0, prevValue.length - count) + symbol;
          }
  
          setExpression(newValue);
        } else {
          if (prevValue) {
            prevValue = prevValue + "";
            let valArr = prevValue.split(/[+/*-]/g);
            console.log("valArr " + JSON.stringify(valArr));
            let lastNumber = valArr[valArr.length - 1];
            if (!isNaN(lastNumber) && /[.]/.test(lastNumber) && symbol === ".") {
              console.log("symbol = empty ");
              symbol = "";
            }
          }
  
          setExpression(
            (prevValue + symbol).replace(/^0/g, "").replace(/\.+/g, ".")
          );
        }
      });
      setAnswer((prevValue) =>
        (prevValue + symbol).replace(/^0/g, "").replace(/\.+/g, ".")
      );
    }
    
    function calculate() {
      setAnswer(eval(expression));
      setExpression(eval(expression));
    }
    function allClear() {
      setExpression("");
      setAnswer(0);
    }
    function clear() {
      setExpression((prev) => {
        setAnswer(0);
        console.log(prev);
        prev = prev + "";
        return prev
          .split("")
          .slice(0, prev.length - 1)
          .join("");
      });
    }
    
    return (
      <div className="container">
        <div className="grid">
          <div className="dis">
            <input className="expression" disabled placeholder="0" value={expression}></input>
            <input id="display" className="total" disabled value={answer}
            ></input>
          </div>
          <div onClick={allClear} className="padButton AC red" id="clear">AC</div>
          <div onClick={clear} id="clear" className="padButton C red" id="c">C</div>
          <div onClick={() => display("/")} id="divide"className="padButton div grey">/</div>
          <div onClick={() => display("*")} id="multiply" className="padButton times grey">X</div>
          <div onClick={() => display("7")} id="seven" className="padButton seven">7</div>
          <div onClick={() => display("8")} id="eight" className="padButton eight">8</div>
          <div onClick={() => display("9")} id="nine" className="padButton nine">9</div>
          <div onClick={() => display("-")} id="subtract" className="padButton minus grey">-</div>
          <div onClick={() => display("4")} id="four" className="padButton four">4</div>
          <div onClick={() => display("5")} id="five" className="padButton five">5</div>
          <div onClick={() => display("6")} id="six" className="padButton six">6</div>
          <div onClick={() => display("+")} id="add" className="padButton add grey">+</div>
          <div onClick={() => display("1")} id="one" className="padButton one">1</div>
          <div onClick={() => display("2")} id="two" className="padButton two">2</div>
          <div onClick={() => display("3")} id="three" className="padButton three">3</div>
          <div onClick={calculate} id="equals" className="padButton equa blue">=</div>
          <div onClick={() => display("0")} id="zero" className="padButton zero">0</div>
          <div onClick={() => display(".")} id="decimal"className="padButton dot">.</div>
        </div>
      </div>
    )
  }
  
  
  ReactDOM.render(<App />,document.getElementById('root'));