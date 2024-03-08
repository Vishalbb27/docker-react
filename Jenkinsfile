pipeline {
    environment {
        dockerimagename = 'vishalbb27/react'
        dockerImage = ''
        registryCredentials = 'dockerhub-credentials'
        def dockerHome = tool 'myDocker'
        PATH = "${dockerHome}/bin:${env.PATH}"

        AWS_REGION = 'us-east-1'
        // AWS_CREDENTIALS = 'AWS_ACCESS'
        AWS_ACCESS_KEY_ID = 'AKIAYRDE6LCETCMTTUHG'
        AWS_SECRET_ACCESS_KEY = '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'
        AWS_PROFILE = 'vishal'
        // AWS_CLI = aws 'AWS_CLI'
    }

    agent any

    stages {
        stage('Checkout Source') {
            steps {
                git 'https://github.com/Vishalbb27/docker-react'
            }
        }

        stage('Build image') {
            steps {
                script {
                    dockerImage = docker.build dockerimagename
                }
            }
        }
        stage('Pushing Image') {
            
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', registryCredentials) {
                        dockerImage.push('latest')
                    }
                }
            }
        }
        
        stage('Deploying in AWS Beanstalk') {
            steps{
                sh "aws configure set aws_access_key_id ${AWS_ACCESS_KEY_ID} --profile ${AWS_PROFILE}"
                sh "aws configure set aws_secret_access_key ${AWS_SECRET_ACCESS_KEY} --profile ${AWS_PROFILE}"
                sh "aws configure set region ${AWS_REGION} --profile ${AWS_PROFILE}"
                sh "aws configure set output json --profile ${AWS_PROFILE}"
            }
            steps {

                // aws credentialsId: "${AWS_CREDENTIALS}",
                
                
                script {
                    def awsCli = '/usr/local/bin/aws'
                    // PATH = "${awsCli}:${env.PATH}"
                    def environmentName = 'Frontend-env-1'
                    def applicationName = 'frontend'
                    def versionLabel = "v-${System.currentTimeMillis()}"



                    // Install Docker on the deployment environment
                    // def installDockerCommand = 'wget -q0- -fsSL https://get.docker.com | sh'
                    // def installDockerResult = installDockerCommand.execute()
                    // installDockerResult.waitFor()

                    // if (installDockerResult.exitValue() != 0) {
                    //     error "Failed to install Docker. ${installDockerResult.err.text}"
                    // }

                    // echo "Docker installed"

                    // Build your application or copy the artifacts to a deployable directory

                    // Create a new Elastic Beanstalk application version
                    def createApplicationVersionCommand = "$awsCli elasticbeanstalk create-application-version " +
                            "--application-name $applicationName " +
                            "--version-label $versionLabel " +
                            "--source-bundle S3Bucket=your-s3-bucket-name,S3Key=your-artifact-path.zip"
                    def createApplicationVersionResult = createApplicationVersionCommand.execute()
                    createApplicationVersionResult.waitFor()

                    

                    if (createApplicationVersionResult.exitValue() != 0) {
                        error "Failed to create application version. ${createApplicationVersionResult.err.text}"
                    }
                    echo "Excuted create application"

                    // Deploy the new version to the environment
                    def updateEnvironmentCommand = "$awsCli elasticbeanstalk update-environment " +
                            "--application-name $applicationName " +
                            "--environment-name $environmentName " +
                            "--version-label $versionLabel"
                    def updateEnvironmentResult = updateEnvironmentCommand.execute()
                    updateEnvironmentResult.waitFor()

                    if (updateEnvironmentResult.exitValue() != 0) {
                        error "Failed to update environment. ${updateEnvironmentResult.err.text}"
                    }

                    // Run Docker image in the Elastic Beanstalk environment
                    def dockerRunCommand = "docker run -d -p 80:80 $dockerimagename"
                    def dockerRunResult = dockerRunCommand.execute()
                    dockerRunResult.waitFor()

                    if (dockerRunResult.exitValue() != 0) {
                        error "Failed to run Docker image. ${dockerRunResult.err.text}"
                    }

                    echo "Deployment and Docker run successful!"
                }
            }
        }
    }
}
