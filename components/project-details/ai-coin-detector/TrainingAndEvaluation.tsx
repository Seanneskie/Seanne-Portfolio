import ProjectSection from "../ProjectSection";

export default function TrainingAndEvaluation() {
  return (
    <ProjectSection title="Training and Evaluation">
      <strong>Training Processes and Challenges</strong>
      <p>
        The training process started after the collection of the 50 sample sets
        of each coin in the model classes. In addition, the testing lasts for 3
        months and is still currently on-going. Amidst the testing, the group
        encountered challenges such as lack of resources for specific classes of
        coin such as the 20-Peso Coin, 10-Peso Coin and 25-centavos. In addition,
        there is a lot of sample data for 1-peso and 5-peso coin casting to
        split and adjust the sample data for these classes of coins.
      </p>
      <p>
        Another challenge is the low accuracy in the detection rate, the model
        seems to detect almost every silver coin or if the lighting is bright to
        be a 1-Peso coin with a very high confidence level ranging from 90-100%
        of confidence value. In addition, the factors that seemed to affect the
        accuracy were the large amount of sample which was then splitted, the
        lighting of the image, and the AI seems to detect the silver-colored
        coins as 1-Peso Coin.
      </p>
      <p>
        To address the challenges with low accuracy in detecting silver coins as
        1-Peso coins, especially in bright lighting conditions, consider
        capturing close-up shots of the coins with a clear background. This
        approach can help the model focus on the specific features of each coin,
        potentially improving its ability to differentiate between different
        types of coins. Additionally, ensure that the lighting conditions are
        consistent across all images to reduce the impact of lighting on the
        model&apos;s performance.
      </p>
      <strong>Evaluation</strong>
      <p>
        For testing the model, we used past data of the first model test to
        compare to the current model testing but only by remembering what were
        the challenges and problems. If the problem is solved it will be
        checked. Nevertheless, this causes confusion in the long term and the
        group has decided to use test plans to record the results which are
        displayed in Appendix A, Test Plans.
      </p>
      <p>
        In these test plans, the group used sample data and counted how many the
        model can detect correctly with a confidence level of at least 60 or 70%.
        If the model couldn’t reach 60%, it will be counted as a failure. In
        addition, the confidence level and also the decision if pass or fail is
        included in Appendix A. Test Plans.
      </p>
      <p>
        The group didn’t use any baseline or benchmark model from the internet
        but nonetheless used the previous model as the benchmark model for
        improving the current performance of the model.
      </p>
    </ProjectSection>
  );
}

