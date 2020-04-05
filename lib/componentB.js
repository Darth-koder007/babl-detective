"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _chromos = require("chromos");

var _ireactComponents = require("ireact-components");

var _react = _interopRequireDefault(require("react"));

var _commonHelper = _interopRequireDefault(require("../common/commonHelper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CollectionAudienceCard = function CollectionAudienceCard(_ref) {
  var _ref$segment = _ref.segment,
      bgUrl = _ref$segment.bgUrl,
      _ref$segment$price = _ref$segment.price,
      type = _ref$segment$price.type,
      value = _ref$segment$price.value,
      reach = _ref$segment.reach,
      segmentName = _ref$segment.segmentName,
      overview = _ref$segment.overview,
      insights = _ref$segment.insights,
      id = _ref$segment.id,
      collectionId = _ref.collectionId,
      onSegmentClick = _ref.onSegmentClick;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "collection-segments",
    "data-testid": "collection-segments",
    onClick: function onClick() {
      onSegmentClick({
        insights: insights,
        id: id,
        collectionId: collectionId
      });
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "collection-segments-img"
  }, /*#__PURE__*/_react["default"].createElement("img", {
    src: bgUrl
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "collection-segments-details-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "collection-segments-details"
  }, /*#__PURE__*/_react["default"].createElement("p", {
    className: "collection-segments-name"
  }, segmentName), /*#__PURE__*/_react["default"].createElement("p", {
    className: "collection-segments-desc"
  }, overview)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "collection-segments-price-container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "collection-segments-reach"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "reach-count"
  }, reach), /*#__PURE__*/_react["default"].createElement("div", {
    className: "reach-text"
  }, _commonHelper["default"].getString("collections.segmentcard.usertext"))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "collection-segments-price"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "price"
  }, "$".concat(value)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "price-type"
  }, _commonHelper["default"].getString("collections.price.".concat(type)))))));
};

var _default = CollectionAudienceCard;
exports["default"] = _default;