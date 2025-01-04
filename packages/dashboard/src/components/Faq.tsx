import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";
import { DAILY_POINTS } from "@/utils/constants";

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
            <p className="text-gray-500 dark:text-gray-400">
              Short answer: the score is computed based on the number of bunnies
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle>
            If I mint a Bunny on the first day and later transfer it to another
            wallet, or if I transfer a Bunny from another wallet to my main
            wallet, will I still get the 10% Early Holder Bonus?
          </AccordionTitle>
          <AccordionContent>
            <p className="text-gray-500 dark:text-gray-400">
              Any action involving a&nbsp;
              <span className={"font-bold"}>Transfer</span> (mint, transfer,
              buy) completed&nbsp;
              <span className={"font-bold"}>
                before 23:59:59 UTC on the first day&nbsp;
              </span>
              qualifies for the “Early Holder Bonus.” To receive the bonus, the
              NFT must remain in your wallet.
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle>
            Is the Monthly Bonus calculated per NFT or per wallet?
          </AccordionTitle>
          <AccordionContent>
            <p className="text-gray-500 dark:text-gray-400">
              The Monthly Bonus is calculated per NFT. For example, if you hold
              two NFTs for 1 month, you will receive 2 x 50,000 points.
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle>
            What happens to my wallet’s score if I sell an NFT?
          </AccordionTitle>
          <AccordionContent>
            <p className="text-gray-500 dark:text-gray-400">
              If a wallet sells an NFT, the NFT is no longer included in the
              wallet’s global score. All points associated with the sold NFT,
              including those earned in the past, are removed retroactively.
            </p>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle>When are my points updated?</AccordionTitle>
          <AccordionContent>
            <p className="text-gray-500 dark:text-gray-400">
              Your points are updated in real-time. For example:
            </p>
            <ul className="list-disc pl-5 text-gray-500 dark:text-gray-400">
              <li>
                If you buy a Bunny, it will appear on your dashboard
                immediately. However, you’ll need to wait 24 hours for it to add{" "}
                {DAILY_POINTS.toLocaleString("en-US")} points to your score.
              </li>
              <li>
                If you already have one Bunny, acquiring a second Bunny will
                instantly apply the multiplier bonus to your score.
              </li>
            </ul>
          </AccordionContent>
        </AccordionPanel>
        <AccordionPanel>
          <AccordionTitle>When is the ranking updated?</AccordionTitle>
          <AccordionContent>
            <p className="flex flex-wrap items-center text-gray-500 dark:text-gray-400">
              The ranking is updated approximately{" "}
              <span className="font-bold whitespace-nowrap mx-1">
                every 30 minutes.
              </span>
              You can check the last update time when hovering the{" "}
              <span className="mx-1">
                <Image
                  src={"/icons/info.svg"}
                  alt={"Information icon"}
                  width={16}
                  height={16}
                  className="svg-grey inline"
                />
              </span>
              icon next to &lsquo;
              <span className="font-bold">Ranking</span>&lsquo;.
            </p>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </>
  );
}
