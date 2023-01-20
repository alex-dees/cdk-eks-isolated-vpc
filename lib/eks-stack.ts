import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as eks from 'aws-cdk-lib/aws-eks';

export interface EksStackProps extends cdk.StackProps{
  vpc: ec2.IVpc
}

export class EksStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: EksStackProps) {
    super(scope, id, props);

    const vpc = props.vpc;

    new eks.Cluster(this, 'Cluster', {
      vpc,
      version: eks.KubernetesVersion.V1_21,
      placeClusterHandlerInVpc: true,
      kubectlEnvironment: {
        // use vpc endpoint, not the global
        "AWS_STS_REGIONAL_ENDPOINTS": 'regional'
      },
      endpointAccess: eks.EndpointAccess.PRIVATE,
      vpcSubnets: [{ subnetType: ec2.SubnetType.PRIVATE_ISOLATED }],
    });
  }
}
