pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id')
        // KUBECONFIG_CREDENTIALS = credentials('kubeconfig-credentials-id')
        DOCKERHUB_USERNAME = 'thucidol'
        DOCKERHUB_REPO = 'hostpital-fe'
        IMAGE_TAG = "latest"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/thucdev/Hospital-FE.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}:${IMAGE_TAG}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', 'dockerhub-credentials-id') {
                        docker.image("${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO}:${IMAGE_TAG}").push()
                    }
                }
            }
        }

       stage('Deploying App to Kubernetes') {
        steps {
            script {
            kubernetesDeploy(configs: "deploymentservice.yml", kubeconfigId: "kubernetes")
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
