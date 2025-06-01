import CodeIcon from "@mui/icons-material/Code"
import BarChartIcon from "@mui/icons-material/BarChart"
import PeopleIcon from "@mui/icons-material/People"
import GitHubIcon from "@mui/icons-material/GitHub"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import SecurityIcon from "@mui/icons-material/Security"
import type { FeatureCardInterface } from "@/interfaces/hompageInterface"

export const features: FeatureCardInterface[] = [
  {
    icon: CodeIcon,
    title: "Smart Project Showcase",
    description: "Automatically organize and display your best projects.",
    gradient: "from-blue-50 to-blue-100",
  },
  {
    icon: GitHubIcon,
    title: "Seamless GitHub Sync",
    description:
      "Real-time synchronization with GitHub repositories, contribution graphs, and detailed coding analytics.",
    gradient: "from-purple-50 to-purple-100",
  },
  {
    icon: BarChartIcon,
    title: "Advanced Analytics",
    description:
      "Gain deep insights into your coding patterns and project impact through clear, intuitive visualizations.",
    gradient: "from-green-50 to-green-100",
  },
  {
    icon: PeopleIcon,
    title: "Developer Network",
    description:
      "Link your professional profiles to share your broader online presence, and connect with like-minded developers, and discover new opportunities in your fields.",
    gradient: "from-orange-50 to-orange-100",
  },
  {
    icon: SecurityIcon,
    title: "Enterprise Security",
    description: "Robust security with end-to-end encryption, secure authentication, and privacy-first data handling.",
    gradient: "from-red-50 to-red-100",
  },
  {
    icon: TrendingUpIcon,
    title: "Career Growth",
    description: "Track and consolidate your professional development in a single, organized portfolio.",
    gradient: "from-cyan-50 to-cyan-100",
  },
]