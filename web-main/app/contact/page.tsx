import { AppFooter } from "@/modules/landing/components/AppFooter/AppFooter";
import { Contact } from "@/modules/landing/containers/Contact/Contact";
import Layout, { Content } from "antd/lib/layout/layout";

export default async function ContactPage() {
  return (
    <Layout>
      <Content>
        <Contact />
      </Content>
      <AppFooter />
    </Layout>
  );
}

