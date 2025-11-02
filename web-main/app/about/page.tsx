import { AppFooter } from "@/modules/landing/components/AppFooter/AppFooter";
import { About } from "@/modules/landing/containers/About/About";
import Layout, { Content } from "antd/lib/layout/layout";

export default async function AboutPage() {
  return (
    <Layout>
      <Content>
        <About />
      </Content>
      <AppFooter />
    </Layout>
  );
}

