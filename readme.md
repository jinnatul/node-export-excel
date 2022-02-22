<div align='center'>

![npm](https://badgen.net/npm/v/node-export-excel)
![install size](https://badgen.net/packagephobia/install/node-export-excel)
![stars](https://badgen.net/github/stars/jinnatul/node-export-excel)
![npm](https://img.shields.io/npm/dw/node-export-excel)
![total downloads](https://badgen.net/npm/dt/node-export-excel)

</div>

## node-export-excel

```js
$ npm i node-export-excel
```

### Usage

- 1st parameter: Data array
- 2nd parameter: Each excel file size
```js
import { generateExcel } from 'node-export-excel'

app.get("/", async (req, res, next) => {
  try {
    const data = await generateExcel([{"a": 1, "b": 2, "c": 3}, {"a": 4, "b": 5, "c": 6}, {"a": 2, "b": 7, "c": 3}], 2);
    res.json({
      data
    });
  } catch (error) {
    next(error);
  }
});

```