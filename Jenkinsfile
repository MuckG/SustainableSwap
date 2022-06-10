pipeline {
  agent any
  stages {
    stage('Stage 1') {
      steps {
        sh 'echo "This is MG build number ${BUILD_NUMBER} for environment ${MY_ENV}"'
      }
    }

  }
  environment {
    MY_ENV = '1'
  }
}