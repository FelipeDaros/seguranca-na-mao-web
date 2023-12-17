import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CloseOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { useAuth } from '../context/AuthContext';

const { Header, Sider, Content } = Layout;

interface DefaultMenuProps {
  children: React.ReactNode;
}

export const DefaultMenu: React.FC<DefaultMenuProps> = ({ children }) => {
  const { signOut } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  function routeSelected(props: any) {
    switch (props.key) {
      case '1':
        navigate('/');
        break;
      case '2':
        navigate('/pontos');
        break;
      case '3':
        navigate('/rondas');
        break;
      case '4':
        navigate('/panico');
        break;
      default:
        break;
    }
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={(item) => routeSelected(item)}
          style={{marginTop: 10}}
        >
          <Menu.Item key="1" icon={<UserOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            Pontos
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            Rondas
          </Menu.Item>
          <Menu.Item key="4" icon={<UploadOutlined />}>
            Pânico
          </Menu.Item>
        </Menu>
        <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)' }}>
          <Button onClick={signOut}>
            <CloseOutlined />
            Sair
          </Button>
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header style={{ background: colorBgContainer, padding: 0 }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          className="site-layout-background"
          style={{
            padding: '24px',
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: collapsed ? 0 : borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
