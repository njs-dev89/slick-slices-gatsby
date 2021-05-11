import {MdStore as icon} from "react-icons/md"

export default {
    name: "storeSettings",
    title: "Settings",
    type: "document",
    icon: icon,
    fields: [
        {
            name: "name",
            title: "Store Settings",
            type: "string",
            description: "Name of the Store"
        },
        {
            name: "slicemaster",
            title: "Slicemasters currently Slicing",
            type: "array",
            of: [{type: "reference", to: [{type: "person"}]}]
        },
        {
            name: "hotSlices",
            title: "Hot Slices available in the case",
            type: "array",
            of: [{type: "reference", to: [{type: "pizza"}]}]
        }
    ],  
}