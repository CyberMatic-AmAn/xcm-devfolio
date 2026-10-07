import cIcon from "@/images/icons/skills/c.webp";
import csIcon from "@/images/icons/skills/chash.webp";
import cppIcon from "@/images/icons/skills/cpp.webp";
import dockerIcon from "@/images/icons/skills/docker.webp";
import gitIcon from "@/images/icons/skills/git.webp";
import huggingfaceIcon from "@/images/icons/skills/huggingface.webp";
import langchainIcon from "@/images/icons/skills/langchain.webp";
import linuxIcon from "@/images/icons/skills/linux.webp";
import matplotlibIcon from "@/images/icons/skills/matplotlib.webp";
import nextjsIcon from "@/images/icons/skills/next.webp";
import nodejsIcon from "@/images/icons/skills/node.webp";
import numpyIcon from "@/images/icons/skills/numpy.webp";
import pandasIcon from "@/images/icons/skills/pandas.webp";
import powerbiIcon from "@/images/icons/skills/powerbi.webp";
import torchIcon from "@/images/icons/skills/pytorch.webp";
import sparkIcon from "@/images/icons/skills/pyspark.webp";
import pythonIcon from "@/images/icons/skills/python.webp";
import rIcon from "@/images/icons/skills/r.webp";
import reactIcon from "@/images/icons/skills/react.webp";
import sckikitIcon from "@/images/icons/skills/scikit-learn.webp";
import seabornIcon from "@/images/icons/skills/seaborn.webp";
import sqlIcon from "@/images/icons/skills/sql.webp";
import tailwindIcon from "@/images/icons/skills/tailwind.webp";
import tensorflowIcon from "@/images/icons/skills/tensorflow.webp";
import threejsIcon from "@/images/icons/skills/threejs.webp";
import unityIcon from "@/images/icons/skills/unity.webp";


export const skillCategories = [
  {
    category: "Web Development",
    skills: [
      { name: "React", iconId: reactIcon },
      { name: "Next.js", iconId: nextjsIcon },
      { name: "Tailwind", iconId: tailwindIcon },
      { name: "Node.js", iconId: nodejsIcon },
    ],
  },
  {
    category: "Data Science",
    skills: [
      { name: "Python", iconId: pythonIcon },
      { name: "TensorFlow", iconId: tensorflowIcon },
      { name: "PyTorch", iconId: torchIcon },
      { name: "SQL", iconId: sqlIcon },
      { name: "Pandas", iconId: pandasIcon },
      { name: "NumPy", iconId: numpyIcon },
      { name: "Matplotlib", iconId: matplotlibIcon },
      { name: "Seaborn", iconId: seabornIcon },
      { name: "Scikit-learn", iconId: sckikitIcon },
      { name: "R", iconId: rIcon },
      { name: "Power BI", iconId: powerbiIcon },
      { name: "PySpark", iconId: sparkIcon },
    ],
  },
  {
    category: "Agentic AI & LLMs",
    skills: [
      { name: "LangChain", iconId: langchainIcon },
      { name: "Hugging Face", iconId: huggingfaceIcon },
    ],
  },
  {
    category: "Game Development",
    skills: [
      { name: "Three.js", iconId: threejsIcon },
      { name: "Unity", iconId: unityIcon },
      { name: "C#", iconId: csIcon },
      { name: "C++", iconId: cppIcon },
    ],
  },
  {
    category: "DevOps & Tools",
    skills: [
      { name: "Git", iconId: gitIcon },
      { name: "C", iconId: cIcon },
      { name: "Docker", iconId: dockerIcon },
      { name: "Linux", iconId: linuxIcon },
    ],
  },
];

export const skills = skillCategories.flatMap((cat) => cat.skills);
