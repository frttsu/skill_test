const fs = require('fs');

const csvData = fs.readFileSync("./PSMrawdata.csv", 'utf8');

const csvDataLines = csvData.split(/\r\n|\n/);

const expensiveDataMap = new Map<number,number>();
const cheapDataMap = new Map<number,number>();
let tooExpensiveDataMap = new Map<number,number>();
let tooCheapDataMap = new Map<number,number>();


function cellstoData(cells : any ): number {
    for(let i = 1; i < cells.length; i++) {
        if(parseInt(cells[i]) % 50 != 0) {
            cells[i] = (Math.floor(cells[i] / 50) + 1) * 50;
        }
        else {
            cells[i] = parseInt(cells[i]);
        }
    }
    return cells;
}

function pushCells(cells: any) : void{
    const a = expensiveDataMap.get(cells[1]);
    const b = cheapDataMap.get(cells[2]);
    const c = tooExpensiveDataMap.get(cells[3]);
    const d = tooCheapDataMap.get(cells[4]);
    if(a != undefined) {
        expensiveDataMap.set(cells[1],a + 1);
    }
    else{
        expensiveDataMap.set(cells[1],1);
    }
    if(b != undefined) {
        cheapDataMap.set(cells[2],b + 1);
    }
    else{
        cheapDataMap.set(cells[2],1);
    }
    if(c != undefined){
        tooExpensiveDataMap.set(cells[3],c + 1);
    }
    else {
        tooExpensiveDataMap.set(cells[3],1);
    }
    if(d != undefined){
        tooCheapDataMap.set(cells[4],d +1);
    }
    else{
        tooCheapDataMap.set(cells[4], 1);
    }

}

for (let i = 1; i < csvDataLines.length - 1 ; ++i) {
    let cells = csvDataLines[i].split(",");
    if(cells.length != 1) {
        cellstoData(cells);
        pushCells(cells);
    }
}

const expensiveValues = expensiveDataMap.keys();
const expensive:any[] = [];
for(const key of expensiveValues) {
    let i = 0;
    expensive.push(Array(2));
    expensive[i][0] =key;
    expensive[i][1] = expensiveDataMap.get(key); 
    i++;
}
console.log(expensive);



console.log('最高価格:#####円');
console.log('妥協価格:#####円');
console.log('理想価格:#####円');
console.log('最低品質保証価格:#####円');
