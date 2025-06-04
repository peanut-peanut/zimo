"use client";

import { envConfig } from "../utils/env";

interface EnvironmentInfoProps {
  show?: boolean;
}

const EnvironmentInfo: React.FC<EnvironmentInfoProps> = ({ show = false }) => {
  if (!show || envConfig.isProduction) {
    return null;
  }

  return (
    <div 
      style={{
        position: "fixed",
        top: "10px",
        right: "10px",
        background: "rgba(0, 0, 0, 0.8)",
        color: "white",
        padding: "10px",
        borderRadius: "5px",
        fontSize: "12px",
        zIndex: 9999,
        fontFamily: "monospace"
      }}
    >
      <div><strong>Environment Info:</strong></div>
      <div>NODE_ENV: {envConfig.environment}</div>
      <div>Asset Prefix: {envConfig.assetPrefix || '(none)'}</div>
      <div>Base Path: {envConfig.basePath || '(none)'}</div>
      <div>Is Development: {envConfig.isDevelopment.toString()}</div>
      <div>Is Production: {envConfig.isProduction.toString()}</div>
    </div>
  );
};

export default EnvironmentInfo; 