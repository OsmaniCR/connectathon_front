import React from 'react';
import { Button, Modal, Typography, Tooltip, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

const BaseModal = ({ 
  headTitle=null,
  title, 
  text, 
  component = <></>, 
  onOk = () => {} , 
  onCancel = () => {}, 
  isModalOpen, 
  setIsModalOpen,
  width=500,
  style={},
  bodyStyle={}
}) => {
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  
  return (
    <div className='flex flex-col justify-between w-full'>
      {headTitle ? <Title level={3}>{headTitle}</Title> : <></>}
      <div className='flex flex-row justify-between w-full'>
        <Button icon={<PlusOutlined />} onClick={showModal}>
          {text}
        </Button>
        <Input placeholder='Search' style={{width: "20%"}}/>
      </div>
      <Modal
        title={title}
        destroyOnClose
        okText="Aceptar"
        width={width}
        style={style}
        styles={{
          body: bodyStyle
        }}
        okButtonProps={{
          type: 'default',
          htmlType: 'submit',
        }}
        cancelButtonProps={{
          danger: true, 
          type: 'default'
        }}
        open={isModalOpen}
        onOk={onOk}
        onCancel={onCancel}
      >
        {component}
      </Modal>
    </div>
  );
};
export default BaseModal;
