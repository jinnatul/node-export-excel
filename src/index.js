import excel from 'node-excel-export'

const generateReport = async (data) => {
  return new Promise((resolve, reject) => {
    try {
      if (!Array.isArray(data)) {
        const error = new CustomError(data);
        reject(error);
      }

      const styles = {
        headerAshTwo: {
          fill: {
            fgColor: {
              rgb: "B2BEB5",
            },
          },
          font: {
            color: {
              rgb: "FFFFFFFF",
            },
            sz: 14,
            bold: true,
            underline: false,
          },
          alignment: {
            horizontal: "center",
          },
        },
        headerAshOne: {
          fill: {
            fgColor: {
              rgb: "66695C",
            },
          },
          font: {
            color: {
              rgb: "FFFFFFFF",
            },
            sz: 14,
            bold: true,
            underline: false,
          },
          alignment: {
            horizontal: "center",
          },
        },
      };

      let width = [];
      let columnNames = [];
      Object.keys(data[0]).map((item) => {
        width.push({ wch: item.length * 10 });
        columnNames.push(item);
      });
      for (const element in data) {
        let value = Object.values(data[element]);
        for (let j = 0; j < value.length; j++) {
          if (value[j] !== null && value[j].length * 10 > width[j].wch) {
            width[j].wch = value[j].length * 10;
          }
        }
      }

      let specification = {};
      for (let i = 0; i < columnNames.length; i++) {
        specification[columnNames[i]] = {
          displayName: columnNames[i],
          headerStyle: i % 2 == 0 ? styles.headerAshOne : styles.headerAshTwo,
          cellStyle: {
            alignment: {
              horizontal: "center",
            },
          },
          width: width[i].wch,
        };
      }

      const report = excel.buildExport([
        {
          name: "Report",
          specification: specification,
          data: data,
        },
      ]);
      resolve(report.toString("base64"));
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      reject(err);
    }
  });
};

class CustomError extends Error {
  constructor(value, ...params) {
    super(...params);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TypeError);
    }

    this.name = "Input Error";
    if (!this.message) {
      this.message = `The value should be an Array`;
    }
  }
}

export const generateExcel = async (report, splitTarget) => {
  const totalLength = report.length;
  const parts = Math.ceil(totalLength / splitTarget);
  const base64 = [];

  console.log("Total Data -> ", report.length);
  console.log("Total part -> ", parts);

  if (totalLength <= splitTarget) {
    const tempBuffer = await generateReport(report);
    base64.push(tempBuffer);
  } else {
    for (let i = 0; i < parts; i++) {
      let tempBuffer = "";
      if (i === 0) {
        tempBuffer = await generateReport(
          report.slice(0, (i + 1) * splitTarget)
        );
        console.log(`Done -> ${i + 1}`);
      } else if (i + 1 === parts) {
        tempBuffer = await generateReport(
          report.slice(i * splitTarget, report.length)
        );
        console.log(`Done -> ${i + 1}`);
      } else {
        tempBuffer = await generateReport(
          report.slice(i * splitTarget, (i + 1) * splitTarget)
        );
        console.log(`Done -> ${i + 1}`);
      }
      base64.push(tempBuffer);
    }
  }

  return {
    parts,
    base64,
  };
};
