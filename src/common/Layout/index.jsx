import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import routes from '../../routes';
const { Header, Content, Footer } = Layout;
import { useLocation, useNavigate } from "react-router-dom";


const Layer = ({children}) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation();

  return (
    <Layout className='w-screen h-screen'>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img
          className='w-16 h-full'
          src='https://hl7chile.cl/wp-content/uploads/2023/04/hl7chile-1.png' 
          alt=''
        />
        <Menu
          className='w-full ml-5' 
          theme="dark"
          mode="horizontal"
          onChange={(e) => console.log(e)}
          items={routes.map((route, index) => {
            return {
              key: String(index + 1),
              icon: <route.icon color={route.path === location.pathname ? "#1ba1e2": "white"}/>,
              label: <a
                      style={{
                        color: route.path === location.pathname ? "#1ba1e2": "white",
                      }}
                      href={route.path}>{route.name}
                    </a>,
            }
          })}
        />
      </Header>
      <Content
        className="flex flex-col w-full h-full px-10 mt-12"
      >
        <div
          className='flex flex-col w-full h-full p-4 overflow-hidden'
          style={{
            background: colorBgContainer,
          }}
        >
          {children}
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Developed by RetinaRx
      </Footer>
    </Layout>
  );
};
export default Layer;