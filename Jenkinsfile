pipeline {
    agent any
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/yugen-21/Jenkins.git'
            }
        }
        stage('Build') {
            steps {
                script {
                    docker.build("nodejs-api:latest")
                }
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('shamaanjum', 'dockerhub-credentials-id') {
                        docker.image("nodejs-api:latest").push()
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Run Docker in detached mode without `nohup
                    bat 'docker run -d -p 3000:3000 nodejs-api:latest'
                }
            }
        }
    }
}

