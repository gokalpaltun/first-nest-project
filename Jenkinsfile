pipeline {
    environment {
        api = 'moveup-api-nest'
        dockerImage = '' 
    }
    agent any
    stages {
        stage('Cloning Git') {
          steps{
                echo "========Git Repo Cloning...========"
                git 'https://github.com/gokalpaltun/first-nest-project.git'
          }
        }
        stage("Building Image") {
            steps {
                echo "========Building Image...========"
                script{
                    dockerImages = docker.build api + ":$BUILD_NUMBER"
                }
            }
        }
        stage("Stop running container as same"){
            steps{
                script{
                    try {
                        sh "docker stop  $api"
                        sh "docker rm $api"
                    } catch (Exception e) {
                        echo 'Exception occurred: ' + e.toString()
                    }
                }
            }
        }
        stage("Run Image") {
            steps {
                script {
                    sh "docker run -d -p 3001:3001 --name $api $api:$BUILD_NUMBER"
                }
            }
        }
        stage('Cleaning up') { 
            steps { 
                script {
                    try {
                        sh "docker rmi $api:${currentBuild.previousBuild.getNumber()}" 
                    }
                    catch (Exception e) {
                        echo 'Exception occurred: ' + e.toString()
                    }
                }
            }
        }
    }
    post {
        success {
            echo 'Sending success message to Discord'
            discordSend successful: true,
                        title: "dev",
                        description: "success",
                        footer: "This build succeeded within ${currentBuild.durationString}",
                        link: env.RUN_DISPLAY_URL,
                        webhookURL: "https://discord.com/api/webhooks/771862129992007701/pAy2Oa9lS0Y8HgaeOIawa0S-C8ksEF7eG0MLA-aVF8YiK10MRNwMTifj_P5BS5s6sZr7"
        }

        failure {
            echo 'Sending failure message to Discord'
            discordSend successful: false,
                        title: "dev",
                        description: "failure",
                        footer: "This build failed after ${currentBuild.durationString}",
                        link: env.RUN_DISPLAY_URL,
                        webhookURL: "https://discord.com/api/webhooks/771862129992007701/pAy2Oa9lS0Y8HgaeOIawa0S-C8ksEF7eG0MLA-aVF8YiK10MRNwMTifj_P5BS5s6sZr7"
        }
    } // post
}