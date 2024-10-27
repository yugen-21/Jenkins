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
        stage('Run Tests') {
            steps {
                // This should work across platforms, assuming tests are defined in package.json
                sh 'npm test'
            }
        }
        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials-id') {
                        docker.image("nodejs-api:latest").push()
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    // Use only `docker run` in detached mode instead of `nohup`
                    bat 'docker run -d -p 3000:3000 nodejs-api:latest'
                }
            }
        }
    }
}
