import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";


const FAQ = () => {
    return (
      <div className="mb-20">
        <div className="mb-10">
          <h1 className="text-5xl font-semibold text-center">
            Frequently Asked Questions
          </h1>
        </div>
        <div className="mb-10">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-2xl">
                Can I purchase medicine without a prescription?
              </AccordionTrigger>
              <AccordionContent className="text-lg text-neutral-800">
                Some over-the-counter (OTC) medicines can be purchased without a
                prescription. However, prescription-only medicines (Rx) require
                a valid doctor&apos;s prescription for purchase.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-2xl">
                How should I store my medicines?
              </AccordionTrigger>
              <AccordionContent className="text-lg text-neutral-800">
                Store medicines in a cool, dry place, away from direct sunlight.
                Some medications may require refrigeration. Always check the
                label for specific storage instructions.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-2xl">
                Can I take expired medication?
              </AccordionTrigger>
              <AccordionContent className="text-lg text-neutral-800">
                It is not recommended to take expired medication as it may lose
                its effectiveness or become harmful. Always check the expiry
                date before use.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-2xl">
                What should I do in case of an overdose?
              </AccordionTrigger>
              <AccordionContent className="text-lg text-neutral-800">
                In case of an overdose, seek immediate medical attention.
                Contact your nearest emergency service or poison control center
                for assistance.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    );
};

export default FAQ;