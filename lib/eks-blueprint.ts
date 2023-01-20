import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as blueprints from '@aws-quickstart/eks-blueprints';

export class EksBlueprint{
  constructor(scope: Construct, id: string, vpc: ec2.IVpc) {
    
    const props: blueprints.GenericClusterProviderProps = {
      vpc: vpc,
      version: eks.KubernetesVersion.V1_23,
      placeClusterHandlerInVpc: true,
      kubectlEnvironment: { 
        "AWS_STS_REGIONAL_ENDPOINTS": 'regional' 
      },
      endpointAccess: eks.EndpointAccess.PRIVATE,
      vpcSubnets: [{    
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED 
      }]
    };

    blueprints.EksBlueprint.builder()
      .resourceProvider(
        blueprints.GlobalResources.Vpc,
        new blueprints.DirectVpcProvider(vpc))
      .clusterProvider(new blueprints.GenericClusterProvider(props))
      .build(scope, id);
  }
}
