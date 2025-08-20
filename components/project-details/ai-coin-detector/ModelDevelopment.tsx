import ProjectSection from "../ProjectSection";

export default function ModelDevelopment() {
  return (
    <ProjectSection title="Model Development">
      <strong>Architecture and Setup</strong>
      <p>
        The setup used for training Teachable Model was the default setup of
        teachable model. The classes in the image model were 10 and will be
        discussed in Table 1. Model Classes. In addition, the setup will be
        displayed in Table 2. Model Setup.
      </p>
      <div className="overflow-x-auto">
        <p className="font-semibold">Table 1. Model Classes</p>
        <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-1 text-left">Class Name</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Value (PHP)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-2 py-1">1 PESO - Front</td>
              <td className="border border-gray-300 px-2 py-1">1</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">1 PESO - Back</td>
              <td className="border border-gray-300 px-2 py-1">1</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">5 PESO - Front</td>
              <td className="border border-gray-300 px-2 py-1">5</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">5 PESO - Back</td>
              <td className="border border-gray-300 px-2 py-1">5</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">10 PESO - Front</td>
              <td className="border border-gray-300 px-2 py-1">10</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">10 PESO - Back</td>
              <td className="border border-gray-300 px-2 py-1">10</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">20 PESO - Front</td>
              <td className="border border-gray-300 px-2 py-1">20</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">20 PESO - Back</td>
              <td className="border border-gray-300 px-2 py-1">20</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">25 CENTS - Front</td>
              <td className="border border-gray-300 px-2 py-1">0.25</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">25 CENTS - Back</td>
              <td className="border border-gray-300 px-2 py-1">0.25</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        The setup for training for the model was default as tweaking the setup
        can be detrimental to the result of the model as small changes to
        numbers can impact the accuracy of the model. With that in mind, the
        group has decided to keep on default. In addition, By comparing the
        performance of more sophisticated models against the default model, it
        becomes possible to assess whether the efforts are truly improving the
        predictive power or just adding unnecessary complexity (How, 2024).
      </p>
      <div className="overflow-x-auto">
        <p className="font-semibold">Table 2. Model Setup</p>
        <table className="table-auto border-collapse border border-gray-300 w-full text-sm">
          <thead>
            <tr>
              <th className="border border-gray-300 px-2 py-1 text-left">Options</th>
              <th className="border border-gray-300 px-2 py-1 text-left">Value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-gray-300 px-2 py-1">Epochs</td>
              <td className="border border-gray-300 px-2 py-1">80</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">Batch Size</td>
              <td className="border border-gray-300 px-2 py-1">16</td>
            </tr>
            <tr>
              <td className="border border-gray-300 px-2 py-1">Learning Rate</td>
              <td className="border border-gray-300 px-2 py-1">0.00102</td>
            </tr>
          </tbody>
        </table>
      </div>
    </ProjectSection>
  );
}

