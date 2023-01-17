#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { VpcStack } from '../lib/vpc-stack';
import { EksStack } from '../lib/eks-stack';

const env = { 
  region: process.env.CDK_DEFAULT_REGION,
  account: process.env.CDK_DEFAULT_ACCOUNT
};

const app = new cdk.App();
const vpcStack = new VpcStack(app, 'VpcStack', { env });
new EksStack(app, 'EksStack', {  env, vpc: vpcStack.vpc });