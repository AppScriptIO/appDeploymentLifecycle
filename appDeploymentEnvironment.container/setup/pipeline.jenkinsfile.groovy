#!groovy
// This is a .groovy file. Reference steps - https://jenkins.io/doc/pipeline/steps/

// Run on slave/agent jenkins nodes labeled with docker only
node("docker") {
    // That way we don't need to repeat "-f <docker-compose.yml>" argument every time we execute docker-compose.
    withEnv([
        // https://docs.docker.com/compose/reference/envvars/
        // "COMPOSE_FILE=docker-compose-test-local.yml",
        "DEPLOYMENT=production"
    ]) {
        
        // Pull the latest code from the repository
        stage("Pull") {
            // NOTE: don't forget to Add recursive flag in pipeline configuration screen (jenkins server) in options for reading/executing jenkins file.
            git "https://github.com/myuseringithub/appDeploymentLifecycle"
            sh "git submodule update --init --recursive -f"
            sh "chmod -R 777 /workspace; chown jenkins /workspace"
        }
 
        stage("BuildImage") {
            sh "docker-compose -f ./deploymentEnvironment/deployment.dockerCompose.yml build --no-cache deploymentEnvironment"
        }

        // // Run unit tests and build the service and Docker images 
        // stage("Unit") {
        //   sh "docker-compose run --rm unit"
        //   sh "docker-compose build app"
        // }
    
        // // Deploy to staging environment and run tests 
        // stage("Staging") {
        //     // wrapping commands inside try/catch/finally block, allows us to free resouces when test fails. Because jenkins stops pipeline and we need to remove the created containers.
        //     try {
        //         sh "docker-compose up -d staging-dep"
        //         sh "docker-compose run --rm staging"
        //     } catch(e) {
        //         error "Staging failed"
        //     } finally { // Finally statement is always executed, no matter if the outcome failed or passed.
        //         sh "docker-compose down"
        //     }
        // }

        // Tag Docker images and push them to the registry 
        stage("Publish") {
            // BUILD_NUMBER - is jenkins build-in environment variables that hols the value of the currently executing build ID.
            sh "docker login -u myuserindocker -p ${env.DOCKERHUB_CREDENTIALS}"
            sh "docker tag myuserindocker/deployment-environment myuserindocker/deployment-environment:2.${env.BUILD_NUMBER}"
            sh "docker push myuserindocker/deployment-environment:2.${env.BUILD_NUMBER}"
            sh "docker tag myuserindocker/deployment-environment myuserindocker/deployment-environment:latest"
            sh "docker push myuserindocker/deployment-environment:latest"
        }

        // //  Use the latest image to update the service running in production-like environment and run tests 
        // stage("Prod-like") {
        //     withEnv([
        //         // used to connect Docker client to Docker Engine on a remote host.
        //         "DOCKER_TLS_VERIFY=1",
        //         "DOCKER_HOST=tcp://${env.PROD_LIKE_IP}:2376",
        //         "DOCKER_CERT_PATH=/machines/${env.PROD_LIKE_NAME}"
        //     ]) {
        //         sh "docker service update \
        //         --image localhost:5000/go-demo:2.${env.BUILD_NUMBER} \
        //         go-demo"
        //     }
        //     withEnv(["HOST_IP=localhost"]) {
        //         for (i = 0; i <10; i++) {
        //         sh "docker-compose run --rm production"
        //         }
        //     }
        // }

    }
}