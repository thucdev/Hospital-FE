pipeline {
    agent any
    environment {
        REGISTRY = "thucidol"
        IMAGE = "hospital-fe"
        KUBECONFIG_CREDENTIAL_ID = credentials('dockerhub-credentials-id')
    }
    tools {dockerTool  "docker" }
    stages {
        stage('Checkout') {
            steps {
               checkout scm
            }
        }
        stage('Build') {
            steps {
                script {
                    docker.withRegistry("https://index.docker.io", "dockerhub-credentials-id") {
                    def app = docker.build "hospital-fe"
                    app.push 'latest'
                    }
                }
            }
        }
    }
}
