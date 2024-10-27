pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "nodejs-api"
        DOCKER_TAG = "latest"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: 'https://github.com/yugen-21/Jenkins.git'
            }
        }

        stage('Build') {
            steps {
                script {
                    docker.build(DOCKER_IMAGE + ":" + DOCKER_TAG)
                }
            }
        }

        stage('Run Tests') {
            steps {
                // Assuming you have a test script in package.json
                sh 'npm test'
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub-credentials-id') {
                        docker.image(DOCKER_IMAGE + ":" + DOCKER_TAG).push()
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    // Run the container in detached mode
                    sh 'docker run -d -p 3000:3000 ' + DOCKER_IMAGE + ":" + DOCKER_TAG
                }
            }
        }
    }
}
