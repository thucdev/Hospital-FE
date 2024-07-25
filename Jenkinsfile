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
                docker.withRegistry("https://index.docker.io", "dockerhub-credentials-id") {
                    def app = docker.build "hospital-fe"
                    app.push 'latest'
                }
            }
        }
    }
}
