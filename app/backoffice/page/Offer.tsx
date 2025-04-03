import { useState, useEffect } from "react";
import axios from "axios";
import { PieChart } from "@mui/x-charts/PieChart";

// Example data (replace with actual data from props or API)

export const Offer = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await axios.get("/api/form");
      setSubmissions(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };
  // ----------------
  const countMap: Record<string, number> = {};
  const organization: Record<string, number> = {};

  submissions.forEach((item: any) => {
    countMap[item.serviceTypes] = (countMap[item.serviceTypes] || 0) + 1;
    organization[item.organizationType] = (organization[item.organizationType] || 0) + 1;
  });

  // Convert to pie chart format
  const chartData = Object.entries(countMap).map(([key, value], index) => ({
    id: index,
    value,
    label: key,
  }));
  const organizationData = Object.entries(organization).map(([key, value], index) => ({
    id: index,
    value,
    label: key,
  }));

  return (
    <div id="Санал" className="w-full min-h-screen bg-[#141414] text-white py-10">
      <h1 className="text-3xl font-semibold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-[#3FBB46] to-[#30C0A5]">
        Үнийн саналууд
      </h1>
      <div className=" flex">
        <div className=" w-[50%]  flex flex-col items-center gap-10">
          <div className="px-20 ">
            <h1 className="text-3xl font-bold">Үйлчилгээний төрөл:</h1>
          </div>
          <div className="flex px-20 item-center ">
            <PieChart
              series={[
                {
                  data: chartData,
                  innerRadius: 30,
                  outerRadius: 120,
                  paddingAngle: 1,
                  cornerRadius: 5,
                  startAngle: -140,
                  endAngle: 225,
                  cx: 150,
                  cy: 150,
                },
              ]}
              width={400}
              height={400}
              legend={{ hidden: true }} // Hides the legend
            />
            <div className=" flex flex-col justify-center gap-2">
              {chartData?.map((el: any, i) => {
                return (
                  <div key={i}>
                    {el?.label}: {el?.value}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className=" w-[50%]  flex flex-col items-center gap-10">
          <div className="px-20">
            <h1 className="text-3xl font-bold">Санал хүсэлтийн төрөл:</h1>
          </div>
          <div className="flex px-20 item-center">
            <PieChart
              series={[
                {
                  data: organizationData,
                  innerRadius: 30,
                  outerRadius: 120,
                  paddingAngle: 1,
                  cornerRadius: 5,
                  startAngle: -140,
                  endAngle: 225,
                  cx: 150,
                  cy: 150,
                },
              ]}
              width={400}
              height={400}
              legend={{ hidden: true }} // Hides the legend
            />
            <div className=" flex flex-col justify-center gap-2">
              {organizationData?.map((el: any, i) => {
                return (
                  <div key={i}>
                    {el?.label}: {el?.value}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto p-5 space-y-6 flex flex-wrap  justify-between  items-end">
        {submissions.length > 0 ? (
          submissions.map((submission: any, index) => (
            <div
              key={index}
              className="p-6 bg-[#1c1c1e] rounded-md shadow-lg border border-[#2c2c2e] transition-transform transform hover:scale-[1.02] w-[30%] h-[300px] "
            >
              <div className="mb-4 flex flex-col space-y-2">
                <p className="text-lg font-medium">
                  <span className="text-[#3FBB46]">Нэр:</span> {submission.name}
                </p>
                <p className="text-lg font-medium">
                  <span className="text-[#3FBB46]">И-майл:</span> {submission.email}
                </p>
                <p className="text-lg font-medium">
                  <span className="text-[#3FBB46]">Утас:</span> {submission.phone}
                </p>
              </div>
              <div className="mb-4 flex flex-col space-y-2">
                <p className="text-md">
                  <span className="text-[#3FBB46] font-medium">Байгууллагын төрөл:</span> {submission.organizationType}
                </p>
                <p className="text-md">
                  <span className="text-[#3FBB46] font-medium">Үйлчилгээний төрөл:</span> {submission.serviceTypes}
                </p>
              </div>
              <p className="text-sm text-gray-400">
                <span className="font-medium">Огноо:</span> {new Date(submission.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 text-lg">Үнийн санал алга байна.</p>
        )}
      </div>
    </div>
  );
};
