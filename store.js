class Store {
  constructor() {
    this.store = {};
  }

  addProject(projectName) {
    this.store = {
      [projectName]: {
        styleNamePropCount: 0,
        importCollection: {},
        nativeElementList: {},
        classNameList: {},
      },
    };
  }

  updateStyleNamePropCount(projectName) {
    if (!projectName) {
      return;
    }
    const val = this.store[projectName].styleNamePropCount;
    this.store[projectName].styleNamePropCount = val + 1;
  }

  updateImportCollection(projectName, importName, importedIdentifier) {
    if (
      Object.prototype.hasOwnProperty.call(
        this.store[projectName].importCollection,
        importName
      )
    ) {
      if (
        Object.prototype.hasOwnProperty.call(
          this.store[projectName].importCollection[importName],
          importedIdentifier
        )
      ) {
        const value = this.store[projectName].importCollection[importName][
          importedIdentifier
        ];
        this.store[projectName].importCollection[importName][
          importedIdentifier
        ] = value + 1;
      } else {
        Object.assign(this.store[projectName].importCollection[importName], {
          [importedIdentifier]: 1,
        });
      }
    } else {
      Object.assign(this.store[projectName].importCollection, {
        [importName]: {
          [importedIdentifier]: 1,
        },
      });
    }
  }

  updateNativeElementList(projectName, elementName) {
    if (
      Object.prototype.hasOwnProperty.call(
        this.store[projectName].nativeElementList,
        elementName
      )
    ) {
      const value = this.store[projectName].nativeElementList[elementName];
      this.store[projectName].nativeElementList[elementName] = value + 1;
    } else {
      this.store[projectName].nativeElementList[elementName] = 1;
    }
  }

  updateClassNameList(projectName, className) {
    if (
      Object.prototype.hasOwnProperty.call(
        this.store[projectName].classNameList,
        className
      )
    ) {
      const value = this.store[projectName].classNameList[className];
      this.store[projectName].classNameList[className] = value + 1;
    } else {
      this.store[projectName].classNameList[className] = 1;
    }
  }

  getStore() {
    return this.store;
  }
}

module.exports = new Store();
