"use client"
import SideMenu from "../components/SideMenu";
import DAGGraph from "../components/project/graph";

import { Layout } from "antd";
const { Header, Content, Footer, Sider } = Layout;
export default function Home() {
  return (
    <>
    <Layout style={{minHeight: '100vh'}}>
      <Header className=" w-[514px] md:w-full">

      </Header>
      <Layout>
        <Sider style={{backgroundColor: "white"}}>
          <SideMenu theme="dark" />
        </Sider>
        
        <Layout>
          <Content>
            <DAGGraph />
          </Content>
        </Layout>
        
      </Layout>
      <Footer>

        </Footer>
    </Layout>
    </>
  );
}
