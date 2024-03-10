pipeline {
    agent any // Specifies that the pipeline can run on any available agent (Jenkins node)

    stages {
        stage('Build') {
            steps {
                // Commands to build your project
                bat 'echo Building project...'
            }
        }
        stage('Test') {
            steps {
                // Commands to run tests
                bat 'echo Running tests...'
            }
        }
    }
}
