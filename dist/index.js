"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generateExcel = undefined;

var _nodeExcelExport = require("node-excel-export");

var _nodeExcelExport2 = _interopRequireDefault(_nodeExcelExport);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var generateReport = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(data) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              try {
                if (!Array.isArray(data)) {
                  var error = new CustomError(data);
                  reject(error);
                }

                var styles = {
                  headerAshTwo: {
                    fill: {
                      fgColor: {
                        rgb: "B2BEB5"
                      }
                    },
                    font: {
                      color: {
                        rgb: "FFFFFFFF"
                      },
                      sz: 14,
                      bold: true,
                      underline: false
                    },
                    alignment: {
                      horizontal: "center"
                    }
                  },
                  headerAshOne: {
                    fill: {
                      fgColor: {
                        rgb: "66695C"
                      }
                    },
                    font: {
                      color: {
                        rgb: "FFFFFFFF"
                      },
                      sz: 14,
                      bold: true,
                      underline: false
                    },
                    alignment: {
                      horizontal: "center"
                    }
                  }
                };

                var width = [];
                var columnNames = [];
                Object.keys(data[0]).map(function (item) {
                  width.push({ wch: item.length * 10 });
                  columnNames.push(item);
                });
                for (var element in data) {
                  var value = Object.values(data[element]);
                  for (var j = 0; j < value.length; j++) {
                    if (value[j] !== null && value[j].length * 10 > width[j].wch) {
                      width[j].wch = value[j].length * 10;
                    }
                  }
                }

                var specification = {};
                for (var i = 0; i < columnNames.length; i++) {
                  specification[columnNames[i]] = {
                    displayName: columnNames[i],
                    headerStyle: i % 2 == 0 ? styles.headerAshOne : styles.headerAshTwo,
                    cellStyle: {
                      alignment: {
                        horizontal: "center"
                      }
                    },
                    width: width[i].wch
                  };
                }

                var report = _nodeExcelExport2.default.buildExport([{
                  name: "Report",
                  specification: specification,
                  data: data
                }]);
                resolve(report.toString("base64"));
              } catch (err) {
                if (!err.statusCode) {
                  err.statusCode = 500;
                }
                reject(err);
              }
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function generateReport(_x) {
    return _ref.apply(this, arguments);
  };
}();

var CustomError = function (_Error) {
  _inherits(CustomError, _Error);

  function CustomError(value) {
    var _ref2;

    _classCallCheck(this, CustomError);

    for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    var _this = _possibleConstructorReturn(this, (_ref2 = CustomError.__proto__ || Object.getPrototypeOf(CustomError)).call.apply(_ref2, [this].concat(params)));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_this, TypeError);
    }

    _this.name = "Input Error";
    if (!_this.message) {
      _this.message = "The value should be an Array";
    }
    return _this;
  }

  return CustomError;
}(Error);

var generateExcel = exports.generateExcel = function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(report, splitTarget) {
    var totalLength, parts, base64, tempBuffer, i, _tempBuffer;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            totalLength = report.length;
            parts = Math.ceil(totalLength / splitTarget);
            base64 = [];


            console.log("Total Data -> ", report.length);
            console.log("Total part -> ", parts);

            if (!(totalLength <= splitTarget)) {
              _context2.next = 12;
              break;
            }

            _context2.next = 8;
            return generateReport(report);

          case 8:
            tempBuffer = _context2.sent;

            base64.push(tempBuffer);
            _context2.next = 37;
            break;

          case 12:
            i = 0;

          case 13:
            if (!(i < parts)) {
              _context2.next = 37;
              break;
            }

            _tempBuffer = "";

            if (!(i === 0)) {
              _context2.next = 22;
              break;
            }

            _context2.next = 18;
            return generateReport(report.slice(0, (i + 1) * splitTarget));

          case 18:
            _tempBuffer = _context2.sent;

            console.log("Done -> " + (i + 1));
            _context2.next = 33;
            break;

          case 22:
            if (!(i + 1 === parts)) {
              _context2.next = 29;
              break;
            }

            _context2.next = 25;
            return generateReport(report.slice(i * splitTarget, report.length));

          case 25:
            _tempBuffer = _context2.sent;

            console.log("Done -> " + (i + 1));
            _context2.next = 33;
            break;

          case 29:
            _context2.next = 31;
            return generateReport(report.slice(i * splitTarget, (i + 1) * splitTarget));

          case 31:
            _tempBuffer = _context2.sent;

            console.log("Done -> " + (i + 1));

          case 33:
            base64.push(_tempBuffer);

          case 34:
            i++;
            _context2.next = 13;
            break;

          case 37:
            return _context2.abrupt("return", {
              parts: parts,
              base64: base64
            });

          case 38:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function generateExcel(_x2, _x3) {
    return _ref3.apply(this, arguments);
  };
}();