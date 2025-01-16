import React from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const FAQs: React.FC = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="container mx-auto px-6">
        <h2 className="text-center text-3xl font-bold text-green-800 mb-8">FREQUENTLY ASKED QUESTIONS</h2>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-lg font-semibold text-gray-800">
              What makes Gauraaj's products organic?
            </AccordionTrigger>
            <AccordionContent>
              Our products are sourced directly from certified organic farms, ensuring no synthetic fertilizers,
              pesticides, or chemicals are used.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg font-semibold text-gray-800">
              Do you offer international shipping?
            </AccordionTrigger>
            <AccordionContent>
              Yes, we ship internationally. Shipping times and costs vary depending on your location.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg font-semibold text-gray-800">
              Are your products tested for quality?
            </AccordionTrigger>
            <AccordionContent>
              Yes, all our products undergo rigorous quality testing to ensure they meet the highest standards of
              purity and safety.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg font-semibold text-gray-800">
              What is your return policy?
            </AccordionTrigger>
            <AccordionContent>
              We offer a hassle-free return policy within 30 days of purchase. Please contact our support team for
              assistance.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQs;
