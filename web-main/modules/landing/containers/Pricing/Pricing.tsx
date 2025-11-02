import { FeePackage } from "@/modules/finance/fee_package/fee_package.model";
import { Col, Row } from "antd";
import { Container } from "../../components/Container/Container";
import { SectionHeading } from "../../components/SectionHeading/SectionHeading";
import { PriceCard } from "./PriceCard/PriceCard";
import "./Pricing.scss";

interface PricingProps {
  feePackages: FeePackage[];
}

export const Pricing = ({ feePackages }: PricingProps) => {
  return (
    <section id="pricing" className="pricing">
      <Container>
        <SectionHeading
          heading="Pricing Plans"
          subHeading="Choose a plan that fits your needs. We offer flexible pricing options designed to suit individuals, teams, and businesses of all sizes. Find the right plan and get started today."
        />
        <Row gutter={[24, 24]} justify="center">
          {feePackages.map((price) => (
            <Col xs={24} sm={20} md={12} lg={8} key={price.id}>
              <PriceCard
                title={price.name}
                price={price.fee}
                features={[price.description]}
                buttonType={"default"}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};
