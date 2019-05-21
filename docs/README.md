---
home: true
heroImage:
actionText: Get Started →
actionLink: /guide
features:
  - title: Feature 1
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  - title: Feature 2
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
  - title: Feature 3
    details: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
footer: Vue Component Library 2019
---

# Vue Auto Form Field


## Data

This field is not mandatory. It allows you to specify data used the first time an app is ulpoaded. This data can be different from the default values. It is closely related to the tabs field.

If a value is not specified in the data object, the default value in the tabs field will be used. This way you only have to specify data different from the default data.

```json

"data": {
  "Images": {
    "block1": {
      "name": "hease",
      "path": "hs-img/jackpot-icons/hease.png"
    },

    "block2": {
      "name": "brain",
      "path": "hs-img/jackpot-icons/brain.png"
    },
  },
  "Algo": {
    "winnerNumberByHours": 2,
    "currentWinnerNumber": 1
  }
}
```

## Tabs

Tabs field is one of the most complicated field of the hease manifest. But don't be afraid! Once you understand it, it allows a high level of configuration for your app/module in the LAB.

Tabs is a json object in which each key actually represents a tab in the app/module details of the LAB.

For example, jackpot looks like this:

<img :src="$withBase('/images/labtab.png')" alt="foo">
<img :src="$withBase('/images/labtabimg.png')" alt="foo">

Then all the input fields will be declared inside this sub JSON object. Each sub JSON object describes data saved in the database.

A sub JSON object always has at least 2 fields:

**@label:** The label of the input in the LAB

**@default:** The default value of the variable when created in the database.

2 others fields exist but are optional:

**@hint:** This is an extra description of the variable displayed in the LAB. Use it if the label is not enough to understand the meaning.

**@options:** A JSON object to configure the input visualization in the LAB. See above for all the configuration possible.

> How the variables for tab general are created:

```json
"tabs": {
  "General": {
    "@label": "General",
    "@data": {
      "myText": {
        "@label": "My label",
        "@hint": "My hint (optional)",
        "@default": "My default text is here"
      },
      "myCheckbox": {
        "@label": "My label",
        "@hint": "",
        "@options": { "displayAs": "checkbox" },
        "@default": false
      },
      "myCheckboxWithIfCondition": {
        "@label": "My label",
        "@hint": "",
        "@options": {
          "displayAs": "checkbox",
          "displayIf": {
            "and": [
              {
                "comparaison": "equal",
                "value": true,
                "path": "General.myCheckbox"
              }
            ]
          }
        },
        "default": true
      },
      "myTextAreaWithTwoIfCondition": {
        "@label": "My label",
        "@hint": "",
        "@options": {
          "displayAs": "textarea",
          "displayIf": {
            "and": [
              {
                "comparaison": "equal",
                "value": true,
                "path": "General.myCheckbox"
              },
              {
                "comparaison": "equal",
                "value": true,
                "path": "General.myCheckboxWithIfCondition"
              }
            ]
          }
        },
        "default": ""
      }
    }
  },
  "Images": {
    "@label": "Image",
    "@data": {
      "block1": {
        "@label": "block 1",
        "@data": {
          "name": {
            "@label": "Image name",
            "@hint": "",
            "@default": ""
          },
          "path": {
            "@label": "Image Path",
            "@hint": "",
            "@options": { "displayAs": "image" },
            "@default": ""
          }
        }
      },
      "block2": {
        "@label": "Block 2",
        "@data": {
          "name": {
            "@label": "Victory Image",
            "@hint": "Determine a name for your image",
            "@default": ""
          },
          "path": {
            "@label": "Image Path",
            "@hint": "",
            "@options": { "displayAs": "image" },
            "@default": ""
          }
        }
      }
    }
  },
  "Algo": {
    "@label": "Jackpot Algo",
    "@data": {
      "myNumber": {
        "@label": "My number",
        "@hint": "Number between 1 and 100",
        "@options": { "displayAs": "number" },
        "@default": 2
      },
      "myHiddenData": {
        "@label": "",
        "@hint": "",
        "@options": { "displayAs": "hidden" },
        "@default": "2017-11-23T15:19:00.000Z"
      },
      "myTab": {
        "@label": "My table",
        "@data": [
          {
            "myText": {
              "@label": "My text",
              "@hint": "",
              "@default": ""
            },
            "myCheckbox": {
              "@label": "My checkbox",
              "@hint": "",
              "@options": { "displayAs": "checkbox" },
              "@default": ""
            }
          }
        ]
      }
    }
  }
}
```

