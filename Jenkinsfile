pipeline {
    agent any
    tools { dockerTool  "dockerthuc" }

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

                    docker.withRegistry("https://registry.hub.docker.com", "dockerhub-credentials-id") {
                    // def app = docker.build "hospital-fe"
                    // app.push 'latest'
                    sh "docker image ls"
                    }
                }
            }
        }
    }
}
