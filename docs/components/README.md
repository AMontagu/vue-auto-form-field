---
sidebar: auto
---

# Components

Components in Vue auto from field are separated in 3 groups:
- Multi field components
- Single field components
- Media components (sub part of single file components)

## Multi field components

The multi field components exist to read json and transform it into a form structure. The different components are:
- Vaff
- VaffArrayField
- VaffArrayOofObjectField
- VaffObjectField

You should only use Vaff component the other are helper and are called by Vaff depending of your options

The props are:

| prop  |  description |  type |  default/required |
|---|---|---|---|---|
|  identifier |  Identifier used as key in vuex store. Helpful fo debug | String | required |
|  field |  The field object used to construct the form. Its an object or an array composed of one of more field structure. [See field structure documentation](/guide/#field-structure)  | Object, Array  | required |
|  value |  The value used to fill the form.  [See value structure documentation](/guide/#value-structure) | String, Number, Boolean, Array, Object, Date  | required |
|  showDownload |  On array of object a download button appear to let you download the value as json file  | Boolean | default: false |
|  showAdd |  Show add button for array. If false that mean you can only edit existing item and not add new. | Boolean | default: true |
|  useDivider |  Use a visual divider between field | Boolean | default: true |
|  visualStyle |  Change the visual style of your fields. The possible values are: separate, inline, solo, outline | String | default: "separate" |
|  itemsPerRow |  Choose how many items you want on a row | Number | default: 1 |
|  showHeader |  Display header above array and object field to mark separation between multi fields | Boolean | default: true |
|  headername |  Choose the text for the multi field object if showHeader is true| String | default: "" |
|  path |  Prop used to keep track of value. You should not use it expect if you now what you are doing. | String | default: "" |


Vaff components allow three more props to allow groups field inside a tabulation navbar but its still experimental and not documented. You can see some example to understand how to use it.


## Single field components

The single field components are called by the multi field components when they reach a final field. You can use it directly but is recommended to pass by vaff components. The different components are:
- VaffField
- VaffColorField (will be deleted when Vuetify will integrate its own)
- VaffDateTimeField
- VaffDurationField
- VaffPasswordField
- VaffMediaField

Basically VaffField get a field structure as props and extract from its options the props required by other components. I will only document the props used by VaffField. If you are interested by other components you can look directly to to code of [ask me for it](mailto:adrienmontagu@gmail.com)



| prop  |  description |  type |  default/required |
|---|---|---|---|---|
|  field |  The field object used to construct the filed. [See field structure documentation](/guide/#field-structure)  | Object  | required |
|  value |  The value used to fill the field. | String, Number, Boolean, Array, Object, Date  | required |
|  identifier |  Identifier used for dynamic url media. | String | required |
|  visualStyle |  Change the visual style of your field. The possible values are: separate, inline, solo, outline | String | default: "separate" |


## Media Components

Media components are used to simulate a media picker (images, video, sound and files) and dynamically add media to the list with an upload component.
I am thinking about externalise it into an other library to have a media picker but for now it's included into Vaff.

To avoid passing props from Vaff principal components to media components they are passed as [global options to the library](/guide/#vaff-global-options).

I will not develop this configuration because is not the core of the project. If it's a feature often used I will separate in an other lib and create a separated lib.



| options  |  description |  type |
|---|---|---|---|---|
|  baseUrl |  Server base url to get media from | String |
|  storageConfigs |  Array containing an object for each media storage you have and allow every different storage to have its own configuration  | Array |


- Storage Config object properties:

| options  |  description |  type |
|---|---|---|---|---|
|  name |  The name of the storage displayed in the media picker | String |
|  storage |  The link to the storage | String |
|  get |  Url to get an object of list of media url. ex: {images: ['/foo.jpg'], sound: [] }. We have the possibility to send file with WebSocket but its experimental and without documentation. I will try to make example soon | String, Object |
|  post |  Url where to post new media. If you use WebSocket you need to pass an object. Need to create documentation on this. | String, Object |
|  remove |  Url where to remove media. If you use WebSocket you need to pass an object. Need to create documentation on this. | String |
|  download |  Url to download media | String |
|  query |  Object allowing you to add specific query to all your server request. Usefull if your media are protected by a token restriction | Object |
|  useStorageAsPrefix |  Use the storage options value as url prefix for the other url  | Boolean |
|  useIdentifier |  Find {identifer} pattern in urls and replace it with the identifier passed in props of VaffMediaField | Boolean |
|  useBaseUrl |  Use the base url specified in global for this storage | Boolean |


In waiting for further documentation this is an example of VaffMedia options:

```
{
    baseUrl: '/users',
    storageConfigs: [
        {
            name: 'UsersMedia',
            storage: '/{identifier}/media',
            useStorageAsPrefix: true,
            useIdentifier: true,
            useBaseUrl: true,
            get: '/',
            post: '/',
            remove: '/',
            download: '/download',
            query: {
                token: 'yourtoken',
            },
        },
        {
            name: 'GlobalMedia',
            storage: '/storage/media',
            get: '/storage/media/',
            post: '/storage/media/',
            remove: '/storage/media/',
            download: '/storage/media/',
            query: {
                token: 'yourtoken',
            },
        },
    ],
}
```

