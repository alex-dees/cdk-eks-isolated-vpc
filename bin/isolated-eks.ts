#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VpcStack } from '../lib/vpc-stack';
// import { EksStack } from '../lib/eks-stack';
import { EksBlueprint } from '../lib/eks-blueprint';

const env = { 
  region: process.env.CDK_DEFAULT_REGION,
  account: process.env.CDK_DEFAULT_ACCOUNT
};

const app = new cdk.App();
const vpc = new VpcStack(
  app, 
  'VpcStack', 
  { env }
)
.vpc;

new EksBlueprint(app, 'EksBlueprint', vpc);
//new EksClusterStack(app, 'EksClusterStack', {  env, vpc });
