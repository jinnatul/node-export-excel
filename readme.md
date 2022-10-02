<div align='center'>

![npm](https://badgen.net/npm/v/node-export-excel)
![stars](https://badgen.net/github/stars/jinnatul/node-export-excel)
![npm](https://img.shields.io/npm/dw/node-export-excel)
![total downloads](https://badgen.net/npm/dt/node-export-excel)

</div>

## node-export-excel

```js
$ npm i node-export-excel
```

## Usage

### Backend

- 1st parameter: Data array
- 2nd parameter: Each excel file size

```js
import { generateExcel } from "node-export-excel";

app.get("/", async (req, res, next) => {
  try {
    const data = await generateExcel(
      [
        { a: 1, b: 2, c: 3 },
        { a: 4, b: 5, c: 6 },
        { a: 2, b: 7, c: 3 },
      ],
      2
    );
    res.json({
      data,
    });
  } catch (error) {
    next(error);
  }
});
```

### Frontend

```js
import * as FileSaver from "file-saver";

const onExport = (data, item) => {
  const { base64, parts } = data;
  for (let i = 0; i < parts; i++) {
    const blob = new Blob([base64ToArrayBuffer(base64[i])]);
    if (parts === 1) FileSaver.saveAs(blob, `${item.report_name}.xlsx`);
    else FileSaver.saveAs(blob, `${item.report_name}_part_${i + 1}.xlsx`);
  }
};

const base64ToArrayBuffer = (base64) => {
  const binaryString = window.atob(base64);
  const binaryLen = binaryString.length;
  let bytes = new Uint8Array(binaryLen);
  for (let i = 0; i < binaryLen; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
};

// API response
const data = {
  parts: 2, // 2 Excel files
  base64: ["BUFFER DATA 1", "BUFFER DATA 2"],
};

const item = {
  report_name: "Excel report",
};

if (data.base64[0].length > 0) {
  onExport(data, item);
}
```

If you like, Give a star ⭐

<h3 align="left"> 🧡 Support:</h3>
<p><a href="https://www.buymeacoffee.com/jinnatul"> <img align="left" src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" height="50" width="210" alt="Morol" /></a></p>
