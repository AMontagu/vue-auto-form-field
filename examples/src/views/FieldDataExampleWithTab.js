const tabs = {
  displayIf: {
    "@label": "displayIf",
    "@data": {
      displayIfArray: {
        "@label": "displayIfArray",
        "@data": [
          {
            key1Item: {
              "@label": "key1Item",
              "@default": 1,
              "@options": {
                displayAs: "select",
                data: [
                  { label: "Choice 1", value: 1 },
                  { label: "Choice 2", value: 2 },
                  { label: "Choice 3", value: 3 }
                ]
              }
            },
            primitive: {
              "@label": "primitive",
              "@data": [
                {
                  item1: {
                    "@label": "item1",
                    "@default": "string",
                    "@options": {
                      displayIf: {
                        and: [
                          {
                            comparison: "equal",
                            value: 2,
                            path: "displayIf.simpleIfDisplay"
                          },
                          {
                            comparison: "equal",
                            value: 2,
                            path:
                              "displayIf.displayIfArray.[PLACEHOLDER].key1Item"
                          }
                        ],
                        or: [
                          {
                            comparison: "equal",
                            value: 3,
                            path: "displayIf.simpleIfDisplay"
                          }
                        ]
                      }
                    }
                  }
                }
              ]
            },
            keyItem2: {
              "@label": "keyItem2",
              "@default": ""
            }
          }
        ]
      },
      simpleIfDisplay: {
        "@label": "simpleIfDisplay",
        "@default": 1,
        "@options": {
          displayAs: "select",
          data: [
            { label: "Nothing", value: 1 },
            { label: "Display", value: 2 },
            { label: "Or", value: 3 }
          ]
        }
      },
      simpleIfDisplayTarget: {
        "@label": "simpleIfDisplayTarget",
        "@default": 1,
        "@options": {
          displayIf: {
            and: [
              {
                comparison: "equal",
                value: 2,
                path: "displayIf.simpleIfDisplay"
              }
            ]
          }
        }
      },
      specificCondition: {
        "@label": "specificCondition",
        "@default": "string"
      },
      specificConditionTarget: {
        "@label": "specificConditionTarget",
        "@default": "string",
        "@options": {
          displayIf: {
            and: [
              {
                comparison: "greater",
                value: 10,
                path: "displayIf.specificCondition"
              },
              {
                comparison: "less",
                value: 20,
                path: "displayIf.specificCondition"
              },
              {
                comparison: "notEqual",
                value: 15,
                path: "displayIf.specificCondition"
              }
            ]
          }
        }
      }
    }
  },
  classicData: {
    "@label": "classicData",
    "@data": {
      primitive: {
        "@label": "primitive",
        "@default": "string"
      },
      checkbox: {
        "@label": "checkbox",
        "@default": true,
        "@options": { displayAs: "checkbox" }
      },
      selectObject: {
        "@label": "selectObject",
        "@default": 1,
        "@options": {
          displayAs: "select",
          data: [
            { label: "Choice 1", value: 1 },
            { label: "Choice 2", value: 2 },
            { label: "Choice 3", value: 3 }
          ]
        }
      },
      selectArray: {
        "@label": "selectArray",
        "@default": 1,
        "@options": { displayAs: "select", data: [1, 2, 3] }
      },
      multipleCheckbox: {
        "@label": "multipleCheckbox",
        "@default": ["check1", "check4"],
        "@options": {
          displayAs: "multiplecheckbox",
          data: ["check1", "check2", "check3", "check4"]
        }
      },
      number: {
        "@label": "number",
        "@default": 42,
        "@options": { displayAs: "number" }
      },
      numberDecimal: {
        "@label": "numberDecimal",
        "@default": 42.42,
        "@options": { displayAs: "number", options: { step: 0.01 } }
      },
      durationDays: {
        "@label": "Duration Days Visualization",
        "@default": 134,
        "@options": {
          displayAs: "duration",
          data: {
            periods: ["years", "months", "days"]
          }
        }
      },
      durationMinutes: {
        "@label": "Duration Minutes Visualization",
        "@default": 60,
        "@options": {
          displayAs: "duration",
          data: {
            periods: ["hours", "minutes"],
            min: 9,
            max: 90
          }
        }
      },
      readOnly: {
        "@label": "readOnly",
        "@hint": "",
        "@default": "bla",
        "@options": { displayAs: "readonly" }
      },
      hidden: {
        "@label": "hidden",
        "@hint": "",
        "@default": "hidden",
        "@options": { displayAs: "hidden" }
      },
      slider: {
        "@label": "slider",
        "@hint": "",
        "@default": 300,
        "@options": {
          displayAs: "slider",
          data: { max: 1000, min: 100, step: 5 }
        }
      },
      password: {
        "@label": "password",
        "@hint": "",
        "@default": "pass",
        "@options": { displayAs: "password" }
      },
      datetime: {
        "@label": "datetime",
        "@hint": "",
        "@default": "01-07-2016 09:00",
        "@options": {
          displayAs: "datetime",
          data: { type: "datetime", format: "DD-MM-YYYY HH:mm" }
        }
      },
      date: {
        "@label": "date",
        "@hint": "",
        "@default": "01-07-2016",
        "@options": {
          displayAs: "datetime",
          data: { type: "date", format: "DD-MM-YYYY" }
        }
      },
      textArea: {
        "@label": "textArea",
        "@hint": "",
        "@default":
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        "@options": { displayAs: "textarea" }
      },
      colorPicker: {
        "@label": "colorPicker",
        "@hint": "",
        "@default": "#cacaca",
        "@options": { displayAs: "color" }
      }
    }
  },
  compositeData: {
    "@label": "compositeData",
    "@data": {
      array: {
        "@label": "Array",
        "@default": ["string1", "string2", "string3"]
      },
      object: {
        "@label": "object",
        "@data": {
          key1: {
            "@label": "key1",
            "@default": "key1Value"
          },
          key2: {
            "@label": "key2",
            "@default": "key2Value"
          }
        }
      },
      arrayObject: {
        "@label": "arrayObject",
        "@data": [
          {
            key1Item: {
              "@label": "key1Item",
              "@default": "string"
            },
            key2Item: {
              "@label": "key2Item",
              "@default": "string"
            }
          }
        ]
      },
      arrayObjectOfArrayObject: {
        "@label": "arrayObjectOfArrayObject",
        "@data": [
          {
            key1Item: {
              "@label": "key1Item",
              "@default": "string"
            },
            key2Item: {
              "@label": "key2Item",
              "@data": [
                {
                  key2Item1: {
                    "@label": "key2Item1",
                    "@default": "string"
                  },
                  key2Item2: {
                    "@label": "key2Item2",
                    "@default": "string"
                  }
                }
              ]
            }
          }
        ]
      }
    }
  },
  mediaData: {
    "@label": "mediaData",
    "@data": {
      image: {
        "@label": "image",
        "@hint": "",
        "@default": "images/loose.png",
        "@options": { displayAs: "image" }
      },
      sound: {
        "@label": "sound",
        "@hint": "",
        "@default": "sounds/loop.wav",
        "@options": { displayAs: "sound" }
      },
      video: {
        "@label": "video",
        "@hint": "",
        "@default": "videos/finalSonAmeliorer.mp4",
        "@options": { displayAs: "video" }
      },
      file: {
        "@label": "file",
        "@hint": "",
        "@default": "files/manifest.json",
        "@options": { displayAs: "file" }
      },
      map: {
        "@label": "map",
        "@hint": "",
        "@default": "~0",
        "@options": { displayAs: "map" }
      },
      media: {
        "@label": "media",
        "@hint": "",
        "@default": "images/loose.png",
        "@options": { displayAs: "media" }
      }
    }
  }
};