## Translation

In order to add a translation to your manifest element, you have to transform the value to an object containing the different langages as keys.

....
"myObject": "my translation"
....

become

....
"myObject" : {
  "fr": "ma traduction",
  "en": "my translation"
}
...

### Translation possibilities

#### title

> Code in hease-manifest.json file

```json
{
  "title": {
    "en": "My Title",
    "fr": "Mon Titre"
  }
}

```

#### description
> Code in hease-manifest.json file

```json
{
  "description": {
    "en": "My Description",
    "fr": "Mon Titre"
  }
}

```

#### table/label/hint/optionsLabel
> Code in hease-manifest.json file

```json
{
  "tabs": {
    "General": {
      "@label": {
        "en": "General",
        "fr": "Général"
      },
      "@data": {
        "input": {
          "@label": {
            "en": "Label",
            "fr": "Label"
          },
          "@hint": {
            "en": "Hint",
            "fr": "Descriptife"
          },
          "@options": {
            "displayAs": "select",
            "data": [
              {
                "label": {
                  "en": "Number 1",
                  "fr": "Nombre 1"
                },
                "value": 1
              }
            ]
          },
          "@default": "input",
        }
      }
    }
  }
}
```


## Variable visualization

### Primitive

> Code in hease-manifest.json file

```json
"primitive": {
  "@label": "Primitive Visualization",
  "@hint": "optional",
  "@default": "string"
}
```
> Preview in LAB

<img :src="$withBase('/images//visualization/primitive.png')" alt="foo">

------------

### Array

> Code in hease-manifest.json file

```json
"array": {
  "@label": "Array Visualization",
  "@default": ["string1", "string2", "string3"]
}
```

> Preview in LAB

<img :src="$withBase('/images//visualization/array.png')" alt="foo">

------------

### Object

> Code in hease-manifest.json file

```json
"object": {
  "@label": "object",
  "@data": {
    "key1": {
      "@label": "key1 Visualization",
      "@default": "key1Value"
    },
    "key2": {
      "@label": "key2 Visualization",
      "@default": "key2Value"
    }
  }
}
```

::: tip
You can add a label on the object
:::
::: warning
When the field is in object, you need to encompass the object in "@data" object.
:::

> Preview in LAB

<img :src="$withBase('/images//visualization/object.png')" alt="foo">

------------

### Array of Object

> Code in hease-manifest.json file

```json
"arrayObject": {
  "@label": "Array of Object",
  "@data": [
    {
      "key1Item": {
        "@label": "key1 of item",
        "@default": "string"
      },
      "key2Item": {
        "@label": "key2 of item",
        "@default": "string"
      }
    }
  ]
}

```

::: tip
You can add a label on the array of object
:::
::: warning
When the field is an array of object, you need to encompass the array in "@data" object.
:::


> Preview in LAB

<img :src="$withBase('/images//visualization/arrayOfObject.png')" alt="foo">

------------

### Checkbox

> Code in hease-manifest.json file

```json
"checkbox": {
  "@label": "Chekbox Visualization",
  "@default": true,
  "@options": {"displayAs": "checkbox"}
}
```

**data:** Nothing

> Preview in LAB

<img :src="$withBase('/images//visualization/checkbox.png')" alt="foo">

------------

### Select Object

> Code in hease-manifest.json file

```json
"selectObject": {
  "@label": "Select Object Visualization",
  "@default": 1,
  "@options": {"displayAs": "select", "data": [
    {"label": "Choice 1", "value": 1},
    {"label": "Choice 2", "value": 2},
    {"label": "Choice 2", "value": 3}
  ]}
}
```

