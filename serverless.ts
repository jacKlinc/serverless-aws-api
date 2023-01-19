import 'dotenv/config';
import type { AWS } from '@serverless/typescript';

import getCityInfo from '@functions/getCityInfo';
import dynamoResources from './src/dynamoResources';

const serverlessConfiguration: AWS = {
  service: 'serverless-aws-api',
  frameworkVersion: '3',
  custom: {
    myTable: '${sls:stage}-my-table',
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node16',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
  },
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs16.x',
    region: 'eu-central-1',
    // profile: 'jacKlinc',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      myTable: '${self:custom.myTable}',
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: 'dynamodb:*',
        Resource: [
          'arn:aws:dynamodb:${self:provider.region}:${aws:accountId}:table/${self:custom.myTable}',
        ],
      },
    ],
  },
  functions: { getCityInfo },
  resources: {
    Resources: {
      ...dynamoResources,
    },
  },
  package: { individually: true },
};

module.exports = serverlessConfiguration;
