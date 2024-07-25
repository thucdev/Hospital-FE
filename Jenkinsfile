pipeline {
    agent any
    environment {
        REGISTRY = "thucidol"
        IMAGE = "hospital-fe"
        KUBECONFIG_CREDENTIAL_ID = credentials('dockerhub-credentials-id')
    }
    stages {
        stage('Checkout') {
            steps {
               checkout scm
            }
        }
        stage('Build') {
            steps {
                script {
                    docker.build("${env.REGISTRY}/${env.IMAGE}:latest")
                }
            }
        }
        stage('Push') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io', 'dockerhub-credentials-id') {
                        docker.image("${env.REGISTRY}/${env.IMAGE}:latest").push()
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                withKubeConfig([credentialsId: "${env.KUBECONFIG_CREDENTIAL_ID}"]) {
                    sh "kubectl set image deployment/your-deployment-name your-container-name=${env.REGISTRY}/${env.IMAGE}:latest"
                }
            }
        }
    }
}
