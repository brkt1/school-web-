import { getFeePackagesServer } from "@/modules/finance/fee_package/fee_package.service";
import { AppFooter } from "@/modules/landing/components/AppFooter/AppFooter";
import { Pricing } from "@/modules/landing/containers/Pricing/Pricing";
import Layout, { Content } from "antd/lib/layout/layout";

export default async function PricingPage() {
  let feePackages = [];

  try {
    const feePackagesData = await getFeePackagesServer({ pagination: { current: 1, pageSize: 10 } });
    feePackages = feePackagesData?.results || [];
  } catch (error) {
    console.warn('Failed to fetch fee packages:', error);
    feePackages = [];
  }

  return (
    <Layout>
      <Content>
        <Pricing feePackages={feePackages} />
      </Content>
      <AppFooter />
    </Layout>
  );
}

