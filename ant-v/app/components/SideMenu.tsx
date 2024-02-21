import {AppstoreOutlined,
        MailOutlined,
        SettingOutlined,
        MenuFoldOutlined,
        MenuUnfoldOutlined, } from '@ant-design/icons';
import type { MenuProps, MenuTheme } from 'antd';
import { Menu } from 'antd';
import styles from './SideMenu.module.css'
import { useEffect, useState } from 'react';
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem('Navigation One', 'sub1', <MailOutlined />, [
    getItem('Item 1', 'g1', null, [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
    getItem('Item 2', 'g2', null, [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
  ]),

  getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    getItem('Option 5', '5'),
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [getItem('Option 7', '7'), getItem('Option 8', '8')]),
  ]),

  { type: 'divider' },

  getItem('Navigation Three', 'sub4', <SettingOutlined />, [
    getItem('Option 9', '9'),
    getItem('Option 10', '10'),
    getItem('Option 11', '11'),
    getItem('Option 12', '12'),
  ]),

  getItem('Group', 'grp', null, [getItem('Option 13', '13'), getItem('Option 14', '14')], 'group'),
];

function SideMenu(theme:any){
  
  const [sideBarSize, setSideBarSize] = useState(Number(220))
  useEffect(()=>{
    const handleResize = () =>{
      setSideBarSize(isPhoneSize())
    }
    window.addEventListener('resize', handleResize)

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  },[])

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };

    return(
      <div className=' bg-white' style={{width: sideBarSize}}>

        <Menu
        onClick={onClick}
        style={{width: sideBarSize}}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        items={items}
        theme={theme as MenuTheme}
        className='h-[100vh]'
            />
      </div>
    );
}

function isPhoneSize(): number {
  const PHONE_SCREEN_MAX_WIDTH = 768;

  if (typeof window !== 'undefined') {
    if(window.innerWidth <= PHONE_SCREEN_MAX_WIDTH){
      return 150
    }else{
      return 220
    }
  }
  return 220;
}

export default SideMenu;