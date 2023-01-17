import 'dotenv/config';
import type { AWS } from "@serverless/typescript";

import getCityInfo from "@functions/getCityInfo";

const serverlessConfiguration: AWS = {
  service: "serverless-aws-api",
  frameworkVersion: "3",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: 'eu-central-1',
    profile: process.env.PROFILE ?? 'default',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    lambdaHashingVersion: "20201221",
  },
  functions: { getCityInfo },
};

module.exports = serverlessConfiguration;
