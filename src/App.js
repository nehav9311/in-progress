import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState
} from "react";
import { render } from "react-dom";
import { AgGridColumn, AgGridReact } from "ag-grid-react";
import { CellFormater } from "./CellFormater";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { AgAbstractField } from "ag-grid-community";

const GridFunction = () => {
  const [rowCount, setRowCount] = useState("");
  const [colCount, setColCount] = useState("");

  const [RowcountArr, setRowCountArr] = useState([]);
  //const [arr1, setColCountArr] = useState([])
  const [appCount, setAppCount] = useState("");
  const [appCountArray, setAppCountArray] = useState([]);
  const [arr1, setArr1] = useState([]);
  const [dataMapp, setDataMap] = useState([]);
  //const [columns, setColumns] = useState([])
  //const [arrMapp, setArrMapp] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [gridColumnApi, setGridColumnApi] = useState(null);
  //const [result, setResult] = useState([])
  const getRowNodeId = (data) => data.id;

  const [showTable, setShowTable] = useState(false);

  const Grid = async () => {
    setShowTable(false);
    console.log("hello");
    let tab = rowCount * appCount;
    for (let i = 1; i <= tab; i++) {
      RowcountArr.push("trial" + i);
    }
    //setRowCountArr(RowcountArr)
    console.log("Row count array", RowcountArr);

    const arr1 = [];
    for (let i = 1; i <= colCount; i++) {
      let x = {};
      let tab = rowCount * appCount;
      console.log("Tab count", tab);
      for (let j = 1; j <= tab; j++) {
        x["trial" + j] = "";
        console.log("x", x);
      }
      arr1.push(x);
    }
    setArr1(arr1);
    console.log("Array one:", arr1);

    for (let i = 1; i <= appCount; i++) {
      appCountArray.push(i);
    }
    console.log("App count array", appCountArray);

    const dataMapp = RowcountArr.map((v, index) => ({
      field: v,
      editable: function (params) {
        // const tt = params.data;
        // console.log("TT", tt);
        // const t = params.data.trial1;
        // console.log("T", t);
        // console.log("Param data", t);
        // var spaceCount = t.split(" ").length - 1;
        // console.log("space", spaceCount);
        // let spp = t.split(" ");
        //console.log("Index", params);
        return params.node.data;
      },
      headerName: "Trial " + ((index % rowCount) + 1)
      //cellRenderer: "CellFormater",
    }));
    console.log("dataMapp : ", dataMapp);
    setDataMap(dataMapp);
    setShowTable(true);
  };

  const newt = () => {
    let rowCount1 = parseInt(rowCount, 10);
    const xx = [];
    gridApi.forEachNode((node) => xx.push(node.data));
    const resultt = xx.map(Object.values);
    //console.log("MAP array", resultt);
    // console.log("Nr", nr)
    let nr1 = resultt[0].map((x, i) => resultt.map((x) => x[i]));
    console.log("Transpose Array", nr1);
    var res = nr1.reduce((resultArray, item, index) => {
      const chunkIndex = Math.floor(index / rowCount1);
      if (!resultArray[chunkIndex]) {
        resultArray[chunkIndex] = [];
      }
      resultArray[chunkIndex].push(item);

      return resultArray;
    }, []);
    console.log("Final Data Array:", res);
    const operator1 = { trial1: res[0][0], trial2: res[0][1] };
    const operator2 = { trial1: res[1][0], trial2: res[1][1] };
    const operator = { operator1, operator2 };
    console.log("Operator", operator);
  };

  ///console.log("RES", res)

  const setHeaderNames = () => {
    const newColumns = gridApi.getColumnDefs();
    console.log("New columns", newColumns);
    let rowData = [];
    newColumns.forEach((node) => rowData.push(node.data));
    const xx = [];
    gridApi.forEachNode((node) => xx.push(node.data));
    const resultt = xx.map(Object.values);
    console.log("Result", resultt);
    console.log("Result[0]", resultt[0]);
    const reso = resultt[0];
    console.log("RESO", reso[1]);
    let spacee = reso[0].split(" ");
    let spacee1 = reso[1].split(" ");
    console.log("SSSS", spacee);
    console.log("SSSS2", spacee1);
    let ss = [];
    //Adding data
    for (let i = 0; i < reso.length; i++) {
      let spacee = reso[i].split(" ");
      ss.push(spacee);
    }
    console.log("ss", ss);

    const arr1 = [];
    for (let i = 1; i <= colCount; i++) {
      let x = {};
      let tab = rowCount * appCount;
      console.log("Tab count", tab);
      for (let j = 1; j <= tab; j++) {
        x["trial" + j] = "";
        //console.log("x", x);
      }
      arr1.push(x);
    }
    console.log("New arr1", arr1);

    console.log(resultt[1]);
    console.log(resultt[0][0]);

    var spaceCount = resultt[0][0].split(" ").length - 1;
    console.log("space", spaceCount);
    let spp = resultt[0][0].split(" ");
    console.log("Spp", spp);
    console.log("r0", resultt[0]);

    if (spaceCount > 0) {
      console.log(">0");
      resultt[0][0] = spp[0];
      console.log(resultt[0]);
      resultt[1][0] = spp[1];
      console.log(resultt[1]);
    }
    console.log("ColumnDef", resultt);

    // let nr1 = resultt[0].map((x, i) => resultt.map((x) => x[i]));
    // console.log("Transpose Array", nr1);
    // var res = nr1.reduce((resultArray, item, index) => {
    //   const chunkIndex = Math.floor(index / rowCount);
    //   if (!resultArray[chunkIndex]) {
    //     resultArray[chunkIndex] = [];
    //   }
    //   resultArray[chunkIndex].push(item);

    //   return resultArray;
    // }, []);
    // console.log("Final Data Array:", res);

    // let tv = res[0][0][0]
    // var spaceCount = tv.split(" ").length - 1;
    //     console.log("space", spaceCount);
    //     let spp = tv.split(" ");
    //     console.log("Spp", spp);
    //     console.log("Res", res[0][0])
    //     let aaoo = []
    //     if (spaceCount > 0) {
    //       console.log("Space count > 0, more than 1 sample in row")
    //       res[0] = spp[0]
    //       res[1] = spp[1]
    //       console.log(res[0])
    //       console.log(res[1])
    //       aaoo.push(res[0],res[1])
    //       console.log(aaoo)
    //       res[0][0] = aaoo
    //       console.log("trial1",aaoo)
    //     }
    //console.log("Field", newColumns[0].field)
    // newColumns.forEach((newColumn, index) => {
    //   // console.log("Field", newColumn.field)
    //   //.log("Index", index)
    //   //if(index >= rowCount ) {
    //   newColumn.headerName = "Trial " + ((index % rowCount) + 1);
    //   //}
    // });

    // newColumns.forEach((newColumn, index) => {
    //     newColumn.headerName = 'C' + index;
    // });
    //setDataMap(newColumns);
  };

  const onGridReady = (params) => {
    setGridApi(params.api);
    setGridColumnApi(params.columnApi);
  };

  const CellEditor = forwardRef((props, ref) => {
    const [value, setValue] = useState(props.value);
    const refInput = useRef(null);

    useEffect(() => {
      setTimeout(() => refInput.current.focus());
    }, []);

    useImperativeHandle(ref, () => {
      return {
        getValue() {
          return value;
        },
        isCancelBeforeStart() {
          return false;
        }
      };
    });

    return (
      <input
        type="number"
        ref={refInput}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        style={{ width: "100%" }}
      />
    );
  });

  return (
    <div>
      <input
        //readOnly
        type="text"
        id="txtrows"
        value={appCount}
        placeholder="Appraiser Count = 1"
        onChange={(e) => setAppCount(e.target.value)}
      />
      <input
        type="text"
        id="txtrows"
        value={colCount}
        placeholder="Set Sample"
        onChange={(e) => setColCount(e.target.value)}
      />
      <input
        type="text"
        id="txtrows"
        value={rowCount}
        placeholder="Set Trial"
        onChange={(e) => setRowCount(e.target.value)}
      />
      <button onClick={Grid}>Create Table</button>
      <button onClick={newt}>GET DATA</button>
      <button onClick={setHeaderNames}>Divide data</button>

      {showTable ? (
        <div style={{ height: "200px", width: "1000px", flex: "50%" }}>
          <AgGridReact
            getRowNodeId={getRowNodeId}
            //key={index}
            className="ag-theme-alpine"
            rowData={arr1}
            key={dataMapp.field}
            onGridReady={onGridReady}
            //columnDefs={dataMapp}

            frameworkComponents={{
              numericEditor: CellEditor
              //CellFormater: CellFormater,
            }}
            defaultColDef={{
              editable: true,
              sortable: true,
              flex: 1,
              minWidth: 100,
              filter: true

              ///resizable: true
            }}
          >
            {dataMapp.map((column) => (
              <AgGridColumn {...column} key={column.field} />
            ))}
          </AgGridReact>
        </div>
      ) : null}
    </div>
  );
};

export default GridFunction;
