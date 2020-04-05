import { Button, Divider } from "chromos";
import { RXForm, RXInput } from "ireact-components";

import React from "react";
import commonHelper from "../common/commonHelper";

const CollectionAudienceCard = ({
  segment: {
    bgUrl,
    price: { type, value },
    reach,
    segmentName,
    overview,
    insights,
    id
  },
  collectionId,
  onSegmentClick
}) => (
  <div
    className="collection-segments"
    data-testid="collection-segments"
    onClick={() => {
      onSegmentClick({ insights, id, collectionId });
    }}
  >
    <div className="collection-segments-img">
      <img src={bgUrl} />
    </div>
    <div className="collection-segments-details-container">
      <div className="collection-segments-details">
        <p className="collection-segments-name">{segmentName}</p>
        <p className="collection-segments-desc">{overview}</p>
      </div>
      <div className="collection-segments-price-container">
        <div className="collection-segments-reach">
          <div className="reach-count">{reach}</div>
          <div className="reach-text">
            {commonHelper.getString("collections.segmentcard.usertext")}
          </div>
        </div>
        <div className="collection-segments-price">
          <div className="price">{`$${value}`}</div>
          <div className="price-type">
            {commonHelper.getString(`collections.price.${type}`)}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default CollectionAudienceCard;
