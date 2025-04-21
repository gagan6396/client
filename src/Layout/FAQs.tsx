import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React from "react";

const FAQs: React.FC = () => {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl font-bold mb-6">FAQs</h2>
        <Accordion type="single" collapsible className="space-y-2">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base font-medium">
              What makes Gauraaj's products organic?
            </AccordionTrigger>
            <AccordionContent>
              Our products are sourced from certified organic farms, free from synthetic fertilizers, pesticides, or chemicals.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base font-medium">
              Are your products tested for quality?
            </AccordionTrigger>
            <AccordionContent>
              Yes, our products undergo rigorous quality testing to ensure purity and safety.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-base font-medium">
              What is your return policy?
            </AccordionTrigger>
            <AccordionContent>
              We offer hassle-free returns within 30 days. Contact our support team for assistance.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQs;