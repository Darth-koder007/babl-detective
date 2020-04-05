"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _chromos = require("chromos");

var _ireactComponents = require("ireact-components");

var _react = _interopRequireWildcard(require("react"));

var _commonHelper = _interopRequireDefault(require("../common/commonHelper"));

var _opsSegmentServices = require("../services/opsSegmentServices");

var _audCollectionsActions = require("../../actions/audCollections/audCollectionsActions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CollectionsListWrapper = function CollectionsListWrapper(_ref) {
  var _onValueChange = _ref.onValueChange,
      showAllCollections = _ref.showAllCollections,
      dispatch = _ref.dispatch;
  var dropdownRef = (0, _react.createRef)();

  var _useState = (0, _react.useState)(Date.now()),
      _useState2 = _slicedToArray(_useState, 2),
      key = _useState2[0],
      setKey = _useState2[1];

  var _fn;

  var inlinePopup;

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      collectionsList = _useState4[0],
      setCollectionsList = _useState4[1];

  var country = _commonHelper["default"].getCountryName();

  (0, _react.useEffect)(function () {
    var fetchCollections = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return (0, _opsSegmentServices.getCollectionsNameService)(country);

              case 2:
                data = _context.sent;
                setCollectionsList(data);

              case 4:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function fetchCollections() {
        return _ref2.apply(this, arguments);
      };
    }();

    fetchCollections();
  }, [country]);
  (0, _react.useEffect)(function () {
    var showCollectionsFn = function showCollectionsFn() {
      inlinePopup = dropdownRef.current.refs.inlinePopup;
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

      _fn = function fn() {
        if (document.documentElement.scrollTop === 0) {
          inlinePopup.setState({
            open: showAllCollections
          });
          window.removeEventListener("scroll", _fn);
          (0, _audCollectionsActions.resetShowAllCollections)(dispatch);
        }
      };

      window.addEventListener("scroll", _fn);
    };

    if (showAllCollections) {
      showCollectionsFn();
    }

    return function () {
      window.removeEventListener("scroll", _fn);
    };
  }, [showAllCollections, dropdownRef]);
  var classNamePara = "className";
  return Array.isArray(collectionsList) && collectionsList.length > 0 ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_ireactComponents.RXElementGroup, {
    onValueChange: function onValueChange(_ref3) {
      var collectionName = _ref3.collectionName;

      _onValueChange({
        collectionName: collectionName
      });

      setKey(Date.now());
    },
    key: key
  }, /*#__PURE__*/_react["default"].createElement(_ireactComponents.RXDropdown, {
    name: "collectionName",
    options: collectionsList,
    label: false,
    noSelectionLabel: _commonHelper["default"].getString("audience.header.collections.name"),
    ref: dropdownRef,
    className: "classRXDropDown"
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "classDiv"
  }, "hello", /*#__PURE__*/_react["default"].createElement("p", {
    className: classNamePara
  }, "world"))) : "";
};

var _default = CollectionsListWrapper;
exports["default"] = _default;