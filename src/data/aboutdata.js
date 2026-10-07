import avatar from "@/images/profile/profile.webp";

export const aboutData = {
  profile: {
    name: "AmAn Sonwani",
    title: "Ai & Data Science Student",
    tagline: "I am interested in computers more than peoples.",
    avatar: avatar, // Ensure user adds this image, or fallback to an icon
  },
  bio: "I am Aman Sonwani—a Data Science student attending CSVTU Bhilai. To me, data isn’t just numbers on a screen it’s the stairs of human progress.",
  currentFocus: [
    {
      title: "Real Time Trade Sequence Evaluation",
      description: "Building a low latency, high-throughput system to evaluate trade sequences in real-time.",
    },
    {
      title: "Multi-Agent (orchestration) self learning System",
      description: "Developing a multi-agent system that can learn and adapt to changing environments, with a focus on orchestration and coordination.",
    },
  ],
  trivia: [
    { label: "Core", value: "Data Mining , Analytics, Machine Learning" },
    { label: "Fuel", value: "Morning Coffee & Evening Tea" },
    { label: "Hobby", value: "Game-Sketch-Anime" },
  ],
  socials: [
    { name: "GitHub", url: "https://github.com/CyberMatic-AmAn", icon: "devicon-github-original" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/aman-sonwani-a95b0a326/", icon: "devicon-linkedin-plain" },
  ],
};

export const profileData = {
  name: aboutData.profile.name,
  title: aboutData.profile.title,
  bio: aboutData.bio,
  email: "amansonwani005@gmail.com",
  stats: {
    focus: "Data Science & Full Stack Development",
    experience: "3+ Years",
  },
  socials: {
    github: "https://github.com/CyberMatic-AmAn",
    linkedin: "https://www.linkedin.com/in/aman-sonwani-a95b0a326/",
    x: "https://x.com/OperatorLinux",
  },
};