**data:** Array of choice or Array of object: {"label": "choice 1", "value": "1"}

> Preview in LAB

<img :src="$withBase('/images//visualization/selectObject.png')" alt="foo">

------------

### Select Array

> Code in hease-manifest.json file

```json
"selectArray": {
  "@label": "Select Array Visualization",
  "@default": 1,
  "@options": {"displayAs": "select", "data": [1,2,3]}
}
```

**data:** Array of choice or Array of object: {"label": "choice 1", "value": "1"}

> Preview in LAB

<img :src="$withBase('/images//visualization/selectArray.png')" alt="foo">

------------

### Specific or general media

> Code in hease-manifest.json file

```json
"image": {
  "@label": "image",
  "@hint": "",
  "@default": "images/loose.png",
  "@options": {"displayAs": "image"}
},
"sound": {
  "@label": "sound",
  "@hint": "",
  "@default": "sounds/loop.wav",
  "@options": {"displayAs": "sound"}
},
"video": {
  "@label": "video",
  "@hint": "",
  "@default": "videos/finalSonAmeliorer.mp4",
  "@options": {"displayAs": "video"}
},
"file": {
  "@label": "file",
  "@hint": "",
  "@default": "files/manifest.json",
  "@options": {"displayAs": "file"}
},
"media": {
  "@label": "media",
  "@hint": "",
  "@default": "images/loose.png",
  "@options": {"displayAs": "media"}
}

```

**data:** Nothing

> Preview in LAB

<img :src="$withBase('/images//visualization/media.png')" alt="foo">

------------

### Multiple Checkbox

> Code in hease-manifest.json file

```json
"multipleCheckbox": {
  "@label": "Multiple Checkbox Visualization",
  "@default": ["check1", "check4"],
  "@options": {"displayAs": "multiplecheckbox", "data": ["check1", "check2", "check3", "check4"]}
}

```

**data:** Array of choice possible to enable and disable or Array of object: {"label": "choice 1", "value": "1"}

> Preview in LAB

<img :src="$withBase('/images//visualization/multiplecheckbox.png')" alt="foo">

------------

### number

> Code in hease-manifest.json file

```json
"number": {
  "@label": "Number Visualization",
  "@default": 42,
  "@options": {"displayAs": "number"}
}
```

**data:** Object with 1 key: step. For allowing float number. Default is 60

> Preview in LAB

<img :src="$withBase('/images//visualization/number.png')" alt="foo">

------------

### durationDays

> Code in hease-manifest.json file

```json
"durationDays": {
  "@label": "Duration Days Visualization",
  "@default": 25,
  "@options": {
    "displayAs": "duration",
    "data": {
      "periods" : ["years", "months", "days"],
      "min": 5,
      "max": 50
    }
}
```

**data:** Object with 3 possible keys: "periods", "min" and "max":

- periods: Array of time units to display: ["years", "months", "days", "hours", "minutes", "seconds"]<br>
       The unit of the value depend of the smaller time unit in the array.
       Ex: ["years", "months", "days"] returns a number of days
       And ["hours", "minutes"] returns a number of minutes

- min: Integer representing the value of minimum duration value representing as the smaller time unit precised in periods key.<br>
        Ex: if min equal 90 for periods ["hours", "minutes"] this mean a minimal value equal to 1 hour and 30 minutes

- max: Integer representing the value of maximum duration value representing as the smaller time unit precised in periods key.<br>
        Ex: if min equal 730 for periods ["years", "months", "days"] this mean a maximal value equal to 2 years


> Preview in LAB

<img :src="$withBase('/images//visualization/durationDays.png')" alt="foo">

------------

### durationMinutes

> Code in hease-manifest.json file

```json
"durationMinutes": {
  "@label": "Duration Minutes Visualization",
  "@default": 25,
  "@options": {
        "displayAs": "duration",
        "data": {
            "periods" : ["hours", "minutes"],
            "min": 5,
            "max": 50,
        }
    }
}

```

**data:** Object with 3 possible keys: "periods", "min" and "max":

