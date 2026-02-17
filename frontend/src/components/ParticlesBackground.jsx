import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function ParticlesBackground() {

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "#020617" },
        particles: {
          number: { value: 60 },
          color: { value: "#06b6d4" },
          links: { enable: true, color: "#06b6d4" },
          move: { enable: true, speed: 1 },
          size: { value: 2 }
        }
      }}
      className="absolute inset-0 -z-10"
    />
  );
}

export default ParticlesBackground;
