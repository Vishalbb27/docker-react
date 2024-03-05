pipeline{
    environment{
        dockerimagename = "vishalbb27/react"
        dockerImage = ""
        def dockerHome = tool 'myDocker'
        PATH = "${dockerHome}/bin:${env.PATH}"
    }
    
    agent any

    stage{
        stage('Checkout Source'){
            steps{
                git 'https://github.com/Vishalbb27/docker-react'
            }
        }
    }
    stage('Build image'){
        steps{
            script{
                dockerImage = docker.build dockerimagename
            }
        }
    }
    stage('Pushing Image'){
        environment{
            registryCredentials = 'dockerhub-credentials'
        }
        steps{
            script{
                docker.withRegistry('https://registry.hub.docker.com',registryCredentials){
                    dockerImage.push("latest")
                }
            }
        }
    }
}