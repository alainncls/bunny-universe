import { Score } from "@/types";
import CarrotScore from "@/components/CarrotScore";
import Ranking from "@/components/Ranking";

type TotalScoreProps = {
  score: Score;
};

export default function TotalScore({ score }: TotalScoreProps) {
  return (
    <>
      {score ? (
        <div className="flex flex-col lg:flex-row lg:justify-between lg:gap-8 w-full">
          <div className="w-96 mx-auto">
            <CarrotScore score={score} />
          </div>
          <div className="w-96 mx-auto">
            <Ranking score={score} />
          </div>
        </div>
      ) : (
        <span>Loading score...</span>
      )}
    </>
  );
}