- periods: Array of time units to display: ["years", "months", "days", "hours", "minutes", "seconds"]<br>
       The unit of the value depend of the smaller time unit in the array.
       Ex: ["years", "months", "days"] returns a number of days
       And ["hours", "minutes"] returns a number of minutes

- min: Integer representing the value of minimum duration value representing as the smaller time unit precised in periods key.<br>
        Ex: if min equal 90 for periods ["hours", "minutes"] this mean a minimal value equal to 1 hour and 30 minutes

- max: Integer representing the value of maximum duration value representing as the smaller time unit precised in periods key.<br>
        Ex: if min equal 730 for periods ["years", "months", "days"] this mean a maximal value equal to 2 years

> Preview in LAB

<img :src="$withBase('/images//visualization/durationMinutes.png')" alt="foo">

------------

### readOnly

> Code in hease-manifest.json file

```json
"readOnly": {
  "@label": "readOnly",
  "@hint": "",
  "@default": "foo",
  "@options": {"displayAs": "readonly"}
}
```

**data:** Nothing

> Preview in LAB

<img :src="$withBase('/images//visualization/readonly.png')" alt="foo">

------------

### hidden

> Code in hease-manifest.json file

```json
"hidden": {
  "@label": "hidden",
  "@hint": "",
  "@default": "bar",
  "@options": {"displayAs": "hidden"}
}
```

**data:** Nothing

> Preview in LAB

**No Display**

------------

### password

> Code in hease-manifest.json file

```json
"password": {
  "@label": "password",
  "@hint": "",
  "@default": "mySecretPassword",
  "@options": {"displayAs": "password"}
}
```

**data:** Nothing

> Preview in LAB

<img :src="$withBase('/images//visualization/password.png')" alt="foo">

------------

### datetime, date and time

> Code in hease-manifest.json file

```json
"date": {
  "@label": "date",
  "@hint": "",
  "@default": "01-07-2016",
  "@options": {"displayAs": "datetime", "data": {"type": "date", "format": "DD-MM-YYYY", "dateFormat": "YYYY-MM-DD"}}
}
```
**data:** Object with three keys: type, format and dateFormat. Type can be date, datetime ot time depend of the element you want to see on the picker. Format is the date format you want when we update the value with the date picker. DateFormat is the format used to display the date on the label (please use only format like YYYY-MM-DD and not like YYYY-MM-DDTHH:mm:ssZ for this one).
Ex: {"type": "date", "format": "DD-MM-YYYY", "dateFormat": "YYYY-MM-DD"}
     {"type": "datetime", "format: "DD-MM-YYYYTHH:mm:ss", "dateFormat": "YYYY-MM-DD"}
     {"type": "time", "format: "HH:mm:ss"}

> Preview in LAB

<img :src="$withBase('/images//visualization/datetime.png')" alt="foo">

<img :src="$withBase('/images//visualization/datepicker.png')" alt="foo">

------------

### slider

> Code in hease-manifest.json file

```json
"slider": {
  "@label": "slider",
  "@hint": "",
  "@default": 300,
  "@options": {"displayAs": "slider", "data": {"min": 100, "max": 1000, "step": 5}}
}
```

**data:** Object with 3 keys helping to define to slider parameters: max, min and step. Default: max: 100, min: 0, step: 1

> Preview in LAB

<img :src="$withBase('/images//visualization/slider.png')" alt="foo">

------------

### textarea

> Code in hease-manifest.json file

```json
"textarea": {
  "@label": "textarea",
  "@hint": "",
  "@default": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  "@options": {"displayAs": "textarea"}
}

```

**data:** Nothing

> Preview in LAB

<img :src="$withBase('/images//visualization/textarea.png')" alt="foo">

------------

### color

> Code in hease-manifest.json file

```json
"color": {
  "@label": "color",
  "@hint": "",
  "@default": "#6A1BBD",
  "@options": {"displayAs": "color"}
}
```

**data:** Nothing

> Preview in LAB

<img :src="$withBase('/images//visualization/color.png')" alt="foo">

<img :src="$withBase('/images//visualization/colorPicker.png')" alt="foo">