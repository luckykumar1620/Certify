import CountUp from "react-countup";
import { useState, useEffect } from "react";

const Stats = () => {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey(prev => prev + 1);
    }, 4000); // repeat every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 bg-[#0f172a] text-white text-center relative overflow-hidden">

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">

        <div>
          <h2 className="text-5xl font-bold text-cyan-400">
            <CountUp key={key} start={0} end={1200} duration={3} />+
          </h2>
          <p className="mt-4 text-gray-400">
            Certificates Issued
          </p>
        </div>

        <div>
          <h2 className="text-5xl font-bold text-cyan-400">
            <CountUp key={key + 1} start={0} end={85} duration={3} />+
          </h2>
          <p className="mt-4 text-gray-400">
            Institutions Registered
          </p>
        </div>

        <div>
          <h2 className="text-5xl font-bold text-cyan-400">
            <CountUp key={key + 2} start={0} end={100} duration={3} />%
          </h2>
          <p className="mt-4 text-gray-400">
            Tamper Proof
          </p>
        </div>

      </div>

    </section>
  );
};

export default Stats;
