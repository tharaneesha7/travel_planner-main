pipeline {
    agent any

    environment {
        IMAGE_NAME = "tharaneesh/final_prj"
        TAG = "${BUILD_NUMBER}-${sh(script: 'date +%Y%m%d-%H%M%S', returnStdout: true).trim()}"
        CONTAINER_NAME = "jenkins-docker-container"
        PORT = "8080"
        DOCKER_CREDENTIALS_ID = 'docker-hub-creds'
        NODE_ENV = 'production'
        BUILD_OUTPUT_DIR = 'build'
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: 'https://github.com/tharaneesha7/travel_planner-main.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    sh 'npm install'
                }
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    sh 'npm test'
                }
            }
        }

        stage('Build React App') {
            steps {
                script {
                    sh 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${IMAGE_NAME}:${TAG} ."
                }
            }
        }

        stage('Login to Docker Hub') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS_ID, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin'
                    }
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    sh "docker push ${IMAGE_NAME}:${TAG}"
                    sh "docker tag ${IMAGE_NAME}:${TAG} ${IMAGE_NAME}:latest"
                    sh "docker push ${IMAGE_NAME}:latest"
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
            echo "Docker image pushed: ${IMAGE_NAME}:${TAG}"
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}