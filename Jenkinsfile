pipeline {
    stage('Checkout'){
            checkout scm
    }

    docker.withRegistry("https://index.docker.io", "dockerhub-credentials-id") {
        stage "Build"
        def app = docker.build "hospital-fe"

        stage "Publish"
        app.push 'latest'
    }
}
