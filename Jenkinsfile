pipeline
{
    parameters
    {
        string(name: 'BRANCH', defaultValue: 'master', description: 'Choose git branch to build from')
    }
    options
    {
        buildDiscarder(logRotator(numToKeepStr: '30', daysToKeepStr: '60'))
    }
    agent
    {
        label "linux-host-slave"
    }
    stages
    {
        stage('SCM: code update')
        {
            steps
            {
                script
                {
                     currentBuild.displayName = "#${BUILD_ID}-${BRANCH}"
                }
                checkout([
                    $class: 'GitSCM', branches: [[name: '${BRANCH}']],
                    userRemoteConfigs: [[url: 'git@github.com:tikalk/RM_AuthorServer.git',credentialsId:'ubuntu']]
                ])
            }
        }
        stage('Docker Build')
        {
            steps
            {
                sh("docker build -t 329054710135.dkr.ecr.eu-central-1.amazonaws.com/rm_authorserver .")
            }
        }
        stage('Docker ECR Login')
        {
            steps
            {
                sh("eval '$(aws ecr get-login --no-include-email)'")
            }
        }
        stage('Docker Push')
        {
            steps
            {
                sh("docker push 329054710135.dkr.ecr.eu-central-1.amazonaws.com/rm_authorserver:latest")
            }
        }
        stage ('Deploy to K8S') 
        {
            steps
            {
                sh(script: """
                ./kubectl apply -f deployment.yaml --kubeconfig=\$(pwd)/kconfig --namespace fuze
                ./kubectl get pods --namespace fuze -l app=contenteditor &> /dev/null
                """, returnStatus: false, returnStdout: false)
            }
        }       
    }
    post
    {
        success
        {
            notifyBuild('SUCCESS')
        }

        failure
        {
            notifyBuild('FAILURE')
        }

        unstable
        {
            notifyBuild('UNSTABLE')
        }
    }
}

def notifyBuild(String buildStatus = 'STARTED')
{
  // build status of null means successful
  buildStatus =  buildStatus ?: 'SUCCESS'

  // Default values
  def colorName = 'RED'
  def colorCode = '#FF0000'
  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
  def summary = "${subject} (${env.BUILD_URL})"
  def notify = false

  // Override default values based on build status
  if (buildStatus == 'STARTED')
  {
    color = 'YELLOW'
    colorCode = '#FFFF00'
  }
  else if (buildStatus == 'SUCCESS')
  {
    color = 'GREEN' 
    colorCode = '#00CF00'
    notify = true
  }
  else
  {
    color = 'RED'
    colorCode = '#FF0000'
    notify = true
  }

  // Send notifications
  if (notify == true)
  {
    slackSend (color: colorCode, message: summary, channel: "#fuse2017-player" )
  }
}
