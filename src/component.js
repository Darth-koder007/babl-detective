import { Column, Columns, Stack } from "chromos";
import { RXDropdown, RXElementGroup } from "ireact-components";
import React, { createRef, useEffect, useState } from "react";

import commonHelper from "../common/commonHelper";
import { getCollectionsNameService } from "../services/opsSegmentServices";
import { resetShowAllCollections } from "../../actions/audCollections/audCollectionsActions";

const CollectionsListWrapper = ({
  onValueChange,
  showAllCollections,
  dispatch,
}) => {
  const dropdownRef = createRef();
  const [key, setKey] = useState(Date.now());
  let fn;
  let inlinePopup;

  const [collectionsList, setCollectionsList] = useState([]);
  const country = commonHelper.getCountryName();

  useEffect(() => {
    const fetchCollections = async () => {
      const data = await getCollectionsNameService(country);
      setCollectionsList(data);
    };

    fetchCollections();
  }, [country]);

  useEffect(() => {
    const showCollectionsFn = () => {
      ({
        current: {
          refs: { inlinePopup },
        },
      } = dropdownRef);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      fn = () => {
        if (document.documentElement.scrollTop === 0) {
          inlinePopup.setState({ open: showAllCollections });
          window.removeEventListener("scroll", fn);
          resetShowAllCollections(dispatch);
        }
      };

      window.addEventListener("scroll", fn);
    };

    if (showAllCollections) {
      showCollectionsFn();
    }

    return function () {
      window.removeEventListener("scroll", fn);
    };
  }, [showAllCollections, dropdownRef]);
  const classNamePara = "className";

  return Array.isArray(collectionsList) && collectionsList.length > 0 ? (
    <>
      <RXElementGroup
        onValueChange={({ collectionName }) => {
          onValueChange({ collectionName });
          setKey(Date.now());
        }}
        key={key}
      >
        <RXDropdown
          name="collectionName"
          options={collectionsList}
          label={false}
          noSelectionLabel={commonHelper.getString(
            "audience.header.collections.name"
          )}
          ref={dropdownRef}
          className="classRXDropDown"
        />
      </RXElementGroup>
      <div className="classDiv" style={{ width: "100%" }}>
        hello
        <p className={classNamePara}>world</p>
      </div>
    </>
  ) : (
    ""
  );
};

export default CollectionsListWrapper;
