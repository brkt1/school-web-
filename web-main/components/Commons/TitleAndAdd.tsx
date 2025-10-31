import { isVisible } from '@/utils/visibility';
import { Button } from 'antd';
import { Header } from 'antd/es/layout/layout';
import React from 'react'
import { FiPlus } from 'react-icons/fi';
type propsType ={
    // title:string;
    addText:string;
    can_create:boolean;
    addData:()=>void;
}
function TitleAndAdd(props:propsType) {
  return (
    <> 
      <div className='flex justify-between items-center mb-6 mt-6'>
          {/* <h1 className="text-3xl font-bold text-custom_gray-900">{props.title}</h1> */}
            <Button className={`bg-custom_gray-200 text-custom_blue-900 py-3 flex items-center justify-center ${isVisible(props.can_create)}`} size={'large'}
            onClick={()=>props.addData()} >
                <FiPlus className='mr-2'/>
                  {props.addText}       
              </Button>
              
      </div>  
    </>
  )
}

export default TitleAndAdd