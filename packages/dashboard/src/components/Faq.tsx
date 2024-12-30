import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";

export default function Faq() {
  return (
    <>
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
        FAQ
      </h2>
      <p className="text-lg text-center text-gray-500 dark:text-gray-400 mb-4">
        You have questions? We have answers.
      </p>
      <Accordion>
        <AccordionPanel>
          <AccordionTitle>What is Bunny Universe?</AccordionTitle>
          <AccordionContent>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Bunny Universe is a collection of 2,500 unique and randomly
              generated cute bunnies living on the Linea blockchain as NFTs.
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              Buy your own bunny on&nbsp;
              <a
                href="https://element.market/collections/bunny-universe-onlinea"
                rel="nofollow noopener"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                Element Market&nbsp;
              </a>
              and join the community.
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle>Wen $CARROT?</AccordionTitle>
          <AccordionContent>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Soon. We are working hard to bring you the $CARROT token, which
              will be airdropped based on your score.
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle>How is the score computed?</AccordionTitle>
          <AccordionContent>
            <p className="text-gray-500 dark:text-gray-400">
              Check out the&nbsp;
              <a
                href="https://mirror.xyz/bunnyuniverse.eth/NsjwLQL2wgo2kQYV31l2777amcJ55AKxKuiQDh8Yj6k"
                rel="nofollow noopener"
                className="text-cyan-600 hover:underline dark:text-cyan-500"
              >
                blog post&nbsp;
              </a>
              explaining everything.
            </p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </>
  );
}