const data = {
  displayIf: {
    displayIfArray: [
      {
        key1Item: 1,
        primitive: [
          {
            item1: ""
          }
        ],
        keyItem2: ""
      },
      {
        key1Item: 1,
        primitive: [
          {
            item1: ""
          }
        ],
        keyItem2: ""
      }
    ],
    simpleIfDisplay: 2,
    simpleIfDisplayTarget: 1,
    specificCondition: "",
    specificConditionTarget: ""
  },
  classicData: {
    primitive: "string",
    checkbox: true,
    selectObject: 1,
    selectArray: 1,
    multipleCheckbox: ["check1", "check4"],
    number: 42,
    numberDecimal: 42.42,
    durationDays: 134,
    durationMinutes: 6000,
    readOnly: "bla",
    hidden: "hidden",
    slider: 300,
    password: "pass",
    datetime: "01-07-2016 09:00",
    date: "01-07-2016",
    textArea:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    colorPicker: "#cacaca"
  },
  compositeData: {
    array: ["string1", "string2", "string3"],
    object: {
      key1: "key1Value",
      key2: "key2Value"
    },
    arrayObject: [
      {
        key1Item: "string",
        key2Item: "string"
      },
      {
        key1Item: "string",
        key2Item: "string"
      }
    ],
    arrayObjectOfArrayObject: [
      {
        key1Item: "string",
        key2Item: [
          {
            key2Item1: "subString1",
            key2Item2: "subString2"
          }
        ]
      },
      {
        key1Item: "string",
        key2Item: [
          {
            key2Item1: "subString1",
            key2Item2: "subString2"
          }
        ]
      }
    ]
  },
  mediaData: {
    image: "images/loose.png",
    sound: "sounds/loop.wav",
    video: "videos/finalSonAmeliorer.mp4",
    file: "files/manifest.json",
    map: "~0",
    media: "images/loose.png"
  }
};

export default { tabs, data };
