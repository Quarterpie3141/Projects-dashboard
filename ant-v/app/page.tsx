"use client"
import SideMenu from "./components/SideMenu";
import ProjectCards from "./components/Content/ProjectCards";
import { Layout } from "antd";
const { Header, Content, Footer, Sider } = Layout;
export default function Home() {
  return (
    <>
    <Layout style={{minHeight: '100vh'}}>
      <Header className=" w-[38rem] md:w-full">

      </Header>
      <Layout>
        <Sider style={{backgroundColor: "white"}}>
          <SideMenu theme="dark" />
        </Sider>
        
        <Layout>
          <Content>
            <ProjectCards />
          </Content>
        </Layout>
        
      </Layout>
      <Footer>

        </Footer>
    </Layout>
    </>
  );
}
