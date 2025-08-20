import ProjectSection from "../ProjectSection";

export default function DataCollection() {
  return (
    <ProjectSection title="Data Collection and Preparation">
      <strong>Data Collection</strong>
      <p>
        The dataset used for the AI coin detection system, specifically for the
        Philippine peso, consists of legal tender coins that are accepted as
        payment for goods and services. This dataset is composed of close-up
        photos of the coins, taken by the group, and includes both the front and
        back faces of each coin.
      </p>
      <p>
        The use of close-up photos is particularly important as it allows for
        detailed analysis of the coin&apos;s features, which are crucial for accurate
        detection and classification. This method is supported by research and
        development in the field of computer vision, where object detection
        models have been successfully applied to identify and track various coin
        types in real-time, even under challenging lighting conditions and
        diverse orientations (Detect &amp; Classify Coins Using Computer Vision,
        2023)
      </p>
      <p>
        The inclusion of both front and back faces of the coins in the dataset
        is a strategic decision that addresses a common challenge in coin
        detection systems. By training the model on images of both sides of the
        coins, the system can better recognize and classify coins regardless of
        their orientation. This is a critical aspect of the coin detection
        process, as coins can be presented in various orientations during
        transactions.
      </p>
      <p>Right below are the classification of the coins used as dataset:</p>
      <ul className="list-disc pl-6 space-y-1">
        <li>25-Cents Coin Photos</li>
        <li>1-Peso Coin Photos</li>
        <li>5-Peso Coin Photos</li>
        <li>10-Peso Coin Photos</li>
        <li>20-Peso Coin Photos</li>
      </ul>
      <strong>Training and Testing</strong>
      <p>
        The training set was composed of coins numbering at least a 100 of
        samples as long as it is possible for the group to collect. Moreover,
        the number of sample data is still varying due to the lack of resources.
        Nevertheless, it is made sure that the training set coin samples were
        not used in the testing set, the testing set was made sure to be
        composed of coins that are not in the testing set or were taken in a
        different angle or lighting. Lastly, after the testing, the testing set
        is also added to the training set.
      </p>
    </ProjectSection>
  );
}

