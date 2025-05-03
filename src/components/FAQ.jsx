import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const FAQ = () => {
  return (
    <div className="py-12">
      <div className="mb-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-center dark:text-white">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-xl sm:text-2xl px-6 py-4 font-medium text-left dark:text-white">
              Can I purchase medicine without a prescription?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-lg text-neutral-800 dark:text-gray-300">
              Some over-the-counter (OTC) medicines can be purchased without a
              prescription. However, prescription-only medicines (Rx) require a
              valid doctor&apos;s prescription for purchase.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="text-xl sm:text-2xl px-6 py-4 0 font-medium text-left dark:text-white">
              How should I store my medicines?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-lg text-neutral-800 dark:text-gray-300">
              Store medicines in a cool, dry place, away from direct sunlight.
              Some medications may require refrigeration. Always check the label
              for specific storage instructions.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-xl sm:text-2xl px-6 py-4 font-medium text-left dark:text-white">
              Can I take expired medication?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-lg text-neutral-800 dark:text-gray-300">
              It is not recommended to take expired medication as it may lose
              its effectiveness or become harmful. Always check the expiry date
              before use.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-xl sm:text-2xl px-6 py-4  font-medium text-left dark:text-white">
              What should I do in case of an overdose?
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-4 text-lg text-neutral-800 dark:text-gray-300">
              In case of an overdose, seek immediate medical attention. Contact
              your nearest emergency service or poison control center for
              assistance.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
