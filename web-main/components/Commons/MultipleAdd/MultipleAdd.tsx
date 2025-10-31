// import { deleteFromArrayByValue, deleteValueFromArray, getByKey, getIndexKey } from "@/utils/array";
// import { isVisible } from "@/utils/visibility";
// import { ArrowRightOutlined } from "@ant-design/icons";
// import { Button, Card, Collapse, CollapseProps } from "antd";
// import React, { ReactElement } from "react";
// import { ReactNode, useEffect, useState } from "react";
// import { DeleteOutlined } from "@ant-design/icons";
// import { ElementType } from "@/utils/enums";

// interface MultipleAddProps {
//     children: ReactElement,
//     type?: ElementType,
//     title?:string;
//     setItems?: (value: any) => void;
//     setDisabled?: (value: boolean) => void;
//     headerTitle?: (input: any) => JSX.Element | string
//     footer?: JSX.Element | string
//     handleSave: (items: any) => void
// }

// const MultipleAdd = (props: MultipleAddProps) => {

//     const { type = ElementType.Collapse } = props;
//     const [items, setItems] = useState<CollapseProps['items']>([])
//     const [num, setNum] = useState<number>(0)
//     const genExtra = (key?: any) => (
//         <DeleteOutlined
//           onClick={(event) => {
//             event.stopPropagation();
//             handleDelete(key)
//           }}
//         />
//       );

//     const handleDelete = (key?: number) => {
//         if(items?.length && key !=null){
//             const newItems = deleteFromArrayByValue(items, 'key', key)
//             setItems(newItems)
//         }
//     }

//     const handleUpdate = (key?: number, element?: any) => {
//         if(items?.length && key !=null){
//             const convItem = getByKey(items, 'key', key);
//             const newItems = [...items]
//             newItems[getIndexKey(items, 'key', key)] = {...convItem, ...element}
//             setItems(newItems)
//         }
//     }

//     const renderComponents = () => items?.map((item) => ({key: item.key, label: props.headerTitle && props.headerTitle(item), children: updateElement(item), extra: genExtra(item.key)}))
    

//     useEffect(() => {
//         props.setItems?.(items)
//         props.setDisabled?.((items?.length || 0) > 0);
//     }, [items])

//     const render_components = () => {
//         return items?.map((item, index) => (
//             <div key={index} className="flex">
//             <div className="w-full" >
//                 { updateElement(item)}
//             </div>

//             <div className="mt-5 mr-3">
//                 {genExtra(item.key)}
//             </div>
//         </div>
//         ))
//     }


//     const render = (input: any) => {
//         const newItems = items ? [{key: num,...input}, ...items]: [{key: num,...input}]
//         setItems(newItems)
//         setNum(num + 1)
//     }

//     const addElement = React.cloneElement(props.children, {
//         handleAdd: render, items, key:"current"
//     });


//     const updateElement = (input: any) => React.cloneElement(props.children, {
//         detail: input,
//         handleUpdate: (element: any) => handleUpdate(input.key, element),
//         items,
//     })


//     return <div className="mt-8 mb-3">
//         <h1 className={`p-2 text-center ${isVisible(props.title != undefined)}`}> {props.title}</h1>
//         <div>
//             {addElement}
//             <i className="block w-full text-lg font-bold text-center text-red-4">
//                 Remember: Click the plus button to save the information above.
//             </i>
//         </div>
//         <hr />
//         {type == ElementType.Collapse && <div className={`px-10 mt-4 flex-col`}>
//             <Collapse accordion={false} items={renderComponents()}/>
//         </div>}
//         {type == ElementType.Card && <div>
//             {render_components()}
//         </div>}
//         <br />
//         {props.footer && props.footer}
//         <Button
// 							className="flex px-6 ml-auto mr-10"
// 							type="primary"
// 							onClick={() => props.handleSave(items)}
// 						>
// 							Save
// 						</Button>
//     </div>

// }

// export default MultipleAdd