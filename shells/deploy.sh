#!/bin/sh

case ${TRAVIS_BRANCH} in
  "development")
    PREFIX="dev"
    BUILD_NODE_ENV="development"
    cp .env.development .env
    ;;
  "testing")
    PREFIX="test"
    BUILD_NODE_ENV="testing"
    cp .env.testing .env
    ;;
  "staging")
    PREFIX="stag"
    BUILD_NODE_ENV="staging"
    cp .env.staging .env
    ;;
  "master" | *)
    PREFIX="prod"
    BUILD_NODE_ENV="production"
    ;;
esac
rm .env.*

## build image
docker build --build-arg BUILD_NODE_ENV="${BUILD_NODE_ENV}" -t channel-enews-frontend:latest .

LATEST_IDENTIFIER="${AWS_ACCOUNT_ID}.dkr.ecr.ap-southeast-1.amazonaws.com/channel-enews-frontend:${PREFIX}-latest"

## upload to ECR
docker tag channel-enews-frontend:latest ${LATEST_IDENTIFIER}
docker push ${LATEST_IDENTIFIER}

## restart service
cluster="${PREFIX}-IdService"
SERVICE_ECS=($(aws ecs list-services --cluster ${cluster} --output text | awk '{print $2}' | grep 'WPDynamicECSServiceBackend-'))
if [ "0" == "${#SERVICE_ECS[@]}" ]; then
  echo "Cannot Find ECS Service For channel-enews"
  exit 1;
fi;
for service in "${SERVICE_ECS[@]}"; do
  echo "restarting ${service}"
  aws ecs update-service --service=${service} --cluster=${cluster} --force-new-deployment
done
