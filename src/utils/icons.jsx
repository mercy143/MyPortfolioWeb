import { QrCode, Database, MessageSquare, UserPlus } from "lucide-react";
import {
  FaMobileAlt,
  FaReact,
  FaBook,
  FaChess,
  FaGuitar,
  FaBullhorn,
  FaFootballBall,
  FaProjectDiagram,
  FaLaptopCode,
  FaUsers,
  FaChartLine,
  FaBrain,
  FaDatabase,
  FaBookOpen,
  FaLightbulb,
  FaCodeBranch,
  FaShieldAlt,
} from "react-icons/fa";

export const projectIcons = {
  QrCode,
  Database,
  MessageSquare,
  UserPlus,
};

export const hobbyIcons = {
  FaMobileAlt,
  FaReact,
  FaBook,
  FaChess,
  FaGuitar,
  FaBullhorn,
  FaFootballBall,
  FaBrain,
  FaDatabase,
};

export const motivationIcons = {
  FaProjectDiagram,
  FaLaptopCode,
  FaUsers,
  FaChartLine,
  FaBrain,
  FaBookOpen,
  FaLightbulb,
  FaCodeBranch,
  FaShieldAlt,
};

export function getProjectIcon(name, className) {
  const Icon = projectIcons[name];
  return Icon ? <Icon className={className} /> : null;
}

export function getHobbyIcon(name) {
  const Icon = hobbyIcons[name];
  return Icon ? <Icon size={24} /> : null;
}

export function getMotivationIcon(name) {
  const Icon = motivationIcons[name];
  return Icon ? <Icon /> : null;
}
